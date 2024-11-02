"use client";

import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FieldGroup from "../components/field-wrapper";
import { API_PATH_LOGIN, API_PATH_SIGNUP } from "../utils/api-paths";
import { toast } from "react-toastify";
import { storeToken } from "../lib/actions";
import { useRouter } from "next/navigation";
import { fetchApi } from "../utils/helpers";
import { ValidationErrors } from "../lib";
import GoogleAuthButton from "../components/google-auth-button";
import FormCard from "../components/cards/form-card";

type Inputs = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Passwords must match")
      .required(),
  })
  .required();

export default function SignupForm() {
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
    const response = await fetchApi({
      method: "POST",
      path: API_PATH_SIGNUP,
      body: {
        ...data,
        language: i18n.language,
      },
    });

    if (response.status == 422) {
      const validationErrors: ValidationErrors = response.errors;
      for (const [key, value] of Object.entries(validationErrors)) {
        setError(key as any, { type: "custom", message: value[0] as string });
      }
    }

    if (response.status == 200) {
      storeToken({ access_token: response.data.access_token });

      reset();
      router.push("/profile");
      toast.success(response.data.message);
    }
  };

  return (
    <FormCard>
      <h1 className="text-xl md:text-2xl font-serif bold">
        {t("general:signup_title", { appName: "Zone Next" })}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="flex flex-col gap-5 w-full">
          <FieldGroup>
            <FieldGroup.Label id="name" className="text-base font-normal">
              {t("general:name")}
            </FieldGroup.Label>
            <input
              type="text"
              id="name"
              className="form-control-primary"
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
            />
            <FieldGroup.ErrorMessage>
              {errors.name?.message}
            </FieldGroup.ErrorMessage>
          </FieldGroup>
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
          <FieldGroup>
            <FieldGroup.Label
              id="passwordConfirmation"
              className="text-base font-normal"
            >
              {t("general:password_confirmation")}
            </FieldGroup.Label>
            <input
              type="password"
              id="passwordConfirmation"
              className="form-control-primary"
              {...register("password_confirmation")}
              aria-invalid={errors.password_confirmation ? "true" : "false"}
            />
            <FieldGroup.ErrorMessage>
              {errors.password_confirmation?.message}
            </FieldGroup.ErrorMessage>
          </FieldGroup>
          <button
            type="submit"
            className="py-1.5 justify-center rounded-md sm:col-span-4 md:col-span-4 w-full mb-2 text-lg font-medium text-white focus:outline-none bg-primary-800 border border-gray-200 hover:bg-primary-800 transition-colors focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white inline-flex items-center gap-1 dark:hover:bg-gray-700"
          >
            {t("general:sign_up")}
          </button>
          <GoogleAuthButton />
        </div>
      </form>
    </FormCard>
  );
}
