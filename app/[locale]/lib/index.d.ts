import * as apiPaths from "../utils/api-paths";

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

export type Property = {
  slug: string;
  code: string;
  type: Option;
  acquisition_type: string;
  title: string;
  description: string;
  cover_image: string;
  price: string;
  address: string;
  gallery: array[];
  square_feet: string;
  area_description: string;
  bedrooms_count: number;
  bathrooms_count: number;
  posted_at: string;
  amenities: string[];
  views_count: number;
  agent_name: string;
  agent_phone: string;
  agent_image: string;
  agent_email: string;
};

export type PropertyFilterParams = {
  locale: string;
  list_type: PROPERTY_LIST_TYPE;
  state?: string;
  township?: string;
  type?: string;
};

export type User = {
  name: string;
  email: string;
  language: LanguageType;
  phone: string;
};

export type ValidationErrors = {
  [key: string]: string[];
};

export type API_PATH_TYPE =
  | typeof apiPaths.API_PATH_PROPERTY_FILTER
  | typeof apiPaths.API_PATH_PROPERTY_FILTER_TOWNSHIP
  | typeof apiPaths.API_PATH_PROPERTY
  | typeof apiPaths.API_PATH_GROUP
  | typeof apiPaths.API_PATH_INQUIRY
  | typeof apiPaths.API_PATH_PROFILE
  | typeof apiPaths.API_PATH_EMAIL_VERIFY
  | typeof apiPaths.API_PATH_SIGNUP
  | typeof apiPaths.API_PATH_LOGIN
  | typeof apiPaths.API_PATH_LOGOUT
  | typeof apiPaths.API_PATH_EMAIL_VERIFICATION_NOTI;

export type PROPERTY_LIST_TYPE = "for-sale" | "for-rent" | "newest";
