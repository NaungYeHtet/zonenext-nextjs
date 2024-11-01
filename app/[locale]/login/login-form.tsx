"use client";

import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FieldGroup from "../components/field-wrapper";
import { API_PATH_LOGIN } from "../utils/api-paths";
import { sanitizeObject } from "../utils/helpers";
import { toast } from "react-toastify";
import { storeToken } from "../lib/actions";
import { useRouter } from "next/navigation";

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
    console.log(data);
    // return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}${API_PATH_LOGIN}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...sanitizeObject(data),
          language: i18n.language,
        }),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      storeToken({ access_token: responseData.data.access_token });

      reset();
      router.push("/profile");
      toast.success(responseData.data.message);
    } else {
      if (response.status == 422) {
        for (const [key, value] of Object.entries(responseData.errors)) {
          setError(key as any, { type: "custom", message: value as string });
        }
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl font-serif text-primary-500">
        {t("login:title", { appName: "Zone Next" })}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="flex flex-col gap-5 w-[350px]">
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
            className="py-1.5 justify-center rounded-md sm:col-span-4 md:col-span-4 w-full mb-2 text-lg font-medium text-white focus:outline-none bg-primary-700 border border-gray-200 hover:bg-primary-800 transition-colors focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white inline-flex items-center gap-1 dark:hover:bg-gray-700"
          >
            {t("general:login")}
          </button>
        </div>
      </form>
    </>
  );
}
