import { apiGet } from '@common/api/apiFetch';
import { ApiPageI } from '@common/types/page';
import { API } from '@common/utils/constants';

export const getPage = (slug: string) =>
  apiGet<ApiPageI>(`${API.SPG}page/${slug}/`);
