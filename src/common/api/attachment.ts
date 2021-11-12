import { apiPost, apiPut } from '@common/api/apiFetch';
import { API } from '@common/utils/constants';

export const postAttachment = (
  file: File,
  params: Record<string, string> = {}
) => {
  const formData = new FormData();
  formData.append('file', file);
  Object.entries(params).map(([key, value]) => formData.append(key, value));
  return apiPost<any>(`${API.SPG}attachment/`, formData);
};
