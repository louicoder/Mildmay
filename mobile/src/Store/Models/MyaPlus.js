export default {
  state: {},
  reducers: {},
  effects: (dispatch) => ({
    // Signup
    async signup ({ email, password, callback }, state) {
      try {
        // const response =  await
        callback({ success: true, user: {} });
      } catch (error) {
        callback({ success: false, error: error.message });
      }
    }
  })
};
