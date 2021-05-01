import Firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const DB = Firestore();

export const getSingleDoc = async (collection, docId, callback) => {
  await DB.collection(collection)
    .doc(docId)
    .get()
    .then((doc) => {
      callback({ error: null, doc: doc.data() });
    })
    .catch((error) => callback({ error, doc: null }));
};

export const getMultipleDocs = async (collection, where, callback) => {
  try {
    const whr = `'Users.accountType','==', 'Doctor' `;
    const query = whr.length
      ? await DB.collection(collection).where('accountType', '==', 'Doctor').get()
      : await DB.collection(collection).get();
    const docs = [ ...query.docs.map((doc) => ({ ...doc.data(), id: doc.id })) ];
    return callback({ error: null, doc: docs });
  } catch (error) {
    return callback({ error, doc: null });
  }
};

export const getMatchingDocs = async (field, collection, docsArray, callback) => {
  await Firestore()
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

export const getDocsOrderedByTimeStamp = (collection, limit = 5, callback) =>
  Firestore()
    .collection(collection)
    .orderBy('timeStamp', 'desc')
    .limit(limit)
    .onSnapshot((snapshot) => callback([ ...snapshot.docs.map((snap) => ({ ...snap.data(), id: snap.id })) ]));

export const createDoc = async (collection, payload, callback) => {
  await DB.collection(collection)
    .add(payload)
    .then((doc) => callback({ error: null, doc: doc.id }))
    .catch((error) => callback({ error, doc: null }));
};

export const createDocWithId = async (collection, payload, docId, callback) => {
  await DB.collection(collection)
    .doc(docId)
    .set(payload)
    .then((doc) => callback({ error: null, doc: doc.id }))
    .catch((error) => callback({ error, doc: null }));
};

export const collectionRealTime = (collection, callback) => {
  try {
    DB.collection(collection).onSnapshot((response) => {
      if (response.docs) {
        let docs = [];
        // console.log('DOcs sub collection', response.)
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

export const documentRealTime = (collection, docId, callback) => {
  try {
    DB.collection(collection).doc(docId).onSnapshot((response) => {
      // console.log('REached here', response);
      if (response.data()) callback({ error: null, doc: { ...response.data(), id: response.id } });
    });
  } catch (error) {
    callback({ error, doc: null });
  }
};

export const updateDoc = async (collection, docId, payload, callback) => {
  // console.log('Doc id', docId, payload);
  await DB.doc(`${collection}/${docId}`)
    .set(payload, { merge: true })
    .then(async (resp) => {
      await DB.doc(`${collection}/${docId}`).get().then((snapshot) => callback({ error: null, doc: snapshot.data() }));
    })
    .catch((error) => callback({ error, doc: null }));
};

export const getDocsWhere = async (collection, field, value, callback) => {
  try {
    const query = await DB.collection(collection).where(field, '==', value).get();
    const docs = [ ...query.docs.map((doc) => ({ ...doc.data(), id: doc.id })) ];
    return callback({ error: null, doc: docs });
  } catch (error) {
    return callback({ error, doc: null });
  }
};

export const deleteDoc = async (collection, docId, callback) => {
  try {
    await DB.collection(collection).doc(docId).delete().then(() => callback({ error: undefined }));
  } catch (error) {
    return callback({ error, doc: null });
  }
};
