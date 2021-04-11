import { Queries } from '../../Utils';
import firestore from '@react-native-firebase/firestore';

const DB = firestore();
export default {
  state: { doctors: [] },
  reducers: {
    setDoctors (state, doctors) {
      return { ...state, doctors };
    }
  },
  effects: (dispatch) => ({
    // Get doctors..
    async getDoctors (callback) {
      try {
        DB.collection('Users').where('accountType', '==', 'Doctor').onSnapshot((response) => {
          const docs = [ ...response.docs.map((doc) => ({ ...doc.data(), id: doc.id })) ];
          dispatch.Doctors.setDoctors(docs);
          return callback({ error: undefined, doc: docs });
        });
      } catch (error) {
        return callback({ error: error.message });
      }
    },

    // follow and unfollow user
    async followUnfollowUser ({ collection, docId, payload, callback }) {
      try {
        await Queries.updateDoc(collection, docId, payload, callback);
      } catch (error) {
        return callback({ error: error.message });
      }
    }
  })
};
