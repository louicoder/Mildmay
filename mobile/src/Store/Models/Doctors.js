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

    async getDoctor ({ uid, callback }) {
      try {
        await Queries.getSingleDoc('Users', uid, callback);
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
    },

    // created new appointment
    async createAppointment ({ payload, callback }) {
      try {
        await Queries.createDoc('Appointments', payload, callback);
      } catch (error) {
        return callback({ error: error.message });
      }
    },

    // cancel appointment
    async cancelAppointment ({ payload, docId, callback }) {
      try {
        await Queries.updateDoc('Appointments', docId, payload, callback);
      } catch (error) {
        return callback({ error: error.message });
      }
    },

    // Post review for doctor
    async postReview ({ payload, callback }) {
      console.log('Pos review payload', payload);
      try {
        await Queries.createDoc('Reviews', payload, callback);
      } catch (error) {
        return callback({ error: error.message });
      }
    }
  })
};
