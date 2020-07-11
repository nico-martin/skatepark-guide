import { IntlMessages } from '@app/intl/types';
import { MapPark } from '@app/vendor/types';

export interface State {
  intlLocale: string;
  intlMessages: IntlMessages;
  mapParks: {
    [key: string]: MapPark;
  };
  mapParksLoading: boolean;
}

export interface Actions {
  loadMapParks: (State) => void;
  loadPark: (State) => void;
}
