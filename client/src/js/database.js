import { openDB } from 'idb';

const initdb = async () => {
  console.log('initdb initialized')
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

export const putDb = async (content) => {
  console.log('PUT to the JATE database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, jate: content });
  const result = await request;
  console.log('🚀 - Data successfully saved to the database', result.value);
};

export const getDb = async () => {
  console.log('GET all from the JATE database');
  const jateDb = await openDB('jate', 1);
  console.log('Opened database successfully!');
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('Return result.value', result.value);
};

initdb();
