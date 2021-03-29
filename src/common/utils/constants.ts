import { trailingSlashIt } from './helpers';

export const APP = {
  TITLE: APP_TITLE,
  DESCRIPTION: APP_DESCRIPTION,
  API_BASE: trailingSlashIt(API_BASE),
};

export const API: {
  BASE: string;
  REST: string;
  PARKS: string;
} = {
  BASE: APP.API_BASE,
  REST: `${APP.API_BASE}wp-json/skateparkguide/`,
  PARKS: `${APP.API_BASE}wp-json/wp/v2/parks/`,
};