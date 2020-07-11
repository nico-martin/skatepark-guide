import { defaultLocale, locales } from '../intl';
import { isDev } from '../vendor/helpers';
import { State } from '@app/store/types';

import createStore, { Store } from 'unistore';
import devtools from 'unistore/devtools';
import { MapBounds } from '@app/vendor/types';
import { getMapParks, getPark } from '@app/vendor/api/spg';

export const parkStates = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const initialState: State = {
  intlLocale: defaultLocale,
  intlMessages: locales[defaultLocale][1],
  mapParks: {},
  mapParksLoading: false,
};

export const actions = (store: Store<State>) => ({
  loadMapParks: ({ mapParks, mapParksLoading }, bounds: MapBounds) => {
    store.setState({ mapParksLoading: true });
    getMapParks(bounds).then(resp =>
      store.setState({
        mapParks: { ...mapParks, ...resp.data.parks },
        mapParksLoading: false,
      })
    );
  },
});

export const store = isDev
  ? createStore(initialState)
  : devtools(createStore(initialState));
