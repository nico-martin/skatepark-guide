import { apiDelete, apiPost } from '@common/api/apiFetch';
import { ApiImageI } from '@common/types/image';
import { API } from '@common/utils/constants';

export const postImage = (
  file: File,
  params: Record<string, string> = {}
): Promise<ApiImageI> => {
  const formData = new FormData();
  formData.append('file', file);
  Object.entries(params).map(([key, value]) => formData.append(key, value));
  return apiPost<ApiImageI>(`${API.SPG}image/`, formData);
};

export const updateImage = (image: ApiImageI) => {
  const { id, ...data } = image;
  return apiPost<ApiImageI>(`${API.SPG}image/${id}/`, data);
};

export const deleteImage = (id) => apiDelete<{}>(`${API.SPG}image/${id}/`);
