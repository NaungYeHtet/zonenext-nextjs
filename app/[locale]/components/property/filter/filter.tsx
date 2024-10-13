"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import Select, { MultiValue, SingleValue } from "react-select";
import { Option, PROPERTY_LIST_TYPE, PropertyFilterParams } from "../../../lib";
import { API_PATH_PROPERTY_FILTER_TOWNSHIP } from "../../../utils/api-paths";
import AsyncSelect from "../../async-select";
import { useRouter, useSearchParams } from "next/navigation";
import { isEmpty } from "lodash";
import { transformParamsToQueryString } from "@/app/[locale]/utils/helpers";

interface ListTypeOption extends Option {
  label: string;
  value: PROPERTY_LIST_TYPE;
}

export type PropertyFilterOptions = {
  list_types: MultiValue<ListTypeOption>;
  states: MultiValue<Option>;
  townships: MultiValue<Option>;
  types: MultiValue<Option>;
  for_sale_options: MultiValue<Option>;
  for_rent_options: MultiValue<Option>;
  newest_options: MultiValue<Option>;
};

export type PropertyFilterProps = {
  filters: PropertyFilterOptions;
  filterParams: PropertyFilterParams;
};

type TopwnshipParams = {
  search?: string;
  state?: string;
};

const LIST_TYPE = "list_type";
const STATE = "state";
const TYPE = "type";
const PRICE_FROM = "price_from";
const PRICE_TO = "price_to";
const TOWNSHIP = "township";

type FILTER_INSTANCE =
  | typeof LIST_TYPE
  | typeof STATE
  | typeof TYPE
  | typeof PRICE_FROM
  | typeof PRICE_TO
  | typeof TOWNSHIP;

