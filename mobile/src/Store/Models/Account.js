import { Queries } from '../../Utils';
import auth from '@react-native-firebase/auth';

export default {
  state: { user: {}, appointments: [], blogs: [] },
  reducers: {
    setUserDetails (state, user) {
      return { ...state, user };
    },
    setUserAppointments (state, appointments) {
      return { ...state, appointments };
    },
    setUserBlogs (state, blogs) {
      return { ...state, blogs };
    }
  },
  effects: (dispatch) => ({
    //
    async getUserDetails ({ uid, callback }) {
      try {
        await Queries.getSingleDoc('Users', uid, (resp) => {
          const { email, uid } = auth().currentUser;
          dispatch.Account.setUserDetails({ email, uid, ...resp.doc });
          callback({ success: true, result: resp.doc });
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getUserAppointments ({ field, uid, callback }) {
      try {
        await Queries.getDocsWhere('Appointments', field, uid, (resp) => {
          dispatch.Account.setUserAppointments(resp.doc);
          callback({ success: true, result: resp.doc });
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getUserBlogs ({ field, uid, callback }) {
      try {
        await Queries.getDocsWhere('Blogs', field, uid, (resp) => {
          dispatch.Account.setUserBlogs(resp.doc);
          callback({ success: true, result: resp.doc });
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async cancelAppointment ({ appointId, callback }, state) {
      try {
        await Queries.deleteDoc('Appointments', appointId, (resp) => {
          if (resp.error) return callback({ error: resp.error, doc: undefined });
          dispatch.Account.getUserAppointments({
            field: state.Account.user.accountType === 'Doctor' ? 'doctorId' : 'patientId',
            uid: state.Account.user.uid,
            callback
          });
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async confirmAppointment ({ appointId, callback }, state) {
      try {
        await Queries.updateDoc('Appointments', appointId, { confirmed: true }, (resp) => {
          if (resp.error) return callback({ error: resp.error, doc: undefined });
          dispatch.Account.getUserAppointments({
            field: state.Account.user.accountType === 'Doctor' ? 'doctorId' : 'patientId',
            uid: state.Account.user.uid,
            callback
          });
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async rescheduleAppointment ({ appointId, payload, callback }, state) {
      try {
        await Queries.updateDoc('Appointments', appointId, payload, (resp) => {
          if (resp.error) return callback({ error: resp.error, doc: undefined });
          dispatch.Account.getUserAppointments({
            field: state.Account.user.accountType === 'Doctor' ? 'doctorId' : 'patientId',
            uid: state.Account.user.uid,
            callback
          });
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    }
  })
};
