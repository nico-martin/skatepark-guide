import { defaultLocale, locales } from '../intl';
import { isDev } from '../vendor/helpers';
import { State } from '@app/store/types';

import createStore, { Store } from 'unistore';
import devtools from 'unistore/devtools';
import { MapBounds } from '@app/vendor/types';
import { getMapParks } from '@app/vendor/api/spg';
import { settingsDB } from '@app/store/idb';

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
  loved: [],
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
  setLoved: ({ loved }, parks: Array<string>) => {
    parks.map(park => {
      loved = [...loved, ...(loved.indexOf(park) === -1 ? [park] : [])];
    });
    settingsDB.set('loved', loved);
    store.setState({ loved });
  },
  setIdbLoved: ({ loved }) => {
    settingsDB.get('loved').then(loved => store.setState({ loved }));
  },
  removeLoved: ({ loved }, parks: Array<string>) => {
    loved = loved.filter(el => !parks.includes(el));
    settingsDB.set('loved', loved);
    store.setState({ loved });
  },
});

export const store = isDev
  ? createStore(initialState)
  : devtools(createStore(initialState));
