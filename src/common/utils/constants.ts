import { trailingSlashIt } from '@common/utils/helpers';

export const APP = {
  TITLE: APP_TITLE,
  DESCRIPTION: APP_DESCRIPTION,
  API_BASE: trailingSlashIt(API_BASE),
};

export const API: {
  BASE: string;
  SPG: string;
  PARKS: string;
  JWT: string;
} = {
  BASE: APP.API_BASE,
  SPG: `${APP.API_BASE}wp-json/skateparkguide/v1/`,
  PARKS: `${APP.API_BASE}wp-json/wp/v2/parks/`,
  JWT: `${APP.API_BASE}wp-json/jwt-auth/v1/`,
};

export const MESSAGES = {
  GENERAL_ERROR: 'Something went wrong',
};

export const PAGES = ['about', 'impressum', 'privacy'];

export const PROFILE_MENU = { profile: 'account', parks: 'account/parks' };

export const PARK_FACILITIES = ['bowl', 'mini', 'street', 'pumptrack'];
