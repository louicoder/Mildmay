import Firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const DB = Firestore();

export const getSingleDoc = async (collection, docId, callback) => {
  await DB.collection(collection)
    .doc(docId)
    .get()
    .then((doc) => callback({ error: null, doc: doc.data() }))
    .catch((error) => callback({ error, doc: null }));
};

export const getMatchingDocs = async (field, collection, docsArray, callback) => {
  await firestore()
    .collection(collection)
    .where(field, 'in', docsArray)
    .get()
    .then((resp) => {
      if (response._docs) {
        return { docs: [ ...response._docs.map((doc) => ({ ...doc.data(), id: doc.id })) ], error: null };
      }
    })
    .catch((error) => callback({ error, docs: null }));
};

export const createDoc = async (collection, payload, callback) => {
  await DB.collection(collection)
    .add(payload)
    .then((doc) => callback({ error: null, doc: doc.id }))
    .catch((error) => callback({ error, doc: null }));
};

export const collectionRealTime = (collection, callback) => {
  try {
    DB.collection(collection).onSnapshot((response) => {
      if (response.docs) {
        let docs = [];
        for (const doc of response.docs) {
          docs.push({ ...doc.data(), id: doc.id });
        }
        callback({ error: null, docs });
      }
    });
  } catch (error) {
    callback({ error, docs: null });
  }
};

export const updateDoc = async (collection, docId, payload, callback) => {
  console.log('Doc id', docId, payload);
  await DB.doc(`${collection}/${docId}`)
    .set(payload, { merge: true })
    .then((resp) => {
      console.log('REsp from update', resp);
      callback();
    })
    .catch((error) => callback({ error, doc: null }));
};
