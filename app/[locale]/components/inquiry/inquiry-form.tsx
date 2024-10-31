"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select, { MultiValue } from "react-select";
import { Option } from "../../lib";
import { ReactNode } from "react";
import { cn, sanitizeObject } from "../../utils/helpers";
import { API_PATH_INQUIRY } from "../../utils/api-paths";

type Inputs = {
  first_name: string;
  last_name: string;
  interest: string;
  property_type: string;
  is_owner: boolean;
  address: string;
  phone: string;
  email: string;
  preferred_contact_method: string;
  preferred_contact_time: string;
  send_updates: boolean;
  max_price: number | null | undefined;
  square_feet: number | null | undefined;
  bedrooms: number | null | undefined;
  bathrooms: number | null | undefined;
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
      {errorMsg ? <p className="text-red-500 text-sm">{errorMsg}</p> : ""}
    </div>
  );
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
    formState: { errors },
  } = useForm<Inputs>({ shouldUseNativeValidation: false });
  const { t, i18n } = useTranslation();
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
      reset();
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
              errorMsg={
                errors.interest?.type === "required"
                  ? t("general:field_required_select")
                  : ""
              }
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
              errorMsg={
                errors.property_type?.type === "required"
                  ? t("general:field_required_select")
                  : ""
              }
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

          <FieldWrapper id="isOwner" label={t("default:inquiry_owner_label")}>
            <input
              type="checkbox"
              id="isOwner"
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 focus:ring-2 dark:border-gray-600"
              {...register("is_owner")}
              aria-invalid={errors.is_owner ? "true" : "false"}
            />
          </FieldWrapper>

          <div className="flex flex-col md:flex-row gap-2 w-full">
            <FieldWrapper
              id="firstName"
              label={t("general:first_name")}
              errorMsg={
                errors.first_name?.type === "required"
                  ? t("general:field_required_text")
                  : ""
              }
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
              errorMsg={
                errors.last_name?.type === "required"
                  ? t("general:field_required_text")
                  : ""
              }
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
              errorMsg={
                errors.phone?.type === "required" ? errors.phone.message : ""
              }
            >
              <input
                type="text"
                id="phone"
                className={cn("form-control-primary", {
                  "border-2 border-red-500": errors.phone,
                })}
                {...register("phone", {
                  validate: {
                    required: (value) => {
                      if (!value && !getValues("email")) {
                        return t("general:field_required_without", {
                          attribute: t("general:phone"),
                          otherAttribute: t("general:email"),
                        });
                      }

                      return true;
                    },
                  },
                })}
                aria-invalid={errors.phone ? "true" : "false"}
              />
            </FieldWrapper>
            <span className="text-gray-500 self-center rotate-90">OR</span>
            <FieldWrapper id="email" label={t("general:email")}>
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

          <FieldWrapper id="address" label={t("general:address")}>
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
              errorMsg={
                errors.preferred_contact_method?.type === "required"
                  ? t("general:field_required_select")
                  : ""
              }
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
              errorMsg={
                errors.preferred_contact_time?.type === "required"
                  ? t("general:field_required_select")
                  : ""
              }
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
              errorMsg={
                errors.max_price?.type === "required"
                  ? t("general:field_required_text")
                  : ""
              }
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
            <FieldWrapper id="squareFeet" label={t("general:sqft")}>
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
            <FieldWrapper id="bedrooms" label={t("general:bedrooms")}>
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
            <FieldWrapper id="bathrooms" label={t("general:bathrooms")}>
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
