import { apiPost } from '@common/api/apiFetch';
import { ApiPostLoginI } from '@common/auth/types';
import { API } from '@common/utils/constants';

export const postLogin = (username: string, password: string) =>
  apiPost<ApiPostLoginI>(`${API.JWT}token/`, { username, password });
