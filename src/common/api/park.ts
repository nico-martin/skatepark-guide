import { ApiParkI, MapParkI, ApiParkWeatherI } from '@common/types/parks';
import { API } from '@common/utils/constants';
import { apiGet } from './apiFetch';

export type MapBounds = [number, number, number, number];

export const getIPLatLng = () => apiGet(`${API.REST}v1/geo/`);

export const getMapParks = (bounds: MapBounds) =>
  apiGet<{
    parks: Record<string, MapParkI>;
    count: number;
    countTotal: number;
  }>(`${API.REST}map-parks/?boundse=${bounds.join('|')}`);

export const getPark = (slug: string) =>
  apiGet<Array<ApiParkI>>(`${API.PARKS}?slug=${slug}`);

export const getWeather = (slug: string, locale: string) =>
  apiGet<ApiParkWeatherI>(`${API.REST}park-weather/${slug}/?lang=${locale}`);
