import { ApiParkI, MapParkI, ApiParkWeatherI } from '@common/types/parks';
import { API } from '@common/utils/constants';
import { apiGet } from './apiFetch';

export type MapBounds = [number, number, number, number];

export const getIPLatLng = () => apiGet(`${API.SPG}v1/geo/`);

export const getMapParks = (bounds: MapBounds) =>
  apiGet<{
    parks: Record<string, MapParkI>;
    count: number;
    countTotal: number;
  }>(`${API.SPG}map-parks/?boundse=${bounds.join('|')}`);

export const getPark = (slug: string) =>
  apiGet<Array<ApiParkI>>(`${API.PARKS}?slug=${slug}`);

export const getWeather = (slug: string, locale: string) =>
  apiGet<ApiParkWeatherI>(`${API.SPG}park-weather/${slug}/?lang=${locale}`);
