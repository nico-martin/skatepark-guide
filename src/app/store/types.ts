import { IntlMessages } from '@app/intl/types';
import { MapPark, Park } from '@app/vendor/types';

export interface State {
  intlLocale: string;
  intlMessages: IntlMessages;
  mapParks: {
    [key: string]: MapPark;
  };
  mapParksLoading: boolean;
  park: {
    state: string;
    error: string;
    data: Partial<Park>;
  };
}

export interface Actions {
  loadMapParks: (State) => void;
  loadPark: (State) => void;
}
