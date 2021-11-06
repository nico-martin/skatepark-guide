import { MapParkI, ApiParkWeatherI, ParkI } from '@common/types/parks';
import { API } from '@common/utils/constants';
import { apiGet, apiPost } from './apiFetch';

export type MapBounds = [number, number, number, number];

export const getIPLatLng = () =>
  apiGet<{
    status: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    isp: string;
    org: string;
    as: string;
    query: string;
  }>(`${API.SPG}geo/`);

export const getMapParks = (bounds: MapBounds) =>
  apiGet<{
    parks: Record<string, MapParkI>;
    count: number;
    countTotal: number;
  }>(`${API.SPG}map-parks/?bounds=${bounds.join('|')}`);

export const getPark = (slug: string) =>
  apiGet<ParkI>(`${API.SPG}park/${slug}`);

export const postPark = (slug: string, data: Partial<ParkI>) =>
  apiPost<ParkI>(`${API.SPG}park/${slug}`, data);

export const getWeather = (slug: string, locale: string) =>
  apiGet<ApiParkWeatherI>(`${API.SPG}park-weather/${slug}/?lang=${locale}`);
