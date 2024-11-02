"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchApi } from "../utils/helpers";
import { API_PATH_PROFILE } from "../utils/api-paths";
import { useTranslation } from "react-i18next";
import { User } from "../lib";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import FieldGroup from "../components/field-wrapper";

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
      path: API_PATH_PROFILE,
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
    const {
      data: { access_token },
      message,
      status,
    } = await fetchApi({
      method: "POST",
      path: API_PATH_PROFILE,
      body: {
        ...data,
        language: i18n.language,
      },
    });

    console.log(access_token, message, status);

    if (status == 422) {
    }

    if (status == 200) {
      reset();
      toast.success(message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="flex flex-col gap-5 w-full md:w-[350px]">
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
            className="py-1.5 justify-center rounded-md sm:col-span-4 md:col-span-4 w-full mb-2 text-lg font-medium text-white focus:outline-none bg-primary-700 border border-gray-200 hover:bg-primary-800 transition-colors focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white inline-flex items-center gap-1 dark:hover:bg-gray-700"
          >
            {t("general:save")}
          </button>
        </div>
      </form>
    </div>
  );
}
