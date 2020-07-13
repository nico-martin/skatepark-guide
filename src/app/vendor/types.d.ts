import { string } from 'prop-types';

export type MapBounds = [number, number, number, number];

export type Image = [string, number, number, boolean?];

export interface MapPark {
  id: number;
  slug: string;
  title: string;
  map: {
    lat: number;
    lng: number;
  };
  headImage: Image;
  facilities: Map<string, boolean>;
  status: 'publish' | 'deleted';
}

export interface Park extends MapPark {
  video: string;
  content: string;
  contact: {
    [key: string]: string;
  };
  gallery: Array<Image>;
}

export interface ApiPark {
  id: number;
  slug: string;
  status: 'publish' | 'deleted';
  type: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  'parks-logo': Image;
  'head-image': Image;
  'parks-gallery': Array<Image>;
  'parks-video': string;
  'parks-anlage': 'outside' | 'inside' | 'both';
  'parks-facilities': Map<string, boolean>;
  'parks-homepage': string;
  'parks-email': string;
  'parks-phone': string;
  'parks-facebook': string;
  'parks-address': string;
  map: {
    lat: number;
    lng: number;
  };
}

export interface ApiWeather {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    id: number;
    main: string;
  }>;
  wind: {
    deg: number;
    speed: number;
  };
}
