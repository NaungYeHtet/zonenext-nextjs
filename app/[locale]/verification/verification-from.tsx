"use client";

import { cn, fetchPost, sanitizeObject } from "../utils/helpers";
import {
  API_PATH_EMAIL_VERIFICATION_NOTI,
  API_PATH_EMAIL_VERIFY,
} from "../utils/api-paths";
import { useTranslation } from "react-i18next";
import FieldGroup from "../components/field-wrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";

type Inputs = {
  otp: string;
};

const schema = yup
  .object({
    otp: yup.string().length(6).required(),
  })
  .required();

type CountdownTimerProps = {
  count: number;
};
function CountdownTimer({ count }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(count);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Clean up the interval when the component unmounts or when seconds reach 0
      return () => clearInterval(timer);
    }
  }, [seconds]);

  return <span>{seconds}s</span>;
}

export default function VerficationForm() {
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    shouldUseNativeValidation: false,
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const [notiLoading, setNotiLoading] = useState(false);
  const [notiTimer, setNotiTimer] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetchPost(
      API_PATH_EMAIL_VERIFY,
      JSON.stringify({
        ...sanitizeObject(data),
        language: i18n.language,
      })
    );

    if (response.status === 400) {
      setError("otp", { type: "custom", message: response.message });
    }

    if (response.status === 200) {
      reset();
      router.push("/profile");
    }
  };

  const sendVerificationEmail = async () => {
    setNotiLoading(true);

    await fetchPost(API_PATH_EMAIL_VERIFICATION_NOTI);

    toast.info(t("verification:email_notification_sent"));
    setNotiLoading(false);
    setNotiTimer(true);
    setTimeout(() => {
      setNotiTimer(false);
    }, 60 * 1000);
  };

  return (
    <div className="flex flex-col justify-start mt-10 w-[350px] space-y-5">
      <h1 className="text-primary-500">{t("verification:description")}</h1>
      <div className="text-wrap">
        <p className="inline">{t("verification:send_verification_email")}</p>

        {!notiLoading ? (
          notiTimer ? (
            <CountdownTimer count={60} />
          ) : (
            <button
              type="button"
              className="text-sm inline-block text-blue-500"
              onClick={() => sendVerificationEmail()}
            >
              {t("verification:here")}
            </button>
          )
        ) : (
          <Spinner className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <FieldGroup>
            <FieldGroup.Label id="otp">{t("general:otp")}</FieldGroup.Label>
            <input
              type="number"
              id="otp"
              className="form-control-primary"
              {...register("otp")}
              aria-invalid={errors.otp ? "true" : "false"}
              maxLength={6}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                input.value = input.value.slice(0, 6); // Enforces 6 digits only
              }}
            />
            <FieldGroup.ErrorMessage>
              {errors.otp?.message}
            </FieldGroup.ErrorMessage>
          </FieldGroup>
          <button
            type="submit"
            className="py-1.5 justify-center rounded-md sm:col-span-4 md:col-span-4 w-full mb-2 text-lg font-medium text-white focus:outline-none bg-primary-700 border border-gray-200 hover:bg-primary-800 transition-colors focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white inline-flex items-center gap-1 dark:hover:bg-gray-700"
          >
            {t("general:verify")}
          </button>
        </div>
      </form>
    </div>
  );
}
