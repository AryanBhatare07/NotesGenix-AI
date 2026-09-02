const userSlice = createSlice({
  name: "user",

  initialState: {
    userData: null,
    authLoading: true,
  },

  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },

    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },

    updateCredits: (state, action) => {
      if (state.userData) {
        state.userData.credits = action.payload;
      }
    },
  },
});
