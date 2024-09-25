"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import Select, { MultiValue, SingleValue } from "react-select";
import { Option, PROPERTY_LIST_TYPE } from "../../../lib";
import {
  API_PATH_PROPERTY_FILTER,
  API_PATH_PROPERTY_FILTER_TOWNSHIP,
} from "../../../utils/api-paths";
import AsyncSelect from "../../async-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchGet, transformParamsToQueryString } from "../../../utils/helpers";
import { isEmpty } from "lodash";

interface ListTypeOption extends Option {
  label: string;
  value: PROPERTY_LIST_TYPE;
}

export type PropertyFilterValues = {
  list_types: MultiValue<ListTypeOption>;
  states: MultiValue<Option>;
  townships: MultiValue<Option>;
  types: MultiValue<Option>;
  price_ranges: {
    for_sale: MultiValue<Option>;
    for_rent: MultiValue<Option>;
    newest: MultiValue<Option>;
  };
};

type PropertyFilterProps = {
  filters: PropertyFilterValues;
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

export default function Filter({ filters }: PropertyFilterProps) {
  const { t, i18n } = useTranslation();
  const [priceOptions, setPriceOptions] = useState<MultiValue<Option>>();
  const [townshipParams, setTownshipParams] = useState<TopwnshipParams>();
  const [search, setSearch] = useState<string>("");
  const [listType, setListType] = useState<PROPERTY_LIST_TYPE>("for_sale");
  const [state, setState] = useState<string>();
  const [type, setType] = useState<string>();
  const [priceFrom, setPriceFrom] = useState<number>();
  const [priceTo, setPriceTo] = useState<number>();
  const [township, setTownship] = useState<string>();
  const pathname = usePathname();
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
        setState(option?.value as string);
        setTownship(undefined);
        break;
      case TOWNSHIP:
        setTownship(option?.value as string);
        break;
      case TYPE:
        setType(option?.value as string);
        break;
      case PRICE_FROM:
        setPriceFrom(option?.value as unknown as number);
        break;
      case PRICE_TO:
        setPriceTo(option?.value as unknown as number);
    }
  };

  const handleListTypeChange = (
    listTypeOption: SingleValue<ListTypeOption>
  ) => {
    setPriceOptions([
      ...filters.price_ranges[
        listTypeOption?.value as keyof typeof filters.price_ranges
      ],
    ]);

    handleSelectOption(listTypeOption, LIST_TYPE);
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
    const queryString = transformParamsToQueryString({
      search: search,
      state: state,
      type: type,
      price_from: priceFrom,
      price_to: priceTo,
      township: township,
    });

    let path = `/${i18n.language}/${listType.replace("_", "-")}`;

    if (queryString) {
      path += `?${queryString}`;
    }

    router.push(path);
  };

  useEffect(() => {
    let currentListTypeValue;
    if (pathname.endsWith("for-rent")) {
      currentListTypeValue = "for_rent";
    } else if (pathname.endsWith("neweset")) {
      currentListTypeValue = "newest";
    }

    const listTypeOption = filters.list_types.filter(
      (option) => option.value === "for_sale"
    )[0];

    listTypeOption ? handleListTypeChange(listTypeOption) : "";
  }, []);

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
        options={filters.list_types}
        className="w-full text-sm lg:col-span-2"
        defaultValue={filters.list_types[0]}
        onChange={(option) => handleListTypeChange(option)}
        instanceId="list_types"
      />
      <Select
        aria-label={t("general:choose_type", { lng: "en" })}
        options={[
          { label: t("general:choose_type"), value: "" },
          ...filters.types,
        ]}
        className="w-full text-sm lg:col-span-2"
        placeholder={t("general:choose_type")}
        onChange={(option) => handleSelectOption(option, TYPE)}
        isClearable
        instanceId={TYPE}
        defaultValue={filters.types.find(
          (filter) => filter.value === params.type
        )}
      />
      <Select
        options={filters.states}
        className="w-full text-sm lg:col-span-2"
        placeholder={t("general:choose_state")}
        onChange={(option) => handleStateChange(option)}
        isClearable
        instanceId={STATE}
        defaultValue={filters.states.find(
          (filter) => filter.value === params.state
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
        defaultVal={searchParams.get("township")}
      />
      <Select
        options={priceOptions}
        className="w-full text-sm md:col-span-1 lg:col-span-2"
        placeholder={t("general:from_price")}
        onChange={(option) => handleSelectOption(option, PRICE_FROM)}
        instanceId={PRICE_FROM}
        isClearable
        defaultValue={filters.price_ranges[listType].find(
          (filter) => filter.value === params.township
        )}
      />
      <Select
        options={priceOptions}
        className="w-full text-sm md:col-span-1 lg:col-span-2"
        placeholder={t("general:to_price")}
        onChange={(option) => handleSelectOption(option, PRICE_TO)}
        instanceId={PRICE_TO}
        isClearable
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
