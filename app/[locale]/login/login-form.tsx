"use client";

import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FieldGroup from "../components/field-wrapper";
import { toast } from "react-toastify";
import { storeToken } from "../lib/actions";
import { useRouter } from "next/navigation";
import { fetchApi } from "../utils/helpers";
import Image from "next/image";
import GoogleAuthButton from "../components/google-auth-button";
import FormCard from "../components/cards/form-card";
import apiPaths from "../utils/api-paths";

type Inputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function LoginForm() {
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const {
      data: { access_token },
      message,
      status,
    } = await fetchApi({
      method: "POST",
      path: apiPaths.LOGIN,
      body: {
        ...data,
        language: i18n.language,
      },
    });

    console.log(access_token, message, status);

    if (status == 422) {
      setError("email", { type: "custom", message });
    }

    if (status == 200) {
      console.log(access_token);
      storeToken({ access_token: access_token });

      reset();
      router.push("/profile");
      toast.success(message);
    }
  };

  return (
    <FormCard>
      <h1 className="bold font-serif text-xl md:text-2xl">
        {t("general:login_title", { appName: "Zone Next" })}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="flex w-full flex-col gap-5">
          <FieldGroup>
            <FieldGroup.Label id="email" className="text-base font-normal">
              {t("general:email")}
            </FieldGroup.Label>
            <input
              type="email"
              id="email"
              className="form-control-primary"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
            />
            <FieldGroup.ErrorMessage>
              {errors.email?.message}
            </FieldGroup.ErrorMessage>
          </FieldGroup>
          <FieldGroup>
            <FieldGroup.Label id="password" className="text-base font-normal">
              {t("general:password")}
            </FieldGroup.Label>
            <input
              type="password"
              id="password"
              className="form-control-primary"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
            />
            <FieldGroup.ErrorMessage>
              {errors.password?.message}
            </FieldGroup.ErrorMessage>
          </FieldGroup>
          <button
            type="submit"
            className="mb-2 inline-flex w-full items-center justify-center gap-1 rounded-md border border-gray-200 bg-primary-700 py-1.5 text-lg font-medium text-white transition-colors hover:bg-primary-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:col-span-4 md:col-span-4"
          >
            {t("general:login")}
          </button>
          <GoogleAuthButton />
        </div>
      </form>
    </FormCard>
  );
}
