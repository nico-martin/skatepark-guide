import { apiGet } from '@common/api/apiFetch';
import { ApiOverviewI, IntlMessages } from '@common/intl/types';
import { API } from '@common/utils/constants';

export const getLanguageOverview = () =>
  apiGet<ApiOverviewI>(`${API.REST}lang/`);

export const getLanguageMessages = (language: string) =>
  apiGet<IntlMessages>(`${API.REST}lang/${language}/`);
