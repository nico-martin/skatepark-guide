import { ApiImageI } from '@common/types/image';
import { MapParkI, ApiParkWeatherI, ParkI } from '@common/types/parks';
import { API } from '@common/utils/constants';
import { apiDelete, apiGet, apiPost, apiPut } from './apiFetch';

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
  apiGet<ParkI>(`${API.SPG}parks/${slug}`);

export const postPark = (slug: string, data: Partial<ParkI>) =>
  apiPost<ParkI>(`${API.SPG}parks/${slug}`, data);

export const deletePark = (slug: string) =>
  apiDelete<ParkI>(`${API.SPG}parks/${slug}`);

export const putPark = (title: string, location: MapParkI) =>
  apiPut<string>(`${API.SPG}parks/`, { title, location });

export const getWeather = (slug: string, locale: string) =>
  apiGet<ApiParkWeatherI>(`${API.SPG}park-weather/${slug}/?lang=${locale}`);

export const getImages = (slug: string) =>
  apiGet<Array<ApiImageI>>(`${API.SPG}park-images/${slug}/`);