export default function Filter({
  filters: {
    list_types,
    states,
    townships,
    types,
    for_sale_options,
    for_rent_options,
    newest_options,
  },
  filterParams,
}: PropertyFilterProps) {
  const { t, i18n } = useTranslation();
  const [priceOptions, setPriceOptions] = useState<MultiValue<Option>>();
  const [townshipParams, setTownshipParams] = useState<TopwnshipParams>();
  const [search, setSearch] = useState<string>();
  const [listType, setListType] = useState<PROPERTY_LIST_TYPE>("for-sale");
  const [state, setState] = useState<string>();
  const [type, setType] = useState<string>();
  const [priceFrom, setPriceFrom] = useState<string>();
  const [priceTo, setPriceTo] = useState<string>();
  const [township, setTownship] = useState<string>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const handleSelectOption = (
    option: SingleValue<Option>,
    key: FILTER_INSTANCE
  ) => {
    switch (key) {
      case LIST_TYPE:
        setListType(option?.value as PROPERTY_LIST_TYPE);
        break;
      case STATE:
        setState(option?.value);
        setTownship(undefined);
        break;
      case TOWNSHIP:
        setTownship(option?.value);
        break;
      case TYPE:
        setType(option?.value);
        break;
      case PRICE_FROM:
        setPriceFrom(option?.value);
        break;
      case PRICE_TO:
        setPriceTo(option?.value);
    }
  };

  const handleListTypeChange = (
    listTypeOption: SingleValue<ListTypeOption>
  ) => {
    if (listTypeOption) {
      handlePriceOptions(listTypeOption.value);
    }

    handleSelectOption(listTypeOption, LIST_TYPE);
  };

  const handlePriceOptions = (list_type: PROPERTY_LIST_TYPE) => {
    if (list_type == "for-rent") {
      setPriceOptions(for_rent_options);
    } else if (list_type == "for-sale") {
      setPriceOptions(for_sale_options);
    } else {
      setPriceOptions(newest_options);
    }
  };

  const handleStateChange = (option: SingleValue<Option>) => {
    if (!isEmpty(option)) {
      setTownshipParams((prevState) => {
        return {
          ...prevState,
          state: option?.value as string,
        };
      });
    }
    handleSelectOption(option, STATE);
  };

  const handleSearch = () => {
    let path = `/${i18n.language}/${listType}`;

    if (state) {
      path += `/state/${state}`;
    }

    if (township) {
      path += `/township/${township}`;
    }

    if (type) {
      path += `/type/${type}`;
    }

    const queryString = transformParamsToQueryString({
      price_from: priceFrom,
      price_to: priceTo,
      search: search,
    });

    if (queryString) {
      path += `?${queryString}`;
    }

    router.push(path);
  };

  useEffect(() => {
    if (filterParams) {
      const listTypeOption = list_types.filter(
        (option) => option.value === filterParams.list_type
      )[0];

      listTypeOption ? handleListTypeChange(listTypeOption) : "";

      setListType(filterParams.list_type);
      setType(filterParams.type);
      setState(filterParams.state);

      if (filterParams.state) {
        setTownshipParams((prevState) => {
          return {
            ...prevState,
            state: filterParams.state,
          };
        });
      }
      setTownship(filterParams.township);
      setPriceFrom(params.price_from);
      setPriceTo(params.price_to);
      setSearch(params.search);
    }
  }, [filterParams]);

  return (
    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 lg:gap-1">
      <input
        className="block w-full p-2 bg-white border border-gray-300 md:col-span-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:outline-none"
        type="text"
        name="search"
        id="search"
        placeholder={t("general:search_placeholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : "")}
      />
      <Select
        options={list_types}
        className="w-full text-sm lg:col-span-2"
        defaultValue={list_types.find(
          (filter) => filter.value === filterParams?.list_type
        )}
        onChange={(option) => handleListTypeChange(option)}
        instanceId="list_types"
      />
      <Select
        options={states}
        className="w-full text-sm lg:col-span-2"
        placeholder={t("general:choose_state")}
        onChange={(option) => handleStateChange(option)}
        isClearable
        instanceId={STATE}
        defaultValue={states.find(
          (filter) => filter.value === filterParams?.state
        )}
      />
      <AsyncSelect
        className="w-full text-sm lg:col-span-2"
        params={townshipParams}
        path={API_PATH_PROPERTY_FILTER_TOWNSHIP}
        placeholder={t("general:choose_township")}
        onChange={(option: Option) => handleSelectOption(option, TOWNSHIP)}
        optionsKey="townships"
        isClearable
        defaultVal={filterParams?.township}
      />
      <Select
        aria-label={t("general:choose_type", { lng: "en" })}
        options={[{ label: t("general:choose_type"), value: "" }, ...types]}
        className="w-full text-sm lg:col-span-2"
        placeholder={t("general:choose_type")}
        onChange={(option) => handleSelectOption(option, TYPE)}
        isClearable
        instanceId={TYPE}
        defaultValue={types.find(
          (filter) => filter.value === decodeURI(filterParams?.type as string)
        )}
      />
      <Select
        options={priceOptions}
        className="w-full text-sm md:col-span-1 lg:col-span-2"
        placeholder={t("general:from_price")}
        onChange={(option) => handleSelectOption(option, PRICE_FROM)}
        instanceId={PRICE_FROM}
        isClearable
        defaultValue={for_sale_options
          .concat(for_rent_options)
          .concat(newest_options)
          .find((option) => option.value == params.price_from)}
      />
      <Select
        options={priceOptions}
        className="w-full text-sm md:col-span-1 lg:col-span-2"
        placeholder={t("general:to_price")}
        onChange={(option) => handleSelectOption(option, PRICE_TO)}
        instanceId={PRICE_TO}
        isClearable
        defaultValue={for_sale_options
          .concat(for_rent_options)
          .concat(newest_options)
          .find((option) => option.value == params.price_to)}
      />
      <button
        type="button"
        className="py-1.5 justify-center col-span-1 sm:col-span-4 md:col-span-4 lg:col-span-2 w-full mb-2 text-lg font-medium text-white focus:outline-none bg-primary-500 border border-gray-200 hover:bg-primary-800 transition-colors focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white inline-flex items-center gap-1 dark:hover:bg-gray-700"
        onClick={handleSearch}
      >
        <CiSearch />
        {t("general:search")}
      </button>
    </div>
  );
}
