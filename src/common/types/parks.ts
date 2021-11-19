import dayjs from 'dayjs';
import { ApiImageI } from '@common/types/image';
import { PARK_FACILITIES } from '@common/utils/constants';

export type ParkFacilitiesT = Record<typeof PARK_FACILITIES[number], boolean>;

export interface GeoDataI {
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

export interface ParkI {
  id: number;
  title: string;
  content: string;
  slug: string;
  logo: ApiImageI;
  headImage: ApiImageI;
  gallery: Array<ApiImageI>;
  video: string;
  anlage: string;
  facilities: ParkFacilitiesT;
  contact: ParkContactsI;
  map: GeoDataI;
  canEdit: boolean;
}

export interface ApiParkWeatherI {
  city: {
    name: string;
    coord: GeoDataI;
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
    coord: GeoDataI;
    country: string;
  };
  days: Array<ParkWeatherDayI>;
  source: {
    url: string;
    time: string;
  };
}

export interface ParkContactsI {
  homepage: string;
  email: string;
  phone: string;
  facebook: string;
  instagram: string;
  address: string;
}
