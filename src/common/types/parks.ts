import { Image } from '@common/types/image';

interface ParkFacilitiesI {
  bowl: boolean;
  mini: boolean;
  street: boolean;
  pumptrack: boolean;
}

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
  parksFacilities: ParkFacilitiesI;
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
  parksLogo: Image;
  headImage: Image;
  parksGallery: Array<Image>;
  parksVideo: string;
  parksAnlage: string;
  parksFacilities: ParkFacilitiesI;
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
  logo: Image;
  headImage: Image;
  gallery: Array<Image>;
  video: string;
  anlage: string;
  facilities: ParkFacilitiesI;
  homepage: string;
  email: string;
  phone: string;
  facebook: string;
  address: string;
  map: GeoDataI;
}
