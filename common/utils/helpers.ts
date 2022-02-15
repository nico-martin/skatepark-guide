import { Func } from 'idb/build/util';
import { GetServerSidePropsContext } from 'next';
import { ParkFacilitiesT } from '@common/types/parks';

export const untrailingSlashIt = (str: string = ''): string =>
  str.replace(/\/$/, '');

export const trailingSlashIt = (str: string = ''): string =>
  untrailingSlashIt(str) + '/';

export const unleadingSlashIt = (str: string = ''): string =>
  str.replace(/^\//, '');

export const leadingSlashIt = (str: string = ''): string =>
  '/' + unleadingSlashIt(str);

export const nl2br = (str: string = '') =>
  str === '' ? '' : (str + '').replace(/(\r\n|\n\r|\r|\n)/g, '<br>$1');

const ids: Object = {};
export const unique = (key: string, scope: string = 'global'): string => {
  if (ids[scope] === undefined) {
    ids[scope] = [];
  }

  let id = key;
  let idNum: number = 1;
  while (ids[scope].indexOf(id) !== -1) {
    id = key + '-' + idNum;
    idNum++;
  }

  ids[scope].push(id);
  return id;
};

export const getActiveFacilities = (
  facilities: ParkFacilitiesT
): Array<string> =>
  Object.entries(facilities)
    .map(([item, isSet]) => (isSet ? item : null))
    .filter(Boolean);

export const objectShallowEqual = (object1: Object, object2: Object): boolean =>
  Object.keys(objectDiff(object1, object2)).length !== 0;

export const objectDiff = (
  oldObject: Object = {},
  newObject: Object = {}
): Object =>
  Object.entries(oldObject).reduce((acc, [key, oldValue]) => {
    const newValue = newObject[key] || null;
    return {
      ...acc,
      ...(JSON.stringify(newValue) !== JSON.stringify(oldValue) && newValue
        ? {
            [key]: newValue,
          }
        : {}),
    };
  }, {});

export const nextWindow: {
  jwt?: string;
  navigator?: {};
  installEvent?: any;
  addEventListener?: Function;
} =
  typeof window !== 'undefined'
    ? window
    : {
        navigator: {},
      };
export const isBrowser = () => typeof window !== 'undefined';
export const isNode = () => !isBrowser();

export const isNextRouterRequest = (context: GetServerSidePropsContext) =>
  context.req.url.startsWith('/_next/data');
