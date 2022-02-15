import { settingsDB } from '@common/idb';
import { MESSAGES } from '@common/utils/constants';
import { nextWindow } from '@common/utils/helpers';

export const apiGet = <T>(url: string): Promise<T> =>
  apiFetch({ url, method: 'GET' });

export const apiPost = <T>(
  url: string,
  data: Record<string, any>
): Promise<T> => apiFetch({ url, method: 'POST', body: data });

export const apiPut = <T>(url: string, data: Record<string, any>): Promise<T> =>
  apiFetch({ url, method: 'PUT', body: data });

export const apiDelete = <T>(url: string): Promise<T> =>
  apiFetch({ url, method: 'DELETE' });

const apiFetch = <T>({
  url,
  method,
  headers = {},
  body = {},
}: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, any>;
  body?: Record<string, any> | FormData;
}): Promise<T> =>
  new Promise((resolve, reject) => {
    fetch(url, {
      method,
      ...(method === 'POST' || method === 'PUT'
        ? {
            body:
              typeof FormData !== 'undefined' && body instanceof FormData
                ? body
                : JSON.stringify(body),
          }
        : {}),
      headers: {
        ...headers,
        ...(typeof FormData !== 'undefined' && body instanceof FormData
          ? {}
          : { 'Content-Type': 'application/json' }),
        ...(Boolean(nextWindow.jwt)
          ? {
              Authorization: `Bearer ${nextWindow.jwt}`,
            }
          : {}),
      },
    })
      .then((resp) => Promise.all([resp, resp.json()]))
      .then(([resp, data]) => {
        if (resp.status < 300) {
          resolve(data);
        } else {
          data.code === 'jwt_auth_invalid_token' &&
            settingsDB.delete('jwt').then(() => window.location.reload());

          reject(
            typeof data === 'string'
              ? data
              : data?.message
              ? data.message
              : data.toString()
          );
        }
      })
      .catch((e) => {
        reject(MESSAGES.GENERAL_ERROR);
      });
  });
