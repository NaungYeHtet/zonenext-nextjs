import { AsyncPaginate, AsyncPaginateProps } from "react-select-async-paginate";
import { fetchGet } from "../utils/helpers";
import { API_PATH_TYPE, Option } from "../lib";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { MultiValue, SingleValue } from "react-select";
import { isEmpty } from "lodash";

type AsyncSelectProps = {
  path: API_PATH_TYPE;
  params?: Object;
  optionsKey: string;
  placeholder: string;
  isMulti?: boolean;
  defaultVal?: string | string[] | null;
  [key: string]: any;
  dependent?: any;
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
  const { i18n } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      if (!isEmpty(defaultVal)) {
        const data = await fetchGet(path, {
          ...params,
          language: i18n.language,
          slug: defaultVal,
        });
        setValue(data[optionsKey]);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setValue(undefined);
  }, [params]);

  async function loadOptions(search: any, loadedOptions: any, addtional: any) {
    const data = await fetchGet(path, {
      ...params,
      language: i18n.language,
      search: search,
      page: addtional.page,
    });

    return {
      options: data[optionsKey],
      hasMore: data.meta.hasMore,
      additional: {
        page: addtional.page + 1,
      },
    };
  }

  const handleChange = (option: MultiValue<Option> | SingleValue<Option>) => {
    setValue(option);

    onChange(option);
  };

  return (
    <AsyncPaginate
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
