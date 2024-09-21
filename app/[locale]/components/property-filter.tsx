"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import Select, { MultiValue, SingleValue } from "react-select";
import { Option } from "../utils";
import { API_PATH_PROPERTY_FILTER_TOWNSHIP } from "../utils/api-paths";
import AsyncSelect from "./async-select";

type PropertyFilterProps = {
  filters: {
    listTypes: MultiValue<Option>;
    states: MultiValue<Option>;
    types: MultiValue<Option>;
    priceRanges: {
      forSale: MultiValue<Option>;
      forRent: MultiValue<Option>;
      newest: MultiValue<Option>;
    };
  };
};

type TopshipParams = {
  search?: string;
  state?: string;
};

export default function PropertyFilter({ filters }: PropertyFilterProps) {
  const { t } = useTranslation();
  const [priceOptions, setPriceOptions] = useState<SingleValue<Option>[]>();
  const [townshipParams, setTownshipParams] = useState<TopshipParams>({});

  const handleListTypeChange = (listTypeOption: SingleValue<Option>) => {
    setPriceOptions([
      ...filters.priceRanges[
        listTypeOption?.value as keyof typeof filters.priceRanges
      ],
    ]);
  };

  const handleStateChange = (option: SingleValue<Option>) => {
    setTownshipParams({ ...townshipParams, state: option?.value });
  };

  useEffect(() => {
    handleListTypeChange(filters.listTypes[0]);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-1 w-full">
      <input
        className="p-2 w-full md:col-span-2 bg-white border border-gray-300 focus:ring-primary-500 focus:border-primary-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:outline-none"
        type="text"
        name="search"
        id="search"
        placeholder={t("general:search_placeholder")}
      />
      <Select
        options={filters.listTypes}
        className="w-full md:col-span-2 text-sm"
        defaultValue={filters.listTypes[0]}
        onChange={(option) => handleListTypeChange(option)}
        instanceId="listTypes"
      />
      <Select
        options={filters.states}
        className="w-full md:col-span-2 text-sm"
        placeholder={t("general:choose_state")}
        onChange={handleStateChange}
        instanceId="states"
      />
      <AsyncSelect
        params={townshipParams}
        path={API_PATH_PROPERTY_FILTER_TOWNSHIP}
        placeholder={t("general:choose_township")}
        optionsKey="townships"
      />
      <Select
        options={filters.types}
        className="w-full md:col-span-2 text-sm"
        placeholder={t("general:choose_type")}
        instanceId="types"
      />
      <Select
        options={priceOptions}
        className="w-full md:col-span-2 text-sm"
        placeholder={t("general:from_price")}
        instanceId="from_price"
      />
      <Select
        options={priceOptions}
        className="w-full md:col-span-2 text-sm"
        placeholder={t("general:to_price")}
        instanceId="to_price"
      />
      <button
        type="button"
        className="py-1.5 justify-center col-span-1 sm:col-span-4 md:col-span-4 lg:col-span-2 w-full mb-2 text-lg font-medium text-white focus:outline-none bg-primary-500 border border-gray-200 hover:bg-primary-800 transition-colors focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white inline-flex items-center gap-1 dark:hover:bg-gray-700"
      >
        <CiSearch />
        {t("general:search")}
      </button>
    </div>
  );
}
