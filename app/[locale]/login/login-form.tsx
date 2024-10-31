"use client";

import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FieldGroup from "../components/field-wrapper";

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
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    shouldUseNativeValidation: false,
    resolver: yupResolver(schema),
  });

  return (
    <>
      <h1 className="text-2xl text-primary-500">
        {t("login:title", { appName: "Zone Next" })}
      </h1>
      <div className="flex flex-col gap-5 mt-7 w-[350px]">
        <FieldGroup>
          <FieldGroup.Label id="email">{t("general:email")}</FieldGroup.Label>
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
          <FieldGroup.Label id="password">
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
      </div>
    </>
  );
}
