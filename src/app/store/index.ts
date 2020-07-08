import { defaultLocale, locales } from '../intl';
import { isDev } from '../vendor/helpers';
import { State } from '@app/store/types';

import createStore, { Store } from 'unistore';
import devtools from 'unistore/devtools';
import { MapBounds } from '@app/vendor/types';
import { getMapParks, getPark } from '@app/vendor/api/spg';
import { mapApiToPark } from '@app/vendor/park';

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
  park: {
    state: parkStates.LOADING,
    error: '',
    data: {},
  },
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
  loadPark: ({ mapParks, park }, slug = '') => {
    store.setState({
      park: {
        ...park,
        state: parkStates.LOADING,
      },
    });
    if (slug === '') {
      store.setState({
        park: initialState.park,
      });
    } else {
      slug in mapParks &&
        store.setState({
          park: {
            ...park,
            data: mapParks[slug],
          },
        });
      getPark(slug)
        .then(resp => {
          store.setState({
            park: {
              ...park,
              state: parkStates.SUCCESS,
              data: mapApiToPark(resp.data[0]),
            },
          });
        })
        .catch(() => {
          store.setState({
            park: {
              ...park,
              state: parkStates.ERROR,
              error: 'Park could not be loaded',
            },
          });
        });
    }
  },
});

export const store = isDev
  ? createStore(initialState)
  : devtools(createStore(initialState));
