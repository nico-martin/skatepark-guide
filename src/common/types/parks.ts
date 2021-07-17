import dayjs from 'dayjs';
import { ApiImageI } from '@common/types/image';
import { PARK_FACILITIES } from '@common/utils/constants';

export type ParkFacilitiesT = Record<typeof PARK_FACILITIES[number], boolean>;

interface GeoDataI {
  lat: number;
  lng: number;
}

export interface MapParkI {
  id: number;
  slug: string;
  title: string;
  map: GeoDataI;
  headImage: null;
  parksFacilities: ParkFacilitiesT;
  status: number;
}

export interface ApiParkI {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'deleted';
  type: 'parks';
  link: string;
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
  featured_media: number;
  parksLogo: ApiImageI;
  headImage: ApiImageI;
  parksGallery: Array<ApiImageI>;
  parksVideo: string;
  parksAnlage: string;
  parksFacilities: ParkFacilitiesT;
  parksHomepage: string;
  parksEmail: string;
  parksPhone: string;
  parksFacebook: string;
  parksAddress: string;
  map: GeoDataI;
}

export interface ParkI {
  title: string;
  content: string;
  slug: string;
  logo: ApiImageI;
  headImage: ApiImageI;
  gallery: Array<ApiImageI>;
  video: string;
  anlage: string;
  facilities: ParkFacilitiesT;
  contact: {
    homepage: string;
    email: string;
    phone: string;
    facebook: string;
    address: string;
  };
  map: GeoDataI;
}

export interface ApiParkWeatherI {
  city: {
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
  };
  days: Array<{
    localDateTime: string;
    icon: string;
    temp: number;
    desc: string;
    weekday: string;
  }>;
  source: {
    url: string;
    time: string;
  };
}

export interface ParkWeatherDayI {
  localDateTime: dayjs.Dayjs;
  icon: string;
  temp: number;
  desc: string;
  weekday: string;
}

export interface ParkWeatherI {
  city: {
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
  };
  days: Array<ParkWeatherDayI>;
  source: {
    url: string;
    time: string;
  };
}
