"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ValidationErrors } from "../../lib";
import { fetchApi } from "../../utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import FieldGroup from "../../components/field-wrapper";
import Select, { MultiValue } from "react-select";
import { useContext } from "react";
import { AuthContext } from "../../components/providers/auth-context";
import { RATINGS } from "../../utils/constants";
import apiPaths from "../../utils/api-paths";

type Inputs = {
  email: string;
  rating: number;
  review?: string | null;
};

type InquiryFormProps = {
  propertyCode: string;
};

const schema = yup
  .object({
    email: yup.string().email().required("validation:required_text"),
    rating: yup.number().required("validation:required_text"),
    review: yup.string().nullable(),
  })
  .required();

export default function RatingForm({ propertyCode }: InquiryFormProps) {
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
    formState: { errors },
  } = useForm<Inputs>({
    shouldUseNativeValidation: false,
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.email,
    },
  });
  const { t, i18n } = useTranslation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetchApi({
      method: "POST",
      path: apiPaths.REVIEW_PROPERTY,
      body: {
        ...data,
        code: propertyCode,
        language: i18n.language,
      },
      requireAuth: true,
    });

    console.log(response);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 flex flex-col gap-3 md:gap-5">
          <div className="flex w-full flex-col gap-2 md:flex-row">
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

            <FieldGroup>
              <FieldGroup.Label id="rating">
                {t("default:rating")}
              </FieldGroup.Label>
              <FieldGroup.Wrapper errorMsg={errors.rating?.message}>
                <Controller
                  name="rating"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                      id="interest"
                      options={RATINGS.map((option) => {
                        return { label: t(option.label), value: option.value };
                      })}
                      className="form-control-primary p-0"
                      placeholder={t("general:select_placeholder")}
                      instanceId="interest"
                      isSearchable={false}
                      value={RATINGS.find((c) => c.value === value)}
                      onChange={(val) =>
                        onChange(t(val?.value as unknown as string))
                      }
                      aria-invalid={errors.rating ? "true" : "false"}
                    />
                  )}
                />
              </FieldGroup.Wrapper>
              <FieldGroup.ErrorMessage>
                {errors.rating?.message}
              </FieldGroup.ErrorMessage>
            </FieldGroup>
          </div>

          <FieldGroup>
            <FieldGroup.Label id="review">
              {t("general:review")}
            </FieldGroup.Label>
            <FieldGroup.Wrapper errorMsg={errors.review?.message}>
              <textarea
                id="review"
                rows={2}
                className="form-control-primary border-gray-300 bg-gray-100"
                {...register("review")}
                aria-invalid={errors.review ? "true" : "false"}
              />
            </FieldGroup.Wrapper>
            <FieldGroup.ErrorMessage>
              {errors.review?.message}
            </FieldGroup.ErrorMessage>
          </FieldGroup>

          <button
            type="submit"
            className="mb-2 inline-flex w-full items-center justify-center self-end rounded-md border border-gray-200 bg-green-500 py-1.5 text-lg font-medium text-white transition-colors hover:bg-green-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-[200px]"
          >
            {t("general:rate")}
          </button>
        </div>
      </form>
    </div>
  );
}
