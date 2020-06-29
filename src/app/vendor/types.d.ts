export type MapBounds = [number, number, number, number];

export interface MapPark {
  id: number;
  slug: string;
  title: string;
  map: {
    lat: number;
    lng: number;
  };
  headImage: string;
  facilities: Map<string, boolean>;
  status: 'publish' | 'deleted';
}
export interface Skatepark extends MapPark {}
