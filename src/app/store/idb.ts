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
  async get(key: string) {
    return (await dbPromise).get('settings', key);
  },
  async set(key: string, val: any) {
    return (await dbPromise).put('settings', val, key);
  },
  async delete(key: string) {
    return (await dbPromise).delete('settings', key);
  },
};
