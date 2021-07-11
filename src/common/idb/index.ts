import { openDB, DBSchema } from 'idb';

const dbName = 'skatepark-guide';

interface SettingsDBSchema extends DBSchema {
  settings: {
    key: string;
    value: any;
  };
}

const dbPromise = openDB<SettingsDBSchema>(dbName, 1, {
  upgrade(db) {
    db.createObjectStore('settings');
  },
});

export const settingsDB = {
  get: async (key: string) => (await dbPromise).get('settings', key),
  set: async (key: string, val: any) =>
    (await dbPromise).put('settings', val, key),
  delete: async (key: string) => (await dbPromise).delete('settings', key),
};
