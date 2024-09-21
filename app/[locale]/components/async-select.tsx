import { AsyncPaginate } from "react-select-async-paginate";
import { fetchGet } from "../utils/helpers";
import { API_PATH_TYPE } from "../utils";
import { useTranslation } from "react-i18next";

type AsyncSelectProps = {
  path: API_PATH_TYPE;
  params: Object;
  optionsKey: string;
  placeholder: string;
};

export default function AsyncSelect({
  path,
  params,
  optionsKey,
  placeholder,
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
      className="w-full md:col-span-2 text-sm"
      loadOptions={loadOptions}
      additional={{
        page: 1,
      }}
      key={JSON.stringify(params)}
      placeholder={placeholder}
    />
  );
}
