import {
  API_PATH_PROPERTY_FILTER,
  API_PATH_PROPERTY_FILTER_TOWNSHIP,
} from "./api-paths";

export type GroupData<GroupType> = {
  group: {
    name: string;
    slug: string;
    description: string;
    items: GroupType[];
  };
};

export type ResponseData<DataType> = {
  data: DataType;
  message: string;
  status: number;
};

export type Option = {
  label: string;
  value: string;
};

export type Price = {
  rent?: string;
  sell?: string;
};

export type Property = {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  price: Price;
  address: string;
  gallery: array[];
  squareFeet: string;
  areaDescription: string;
  bedroomsCount: number;
  bathroomsCount: number;
  postedAt: string;
};

export type API_PATH_TYPE =
  | typeof API_PATH_PROPERTY_FILTER
  | typeof API_PATH_PROPERTY_FILTER_TOWNSHIP;
