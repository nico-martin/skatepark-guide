import { defaultLocale, locales } from '../intl';
import { isDev } from '../vendor/helpers';
import { State } from '@app/store/types';

import createStore, { Store } from 'unistore';
import devtools from 'unistore/devtools';

const initialState: State = {
  intlLocale: defaultLocale,
  intlMessages: locales[defaultLocale][1],
};

export function actions(store: Store<State>) {
  return {};
}

export const store = isDev
  ? createStore(initialState)
  : devtools(createStore(initialState));
