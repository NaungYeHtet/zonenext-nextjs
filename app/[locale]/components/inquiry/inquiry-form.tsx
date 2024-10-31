"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select, { MultiValue } from "react-select";
import { Option } from "../../lib";
import { ReactNode, useState } from "react";
import { cn, sanitizeObject } from "../../utils/helpers";
import { API_PATH_INQUIRY } from "../../utils/api-paths";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import i18next from "i18next";

type Inputs = {
  first_name: string;
  last_name: string;
  interest: string;
  property_type: string;
  is_owner?: boolean;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  preferred_contact_method?: string | null;
  preferred_contact_time?: string | null;
  max_price?: string | null;
  square_feet?: string | null;
  bedrooms?: string | null;
  bathrooms?: string | null;
  send_updates?: boolean | null;
};

type InquiryFormProps = {
  options: {
    interests: MultiValue<Option>;
    property_types: MultiValue<Option>;
    contact_methods: MultiValue<Option>;
    contact_times: MultiValue<Option>;
  };
};

type FieldWrapperProps = {
  children: ReactNode;
  id: string;
  label?: string;
  errorMsg?: string;
};

const FieldWrapper = ({ children, label, id, errorMsg }: FieldWrapperProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      {label ? (
        <label className="text-sm" htmlFor={id}>
          {label}
        </label>
      ) : (
        ""
      )}
      {children}
      {errorMsg ? <p className="text-red-500 text-sm">{t(errorMsg)}</p> : ""}
    </div>
  );
};

const schema = yup
  .object({
    first_name: yup.string().required("validation:required_text"),
    last_name: yup.string().required("validation:required_text"),
    interest: yup.string().required("validation:required_select"),
    property_type: yup.string().required("validation:required_select"),
    is_owner: yup.boolean(),
    address: yup.string().nullable(),
    phone: yup.string().nullable(),
    email: yup.string().email().nullable(),
    preferred_contact_method: yup.string().nullable(),
    preferred_contact_time: yup.string().nullable(),
    max_price: yup.string().nullable(),
    square_feet: yup.string().nullable(),
    bedrooms: yup.string().nullable(),
    bathrooms: yup.string().nullable(),
    send_updates: yup.boolean().nullable(),
  })
  .required();

const defaultValues = {
  interest: "Buying",
  property_type: "Condo",
  first_name: "",
  last_name: "",
  is_owner: false,
  send_updates: false,
  preferred_contact_method: null,
  preferred_contact_time: null,
  max_price: null,
  square_feet: null,
  bedrooms: null,
  bathrooms: null,
  address: null,
  phone: null,
  email: null,
};

