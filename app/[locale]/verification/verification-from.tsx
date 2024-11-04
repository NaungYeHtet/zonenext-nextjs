"use client";

import { fetchApi } from "../utils/helpers";
import { useTranslation } from "react-i18next";
import FieldGroup from "../components/field-wrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";
import apiPaths from "../utils/api-paths";

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
    const response = await fetchApi({
      method: "POST",
      path: apiPaths.EMAIL_VERIFY,
      body: {
        ...data,
        language: i18n.language,
      },
      requireAuth: true,
    });

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

    await fetchApi({
      method: "POST",
      path: apiPaths.EMAIL_VERIFICATION_NOTI,
      requireAuth: true,
    });

    toast.info(t("verification:email_notification_sent"));
    setNotiLoading(false);
    setNotiTimer(true);
    setTimeout(() => {
      setNotiTimer(false);
    }, 60 * 1000);
  };

  return (
    <div className="mt-10 flex w-[350px] flex-col justify-start space-y-5">
      <h1 className="text-primary-500">{t("verification:description")}</h1>
      <div className="text-wrap">
        <p className="inline">{t("verification:send_verification_email")}</p>

        {!notiLoading ? (
          notiTimer ? (
            <CountdownTimer count={60} />
          ) : (
            <button
              type="button"
              className="inline-block text-sm text-blue-500"
              onClick={() => sendVerificationEmail()}
            >
              {t("verification:here")}
            </button>
          )
        ) : (
          <Spinner className="h-5 w-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" />
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
            className="mb-2 inline-flex w-full items-center justify-center gap-1 rounded-md border border-gray-200 bg-primary-700 py-1.5 text-lg font-medium text-white transition-colors hover:bg-primary-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:col-span-4 md:col-span-4"
          >
            {t("general:verify")}
          </button>
        </div>
      </form>
    </div>
  );
}
