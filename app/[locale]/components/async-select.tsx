import { AsyncPaginate, AsyncPaginateProps } from "react-select-async-paginate";
import { fetchGet } from "../utils/helpers";
import { API_PATH_TYPE } from "../utils";
import { useTranslation } from "react-i18next";

type AsyncSelectProps = {
  path: API_PATH_TYPE;
  params: Object;
  optionsKey: string;
  placeholder: string;
  [key: string]: any;
};

export default function AsyncSelect({
  path,
  params,
  optionsKey,
  placeholder,
  ...otherProps
}: AsyncSelectProps) {
  const { i18n } = useTranslation();

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

  return (
    <AsyncPaginate
      loadOptions={loadOptions}
      additional={{
        page: 1,
      }}
      key={JSON.stringify(params)}
      placeholder={placeholder}
      {...otherProps}
    />
  );
}
