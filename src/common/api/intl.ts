import { apiGet } from '@common/api/apiFetch';
import { ApiOverviewI, IntlMessages } from '@common/intl/types';
import { API } from '@common/utils/constants';

export const getLanguageOverview = () =>
  apiGet<ApiOverviewI>(`${API.SPG}lang/`);

export const getLanguageMessages = (language: string) =>
  apiGet<IntlMessages>(`${API.SPG}lang/${language}/`);