export default function InquiryForm({
  options: { interests, property_types, contact_methods, contact_times },
}: InquiryFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    shouldUseNativeValidation: false,
    resolver: yupResolver(schema),
  });
  const { t, i18n } = useTranslation();
  const interest = watch("interest");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}${API_PATH_INQUIRY}`,
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
      reset(defaultValues);
      toast.success(responseData.data.message);
      // showAlert("success", "Success", responseData.data.message);
    } else {
      if (response.status == 422) {
        for (const [key, value] of Object.entries(responseData.errors)) {
          setError(key as any, { type: "custom", message: value as string });
        }
      }
    }
  };

  return (
    <div className="bg-white p-7 md:w-[550px] md:self-end text-gray-600">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 mt-5">
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <FieldWrapper
              label={t("default:inquiry_interest_label")}
              id="interest"
              errorMsg={errors.interest?.message}
            >
              <Controller
                name="interest"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Select
                    id="interest"
                    options={interests}
                    className={cn("form-control-primary p-0", {
                      "border-2 border-red-500": errors.interest,
                    })}
                    placeholder={t("general:select_placeholder")}
                    instanceId="interest"
                    isSearchable={false}
                    value={interests.find((c) => c.value === value)}
                    onChange={(val) => onChange(val?.value)}
                    aria-invalid={errors.interest ? "true" : "false"}
                  />
                )}
              />
            </FieldWrapper>
            <FieldWrapper
              id="propertyType"
              label={t("default:inquiry_property_type_label")}
              errorMsg={errors.property_type?.message}
            >
              <Controller
                name="property_type"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Select
                    id="propertyType"
                    options={property_types}
                    className={cn("form-control-primary p-0", {
                      "border-2 border-red-500": errors.property_type,
                    })}
                    placeholder={t("general:select_placeholder")}
                    instanceId="interest"
                    isSearchable={false}
                    value={property_types.find((c) => c.value === value)}
                    onChange={(val) => onChange(val?.value)}
                    aria-invalid={errors.property_type ? "true" : "false"}
                  />
                )}
              />
            </FieldWrapper>
          </div>

          {interest == "Renting" ? (
            <FieldWrapper id="isOwner" label={t("default:inquiry_owner_label")}>
              <input
                type="checkbox"
                id="isOwner"
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 focus:ring-2 dark:border-gray-600"
                {...register("is_owner")}
                aria-invalid={errors.is_owner ? "true" : "false"}
              />
            </FieldWrapper>
          ) : (
            ""
          )}

          <div className="flex flex-col md:flex-row gap-2 w-full">
            <FieldWrapper
              id="firstName"
              label={t("general:first_name")}
              errorMsg={errors.first_name?.message}
            >
              <input
                type="text"
                id="firstName"
                className={cn("form-control-primary", {
                  "border-2 border-red-500": errors.first_name,
                })}
                {...register("first_name", { required: true })}
                aria-invalid={errors.first_name ? "true" : "false"}
              />
            </FieldWrapper>
            <FieldWrapper
              id="lastName"
              label={t("general:last_name")}
              errorMsg={errors.last_name?.message}
            >
              <input
                type="text"
                id="lastName"
                className={cn("form-control-primary", {
                  "border-2 border-red-500": errors.last_name,
                })}
                {...register("last_name", { required: true })}
                aria-invalid={errors.last_name ? "true" : "false"}
              />
            </FieldWrapper>
          </div>
          <div className="flex justify-center items-start h-full space-x-2">
            <FieldWrapper
              id="phone"
              label={t("general:phone")}
              errorMsg={errors.phone?.message}
            >
              <input
                type="text"
                id="phone"
                className={cn("form-control-primary", {
                  "border-2 border-red-500": errors.phone,
                })}
                {...register("phone", { required: true })}
                aria-invalid={errors.phone ? "true" : "false"}
              />
            </FieldWrapper>
            <span className="text-gray-500 self-center rotate-90">OR</span>
            <FieldWrapper
              id="email"
              label={t("general:email")}
              errorMsg={errors.email?.message}
            >
              <input
                type="email"
                id="email"
                className={cn("form-control-primary", {
                  "border-2 border-red-500": errors.email,
                })}
                {...register("email")}
                aria-invalid={errors.phone ? "true" : "false"}
              />
            </FieldWrapper>
          </div>

          <FieldWrapper
            id="address"
            label={t("general:address")}
            errorMsg={errors.address?.message}
          >
            <textarea
              id="address"
              rows={2}
              className={cn(
                "form-control-primary bg-gray-100 border-gray-300",
                {
                  "border-2 border-red-500": errors.address,
                }
              )}
              {...register("address")}
              aria-invalid={errors.address ? "true" : "false"}
            />
          </FieldWrapper>
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <FieldWrapper
              label={t("default:inquiry_preferred_contact_method_label")}
              id="preferredContactMethod"
              errorMsg={errors.preferred_contact_method?.message}
            >
              <Controller
                name="preferred_contact_method"
                control={control}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Select
                    id="preferredContactMethod"
                    options={contact_methods}
                    className={cn("form-control-primary p-0", {
                      "border-2 border-red-500":
                        errors.preferred_contact_method,
                    })}
                    placeholder={t("general:select_placeholder")}
                    instanceId="preferred_contact_method"
                    isSearchable={false}
                    value={contact_methods.find((c) => c.value === value)}
                    onChange={(val) => onChange(val?.value)}
                    aria-invalid={
                      errors.preferred_contact_method ? "true" : "false"
                    }
                  />
                )}
              />
            </FieldWrapper>
            <FieldWrapper
              label={t("default:inquiry_preferred_contact_time_label")}
              id="preferredContactTime"
              errorMsg={errors.preferred_contact_time?.message}
            >
              <Controller
                name="preferred_contact_time"
                control={control}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Select
                    id="preferredContactTime"
                    options={contact_times}
                    className={cn("form-control-primary p-0", {
                      "border-2 border-red-500": errors.preferred_contact_time,
                    })}
                    placeholder={t("general:select_placeholder")}
                    instanceId="preferred_contact_time"
                    isSearchable={false}
                    value={contact_times.find((c) => c.value === value)}
                    onChange={(val) => onChange(val?.value)}
                    aria-invalid={
                      errors.preferred_contact_time ? "true" : "false"
                    }
                  />
                )}
              />
            </FieldWrapper>
          </div>

          <div className="flex flex-col md:flex-row gap-2 w-full">
            <FieldWrapper
              id="maxPrice"
              label={t("general:max_price")}
              errorMsg={errors.max_price?.message}
            >
              <input
                type="number"
                id="maxPrice"
                className={cn("form-control-primary", {
                  "border-2 border-red-500": errors.max_price,
                })}
                {...register("max_price")}
                aria-invalid={errors.max_price ? "true" : "false"}
                aria-label={t("general:max_price")}
              />
            </FieldWrapper>
            <FieldWrapper
              id="squareFeet"
              label={t("general:sqft")}
              errorMsg={errors.square_feet?.message}
            >
              <input
                type="number"
                id="squareFeet"
                className={cn("form-control-primary", {
                  "border-2 border-red-500": errors.square_feet,
                })}
                {...register("square_feet")}
                aria-invalid={errors.square_feet ? "true" : "false"}
                aria-label={t("general:sqft")}
              />
            </FieldWrapper>
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <FieldWrapper
              id="bedrooms"
              label={t("general:bedrooms")}
              errorMsg={errors.bedrooms?.message}
            >
              <input
                type="number"
                id="bedrooms"
                className={cn("form-control-primary", {
                  "border-2 border-red-500": errors.bedrooms,
                })}
                {...register("bedrooms")}
                aria-invalid={errors.bedrooms ? "true" : "false"}
                aria-label={t("general:bedrooms")}
              />
            </FieldWrapper>
            <FieldWrapper
              id="bathrooms"
              label={t("general:bathrooms")}
              errorMsg={errors.bathrooms?.message}
            >
              <input
                type="number"
                id="bathrooms"
                className={cn("form-control-primary", {
                  "border-2 border-red-500": errors.bathrooms,
                })}
                {...register("bathrooms")}
                aria-invalid={errors.bathrooms ? "true" : "false"}
                aria-label={t("general:bathrooms")}
              />
            </FieldWrapper>
          </div>

          <FieldWrapper
            id="sendUpdates"
            label={t("default:inquiry_send_updates_label")}
            errorMsg={errors.send_updates?.message}
          >
            <input
              type="checkbox"
              id="sendUpdates"
              className={cn("form-control-primary w-auto self-start", {
                "border-2 border-red-500": errors.send_updates,
              })}
              {...register("send_updates")}
              aria-invalid={errors.send_updates ? "true" : "false"}
              aria-label={t("default:inquiry_send_updates_label")}
              defaultChecked
            />
          </FieldWrapper>

          <button
            type="submit"
            className="py-1.5 justify-center col-span-1 rounded-md sm:col-span-4 md:col-span-4 w-full mb-2 text-lg font-medium text-white focus:outline-none bg-purple-500 border border-gray-200 hover:bg-purple-800 transition-colors focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white inline-flex items-center gap-1 dark:hover:bg-gray-700"
          >
            {t("general:submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
