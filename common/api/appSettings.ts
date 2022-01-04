import { apiGet } from '@common/api/apiFetch';
import { API } from '@common/utils/constants';

export const getAppSettings = <T>(): Promise<T> => apiGet<T>(`${API.SPG}app/`);
