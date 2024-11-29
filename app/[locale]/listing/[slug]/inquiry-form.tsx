"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Option, ValidationErrors } from "../../lib";
import { fetchApi } from "../../utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import FieldGroup from "../../components/field-wrapper";
import { PiPhoneCall } from "react-icons/pi";
import Select, { MultiValue } from "react-select";
import { useContext } from "react";
import { AuthContext } from "../../components/providers/auth-context";
import TranslateText from "../../components/translate-text";
import Image from "next/image";
import apiPaths from "../../utils/api-paths";

type Inputs = {
  name: string;
  phone?: string | null;
  email?: string | null;
  message?: string | null;
};

type InquiryFormProps = {
  propertyCode: string;
  propertyTitle: string;
  agentImage: string;
  agentPhone: string;
  agentName: string;
  agentEmail: string;
  options: {
    interests: MultiValue<Option>;
  };
};

const schema = yup
  .object({
    name: yup.string().required("validation:required_text"),
    phone: yup.string().nullable(),
    email: yup.string().email().nullable(),
    message: yup.string().nullable(),
  })
  .required();

export default function InquiryForm({
  propertyCode,
  propertyTitle,
  agentImage,
  agentPhone,
  agentName,
  agentEmail,
  options: { interests },
}: InquiryFormProps) {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "useContext(AuthContext) must be used within an AuthProvider",
    );
  }

  const { user } = authContext;

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    shouldUseNativeValidation: false,
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
    },
  });
  const { t, i18n } = useTranslation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetchApi({
      method: "POST",
      path: apiPaths.INQUIRY_PROPERTY,
      body: {
        ...data,
        code: propertyCode,
        language: i18n.language,
      },
      requireAuth: true,
    });
    if (response.status == 422) {
      const validationErrors: ValidationErrors = response.errors;
      for (const [key, value] of Object.entries(validationErrors)) {
        setError(key as any, { type: "custom", message: value[0] as string });
      }
    }

    if (response.status == 200) {
      reset();
      toast.success(response.message);
    }
  };

  return (
    <div className="w-full bg-white p-7 text-gray-600 md:self-end">
      <h3 className="text-2xl font-semibold">
        <TranslateText>submit_inquiry</TranslateText>
      </h3>
      <div className="my-5 flex flex-row items-center justify-center gap-2">
        <div className="rounded-full border border-gray-400">
          <Image
            src={agentImage}
            alt={`Agent image`}
            width={40}
            height={40}
            className="h-auto w-auto rounded-full object-cover"
          />
        </div>
        <div>
          <p className="text-xl">{agentName}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 flex flex-col gap-3 md:gap-5">
          <FieldGroup>
            <FieldGroup.Label id="name">{t("general:name")}</FieldGroup.Label>
            <FieldGroup.Wrapper errorMsg={errors.name?.message}>
              <input
                type="text"
                id="name"
                className="form-control-primary"
                {...register("name", { required: true })}
                aria-invalid={errors.name ? "true" : "false"}
              />
            </FieldGroup.Wrapper>
            <FieldGroup.ErrorMessage>
              {errors.name?.message}
            </FieldGroup.ErrorMessage>
          </FieldGroup>

          <FieldGroup>
            <FieldGroup.Label id="phone">{t("general:phone")}</FieldGroup.Label>
            <FieldGroup.Wrapper errorMsg={errors.phone?.message}>
              <input
                type="text"
                id="phone"
                className="form-control-primary"
                {...register("phone", { required: true })}
                aria-invalid={errors.phone ? "true" : "false"}
              />
            </FieldGroup.Wrapper>
            <FieldGroup.ErrorMessage>
              {errors.phone?.message}
            </FieldGroup.ErrorMessage>
          </FieldGroup>

          <FieldGroup>
            <FieldGroup.Label id="email">{t("general:email")}</FieldGroup.Label>
            <FieldGroup.Wrapper errorMsg={errors.email?.message}>
              <input
                type="email"
                id="email"
                className="form-control-primary"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
              />
            </FieldGroup.Wrapper>
            <FieldGroup.ErrorMessage>
              {errors.email?.message}
            </FieldGroup.ErrorMessage>
          </FieldGroup>

          <FieldGroup>
            <FieldGroup.Label id="message">
              {t("general:message")}
            </FieldGroup.Label>
            <FieldGroup.Wrapper errorMsg={errors.message?.message}>
              <textarea
                id="message"
                defaultValue={t("general:inquiry_message_default", {
                  replace: { title: propertyTitle },
                })}
                rows={2}
                className="form-control-primary border-gray-300 bg-gray-100"
                {...register("message")}
                aria-invalid={errors.message ? "true" : "false"}
              />
            </FieldGroup.Wrapper>
            <FieldGroup.ErrorMessage>
              {errors.message?.message}
            </FieldGroup.ErrorMessage>
          </FieldGroup>
          <button
            type="submit"
            className="mb-2 inline-flex w-full items-center justify-center rounded-md border border-gray-200 bg-green-500 py-1.5 text-lg font-medium text-white transition-colors hover:bg-green-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            {t("general:submit")}
          </button>
          <a
            href={`tel:${agentPhone}`}
            type="button"
            className="mb-2 inline-flex w-full items-center justify-center gap-3 rounded-md border border-gray-200 bg-primary-500 py-1.5 text-lg font-medium text-white transition-colors hover:bg-primary-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            <PiPhoneCall />
            {t("general:call")}
          </a>
        </div>
      </form>
    </div>
  );
}
