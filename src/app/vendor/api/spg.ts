import axios from 'axios';
import { api } from '../settings';
import { MapBounds } from '@app/vendor/types';
import { Promise } from 'es6-promise';
import { mapApiToPark } from '@app/vendor/park';

export const getIPLatLng = () => axios.get(`${api.rest}v1/geo/`);

export const getMapParks = (bounds: MapBounds) =>
  axios.get(`${api.rest}v2/map-parks/?bounds=${bounds.join('|')}`);

export const getPark = (slug: string) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${api.parks}?slug=${slug}`)
      .then(resp => resolve(mapApiToPark(resp.data[0])))
      .catch(e => reject(e));
  });

export const getWeather = (slug: string, locale: string) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${api.rest}v1/park-weather/${slug}/?lang=${locale}`)
      .then(resp => resolve(resp.data))
      .catch(e => reject(e));
  });
