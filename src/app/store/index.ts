import { defaultLocale, locales } from '../intl';
import { isDev } from '../vendor/helpers';
import { State } from '@app/store/types';

import createStore, { Store } from 'unistore';
import devtools from 'unistore/devtools';
import { MapBounds } from '@app/vendor/types';
import { getMapParks, getPark } from '@app/vendor/api/spg';
import { mapApiToPark } from '@app/vendor/park';

const initialState: State = {
  intlLocale: defaultLocale,
  intlMessages: locales[defaultLocale][1],
  mapParks: {},
  mapParksLoading: false,
  currentPark: {},
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
  loadPark: ({ mapParks }, slug) => {
    slug in mapParks && store.setState({ currentPark: mapParks[slug] });
    getPark(slug).then(resp => {
      store.setState({ currentPark: mapApiToPark(resp.data[0]) });
    });
  },
  resetPark: () => {
    store.setState({ currentPark: initialState.currentPark });
  },
});

export const store = isDev
  ? createStore(initialState)
  : devtools(createStore(initialState));
