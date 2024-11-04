"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select, { MultiValue } from "react-select";
import { Option, ValidationErrors } from "../../lib";
import { fetchApi } from "../../utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import AsyncSelect from "../async-select";
import FieldGroup from "../field-wrapper";
import apiPaths from "../../utils/api-paths";

type Inputs = {
  first_name: string;
  last_name: string;
  interest: string;
  property_type: string;
  is_owner?: boolean;
  township?: string | null;
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

const schema = yup
  .object({
    first_name: yup.string().required("validation:required_text"),
    last_name: yup.string().required("validation:required_text"),
    interest: yup.string().required("validation:required_select"),
    property_type: yup.string().required("validation:required_select"),
    is_owner: yup.boolean(),
    township: yup.string().nullable(),
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
  township: "botahtaung",
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
    const response = await fetchApi({
      method: "POST",
      path: apiPaths.INQUIRY,
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
      reset(defaultValues);
      toast.success(response.message);
    }
  };

  return (
    <div className="bg-white p-7 text-gray-600 md:w-[550px] md:self-end">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 flex flex-col gap-5">
          <div className="flex w-full flex-col gap-2 md:flex-row">
            <FieldGroup>
              <FieldGroup.Label id="interest">
                {t("default:inquiry_interest_label")}
              </FieldGroup.Label>
              <FieldGroup.Wrapper errorMsg={errors.interest?.message}>
                <Controller
                  name="interest"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                      id="interest"
                      options={interests}
                      className="form-control-primary p-0"
                      placeholder={t("general:select_placeholder")}
                      instanceId="interest"
                      isSearchable={false}
                      value={interests.find((c) => c.value === value)}
                      onChange={(val) => onChange(val?.value)}
                      aria-invalid={errors.interest ? "true" : "false"}
                    />
                  )}
                />
              </FieldGroup.Wrapper>
              <FieldGroup.ErrorMessage>
                {errors.interest?.message}
              </FieldGroup.ErrorMessage>
            </FieldGroup>
            <FieldGroup>
              <FieldGroup.Label id="propertyType">
                {t("default:inquiry_property_type_label")}
              </FieldGroup.Label>
              <FieldGroup.Wrapper errorMsg={errors.property_type?.message}>
                <Controller
                  name="property_type"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                      id="propertyType"
                      options={property_types}
                      className="form-control-primary p-0"
                      placeholder={t("general:select_placeholder")}
                      instanceId="interest"
                      isSearchable={false}
                      value={property_types.find((c) => c.value === value)}
                      onChange={(val) => onChange(val?.value)}
                      aria-invalid={errors.property_type ? "true" : "false"}
                    />
                  )}
                />
              </FieldGroup.Wrapper>
              <FieldGroup.ErrorMessage>
                {errors.property_type?.message}
              </FieldGroup.ErrorMessage>
            </FieldGroup>
          </div>

          {interest == "Renting" ? (
            <FieldGroup>
              <FieldGroup.Label id="isOwner">
                {t("default:inquiry_owner_label")}
              </FieldGroup.Label>
              <FieldGroup.Wrapper errorMsg={errors.is_owner?.message}>
                <input
                  type="checkbox"
                  id="isOwner"
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:focus:ring-primary-600"
                  {...register("is_owner")}
                  aria-invalid={errors.is_owner ? "true" : "false"}
                />
              </FieldGroup.Wrapper>
              <FieldGroup.ErrorMessage>
                {errors.is_owner?.message}
              </FieldGroup.ErrorMessage>
            </FieldGroup>
          ) : (
            ""
          )}

          <div className="flex w-full flex-col gap-2 md:flex-row">
            <FieldGroup>
              <FieldGroup.Label id="firstName">
                {t("general:first_name")}
              </FieldGroup.Label>
              <FieldGroup.Wrapper errorMsg={errors.first_name?.message}>
                <input
                  type="text"
                  id="firstName"
                  className="form-control-primary"
                  {...register("first_name", { required: true })}
                  aria-invalid={errors.first_name ? "true" : "false"}
                />
              </FieldGroup.Wrapper>
              <FieldGroup.ErrorMessage>
                {errors.first_name?.message}
              </FieldGroup.ErrorMessage>
            </FieldGroup>
            <FieldGroup>
              <FieldGroup.Label id="lastName">
                {t("general:last_name")}
              </FieldGroup.Label>
              <FieldGroup.Wrapper errorMsg={errors.last_name?.message}>
                <input
                  type="text"
                  id="lastName"
                  className="form-control-primary"
                  {...register("last_name", { required: true })}
                  aria-invalid={errors.last_name ? "true" : "false"}
                />
              </FieldGroup.Wrapper>
              <FieldGroup.ErrorMessage>
                {errors.last_name?.message}
              </FieldGroup.ErrorMessage>
            </FieldGroup>
          </div>
          <div className="flex h-full flex-col items-start justify-center gap-2 md:flex-row">
            <FieldGroup>
              <FieldGroup.Label id="phone">
                {t("general:phone")}
              </FieldGroup.Label>
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
            <span className="mt-3 self-center text-gray-500 md:rotate-90">
              OR
            </span>
            <FieldGroup>
              <FieldGroup.Label id="email">
                {t("general:email")}
              </FieldGroup.Label>
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
          </div>

          <div className="flex h-full flex-col items-start justify-center gap-2 md:flex-row">
            <FieldGroup>
              <FieldGroup.Label id="townshipForm">
                {t("general:choose_township")}
              </FieldGroup.Label>
              <FieldGroup.Wrapper errorMsg={errors.township?.message}>
                <Controller
                  name="township"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <AsyncSelect
                      id="townshipForm"
                      className="form-control-primary p-0"
                      path={apiPaths.PROPERTY_FILTER_TOWNSHIP}
                      placeholder={t("general:choose_township")}
                      onChange={(val: Option) => onChange(val?.value)}
                      optionsKey="townships"
                      isClearable
                      aria-invalid={errors.township ? "true" : "false"}
                    />
                  )}
                />
              </FieldGroup.Wrapper>
              <FieldGroup.ErrorMessage>
                {errors.township?.message}
              </FieldGroup.ErrorMessage>
            </FieldGroup>

            <FieldGroup>
              <FieldGroup.Label id="address">
                {t("general:address")}
              </FieldGroup.Label>
              <FieldGroup.Wrapper errorMsg={errors.address?.message}>
                <textarea
                  id="address"
                  rows={2}
                  className="form-control-primary border-gray-300 bg-gray-100"
                  {...register("address")}
                  aria-invalid={errors.address ? "true" : "false"}
                />
              </FieldGroup.Wrapper>
              <FieldGroup.ErrorMessage>
                {errors.address?.message}
              </FieldGroup.ErrorMessage>
            </FieldGroup>
          </div>

          <div className="flex w-full flex-col gap-2 md:flex-row">
            <FieldGroup>
              <FieldGroup.Label id="bedrooms">
                {t("default:bedrooms")}
              </FieldGroup.Label>
              <FieldGroup.Wrapper
                errorMsg={errors.preferred_contact_method?.message}
              >
                <Controller
                  name="preferred_contact_method"
                  control={control}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                      id="preferredContactMethod"
                      options={contact_methods}
                      className="form-control-primary p-0"
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
              </FieldGroup.Wrapper>
              <FieldGroup.ErrorMessage>
                {errors.preferred_contact_method?.message}
              </FieldGroup.ErrorMessage>
            </FieldGroup>
            <FieldGroup>
              <FieldGroup.Label id="preferredContactTime">
                {t("default:inquiry_preferred_contact_time_label")}
              </FieldGroup.Label>
              <FieldGroup.Wrapper
                errorMsg={errors.preferred_contact_time?.message}
              >
                <Controller
                  name="preferred_contact_time"
                  control={control}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                      id="preferredContactTime"
                      options={contact_times}
                      className="form-control-primary p-0"
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
              </FieldGroup.Wrapper>
              <FieldGroup.ErrorMessage>
                {errors.preferred_contact_time?.message}
              </FieldGroup.ErrorMessage>
            </FieldGroup>
          </div>

          <div className="flex w-full flex-col gap-2 md:flex-row">
            <FieldGroup>
              <FieldGroup.Label id="maxPrice">
                {t("general:max_price")}
              </FieldGroup.Label>
              <FieldGroup.Wrapper errorMsg={errors.max_price?.message}>
                <input
                  type="number"
                  id="maxPrice"
                  className="form-control-primary"
                  {...register("max_price")}
                  aria-invalid={errors.max_price ? "true" : "false"}
                  aria-label={t("general:max_price")}
                />
              </FieldGroup.Wrapper>
              <FieldGroup.ErrorMessage>
                {errors.max_price?.message}
              </FieldGroup.ErrorMessage>
            </FieldGroup>
            <FieldGroup>
              <FieldGroup.Label id="squareFeet">
                {t("general:sqft")}
              </FieldGroup.Label>
              <FieldGroup.Wrapper errorMsg={errors.square_feet?.message}>
                <input
                  type="number"
                  id="squareFeet"
                  className="form-control-primary"
                  {...register("square_feet")}
                  aria-invalid={errors.square_feet ? "true" : "false"}
                  aria-label={t("general:sqft")}
                />
              </FieldGroup.Wrapper>
              <FieldGroup.ErrorMessage>
                {errors.square_feet?.message}
              </FieldGroup.ErrorMessage>
            </FieldGroup>
          </div>
          <div className="flex w-full flex-col gap-2 md:flex-row">
            <FieldGroup>
              <FieldGroup.Label id="bedrooms">
                {t("general:bedrooms")}
              </FieldGroup.Label>
              <FieldGroup.Wrapper errorMsg={errors.bathrooms?.message}>
                <input
                  type="number"
                  id="bedrooms"
                  className="form-control-primary"
                  {...register("bedrooms")}
                  aria-invalid={errors.bedrooms ? "true" : "false"}
                  aria-label={t("general:bedrooms")}
                />
              </FieldGroup.Wrapper>
              <FieldGroup.ErrorMessage>
                {errors.bedrooms?.message}
              </FieldGroup.ErrorMessage>
            </FieldGroup>
            <FieldGroup>
              <FieldGroup.Label id="bathrooms">
                {t("general:bathrooms")}
              </FieldGroup.Label>
              <FieldGroup.Wrapper errorMsg={errors.bathrooms?.message}>
                <input
                  type="number"
                  id="bathrooms"
                  className="form-control-primary"
                  {...register("bathrooms")}
                  aria-invalid={errors.bathrooms ? "true" : "false"}
                  aria-label={t("general:bathrooms")}
                />
              </FieldGroup.Wrapper>
              <FieldGroup.ErrorMessage>
                {errors.bathrooms?.message}
              </FieldGroup.ErrorMessage>
            </FieldGroup>
          </div>

          <FieldGroup>
            <FieldGroup.Label id="sendUpdates">
              {t("default:inquiry_send_updates_label")}
            </FieldGroup.Label>
            <FieldGroup.Wrapper errorMsg={errors.send_updates?.message}>
              <input
                type="checkbox"
                id="sendUpdates"
                className="form-control-primary"
                {...register("send_updates")}
                aria-invalid={errors.send_updates ? "true" : "false"}
                aria-label={t("default:inquiry_send_updates_label")}
                defaultChecked
              />
            </FieldGroup.Wrapper>
            <FieldGroup.ErrorMessage>
              {errors.send_updates?.message}
            </FieldGroup.ErrorMessage>
          </FieldGroup>

          <button
            type="submit"
            className="col-span-1 mb-2 inline-flex w-full items-center justify-center gap-1 rounded-md border border-gray-200 bg-purple-500 py-1.5 text-lg font-medium text-white transition-colors hover:bg-purple-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:col-span-4 md:col-span-4"
          >
            {t("general:submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
