import axios from 'axios';
import { API } from '@common/utils/constants';

export type MapBounds = [number, number, number, number];

export const getIPLatLng = () => axios.get(`${API.REST}v1/geo/`);

export const getMapParks = (bounds: MapBounds) =>
  axios.get(`${API.REST}v2/map-parks/?bounds=${bounds.join('|')}`);

export const getPark = (slug: string) => axios.get(`${API.PARKS}?slug=${slug}`);

export const getWeather = (slug: string, locale: string) =>
  axios.get(`${API.REST}v1/park-weather/${slug}/?lang=${locale}`);
