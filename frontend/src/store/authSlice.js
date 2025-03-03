import { createSlice } from "@reduxjs/toolkit";
import axios from  "axios";
import { BASE_URL, USERS_URL} from "./constants";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutHandler: (state, action) => {
      // Make a POST API call to logout
      axios.post(`${BASE_URL}${USERS_URL}/logout`, { withCredentials: true })
        .then(response => console.log('Logged out successfully', response))
        .catch(error => console.error('Error logging out', error));
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { userCredentials, logoutHandler } = authSlice.actions;

export default authSlice.reducer;