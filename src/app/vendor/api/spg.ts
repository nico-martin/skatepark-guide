import axios from 'axios';
import { api } from '../settings';
import { MapBounds } from '@app/vendor/types';

export const getIPLatLng = () => axios.get(`${api.rest}v1/geo/`);

export const getMapParks = (bounds: MapBounds) =>
  axios.get(`${api.rest}v2/map-parks/?bounds=${bounds.join('|')}`);

export const getPark = (slug: string) => axios.get(`${api.parks}?slug=${slug}`);

export const getWeather = (slug: string, locale: string) =>
  axios.get(`${api.rest}v1/park-weather/${slug}/?lang=${locale}`);
