import {
  API_PATH_PROPERTY_FILTER,
  API_PATH_PROPERTY_FILTER_TOWNSHIP,
} from "./api-paths";

export type Option = {
  label: string;
  value: string;
};

export type API_PATH_TYPE =
  | typeof API_PATH_PROPERTY_FILTER
  | typeof API_PATH_PROPERTY_FILTER_TOWNSHIP;
