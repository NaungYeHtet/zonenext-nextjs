"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchApi } from "../utils/helpers";
import { useTranslation } from "react-i18next";
import { User, ValidationErrors } from "../lib";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import FieldGroup from "../components/field-wrapper";
import apiPaths from "../utils/api-paths";

type Inputs = {
  name: string;
  password?: string;
  password_confirmation?: string;
};

const schema = yup
  .object({
    name: yup.string().required(),
    password: yup.string(),
    password_confirmation: yup.string(),
  })
  .required();

export default function ProfileCard() {
  const [user, setUser] = useState<User>();
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    shouldUseNativeValidation: false,
    resolver: yupResolver(schema),
  });

  const fetchData = useCallback(async () => {
    const { data } = await fetchApi({
      method: "GET",
      path: apiPaths.PROFILE,
      body: {
        language: i18n.language,
      },
      requireAuth: true,
    });
    setUser(data.user);
    setValue("name", data.user.name);
  }, []);

  useEffect(() => {
    // Cookie.remove(TOKEN_NAME);
    fetchData();
  }, [fetchData]);

  if (!user) {
    return <p>Loading .....</p>;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetchApi({
      method: "POST",
      path: apiPaths.PROFILE,
      body: {
        ...data,
        language: i18n.language,
      },
      requireAuth: true,
    });

    // console.log(user, message, status);

    if (response.status == 422) {
      const validationErrors: ValidationErrors = response.errors;
      for (const [key, value] of Object.entries(validationErrors)) {
        setError(key as any, { type: "custom", message: value[0] as string });
      }
    }

    if (response.status == 200) {
      reset({
        name: response.data.user.name,
        password: "",
        password_confirmation: "",
      });
      toast.success(response.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="flex w-full flex-col gap-5 md:w-[350px]">
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
              id="password_confirmation"
              className="text-base font-normal"
            >
              {t("general:password_confirmation")}
            </FieldGroup.Label>
            <input
              type="password"
              id="password_confirmation"
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
            className="mb-2 inline-flex w-full items-center justify-center gap-1 rounded-md border border-gray-200 bg-primary-700 py-1.5 text-lg font-medium text-white transition-colors hover:bg-primary-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:col-span-4 md:col-span-4"
          >
            {t("general:save")}
          </button>
        </div>
      </form>
    </div>
  );
}
