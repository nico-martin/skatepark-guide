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
