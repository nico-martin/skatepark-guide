import { ApiImageI } from '@common/types/image';

export interface ApiPostLoginI {
  token: string;
  user_display_name: string;
  user_email: string;
  user_nicename: string;
}

export interface ApiParkList {
  slug: string;
  title: string;
  image: ApiImageI;
  parksAddress: string;
}

export interface ApiGetUserI {
  user_email: string;
  user_display_name: string;
  user_firstname: string;
  user_lastname: string;
  user_url: string;
  sportart: string;
  description: string;
  parks: Array<ApiParkList>;
}

export interface ApiUpdateUserI {
  user_firstname: string;
  user_lastname: string;
  user_url: string;
  description: string;
}
