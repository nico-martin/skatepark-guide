import { apiPost, apiGet } from '@common/api/apiFetch';
import { ApiGetUserI, ApiPostLoginI, ApiUpdateUserI } from '@common/auth/types';
import { API } from '@common/utils/constants';

export const postLogin = (username: string, password: string) =>
  apiPost<ApiPostLoginI>(`${API.JWT}token/`, { username, password });

export const postSignup = (email: string, password: string) =>
  apiPost<ApiPostLoginI>(`${API.SPG}signup/`, { email, password });

export const updateMe = (data: ApiUpdateUserI) =>
  apiPost<ApiGetUserI>(`${API.SPG}user/`, data);

export const getMe = () => apiGet<ApiGetUserI>(`${API.SPG}user/`);

console.log(location.protocol + '//' + location.host);

export const postPasswordReset = (
  email: string,
  urlTemplate: string = '',
  redirect: string = ''
) =>
  apiPost<{
    message: string;
    mailSent: boolean;
    userEmail: string;
  }>(`${API.SPG}password/reset/`, {
    email,
    redirect,
    urlTemplate,
  });

export const postPasswordConfirm = (password: string, pwkey: string) =>
  apiPost<{ message: string; redirect: string; userEmail: string }>(
    `${API.SPG}password/confirm/`,
    {
      password,
      pwkey,
    }
  );
