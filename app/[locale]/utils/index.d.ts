import {
  API_PATH_PROPERTY,
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

export type MetaType = {
  hasMore: boolean;
  nextPage: string;
  total: number;
};

export type MetaLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type CollectionData<T> = {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: MetaLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
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
  | typeof API_PATH_PROPERTY_FILTER_TOWNSHIP
  | typeof API_PATH_PROPERTY;
