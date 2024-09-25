import {
  API_PATH_GROUP,
  API_PATH_PROPERTY,
  API_PATH_PROPERTY_FILTER,
  API_PATH_PROPERTY_FILTER_TOWNSHIP,
} from "../utils/api-paths";

export type ResponseData<DataType> = {
  data: DataType;
  message: string;
  status: number;
};

export type MetaType = {
  has_more: boolean;
  next_page: string;
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

export type Group<T> = {
  name: string;
  slug: string;
  description: string;
  items: T[];
};

export type GroupData<T> = {
  group: {
    name: string;
    slug: string;
    description: string;
    items: T[];
  };
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
  cover_image: string;
  price: Price;
  address: string;
  gallery: array[];
  square_feet: string;
  area_description: string;
  bedrooms_count: number;
  bathrooms_count: number;
  posted_at: string;
};

export type PropertyFilterParams = {
  locale: string;
  list_type: PROPERTY_LIST_TYPE;
  state?: string;
  township?: string;
  type?: string;
  from?: string;
  to?: string;
  s?: string;
};

export type API_PATH_TYPE =
  | typeof API_PATH_PROPERTY_FILTER
  | typeof API_PATH_PROPERTY_FILTER_TOWNSHIP
  | typeof API_PATH_PROPERTY
  | typeof API_PATH_GROUP;

export type PROPERTY_LIST_TYPE = "for-sale" | "for-rent" | "newest";
