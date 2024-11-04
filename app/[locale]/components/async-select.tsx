import { AsyncPaginate } from "react-select-async-paginate";
import { fetchApi } from "../utils/helpers";
import { API_PATH_TYPE, Option } from "../lib";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { MultiValue, SingleValue } from "react-select";
import { isEmpty } from "lodash";

type AsyncSelectProps = {
  path: API_PATH_TYPE;
  params?: object;
  optionsKey: string;
  placeholder: string;
  isMulti?: boolean;
  defaultVal?: string | string[] | null;
  [key: string]: any;
};

export default function AsyncSelect({
  path,
  params,
  optionsKey,
  placeholder,
  isMulti = false,
  defaultVal,
  onChange = () => {},
  ...otherProps
}: AsyncSelectProps) {
  const [value, setValue] = useState<
    SingleValue<Option> | MultiValue<Option>
  >();
  const {
    i18n: { language },
  } = useTranslation();

  const fetchData = useCallback(async () => {
    if (!isEmpty(defaultVal)) {
      const { data } = await fetchApi({
        method: "GET",
        path,
        body: {
          ...params,
          language: language,
          slug: defaultVal,
        },
        options: { next: { revalidate: 60 * 60 * 24 * 5 } },
      });

      setValue(data[optionsKey]);
    }
  }, [defaultVal, path, params, language, optionsKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setValue(undefined);
  }, [params]);

  async function loadOptions(search: any, loadedOptions: any, { page }: any) {
    const { data } = await fetchApi({
      method: "GET",
      path,
      body: {
        ...params,
        language: language,
        search: search,
        page: page,
      },
      options: { next: { revalidate: 60 * 60 * 24 * 5 } },
    });

    return {
      options: data[optionsKey],
      hasMore: data.meta.has_more,
      additional: {
        page: page + 1,
      },
    };
  }

  const handleChange = (option: MultiValue<Option> | SingleValue<Option>) => {
    setValue(option);

    onChange(option);
  };

  return (
    <AsyncPaginate
      debounceTimeout={500}
      key={JSON.stringify(params)}
      value={value}
      onChange={handleChange}
      loadOptions={loadOptions}
      additional={{
        page: 1,
      }}
      placeholder={placeholder}
      {...otherProps}
      isMulti={isMulti}
    />
  );
}
