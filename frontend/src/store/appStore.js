import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const appStore = configureStore({
  reducer: {
    auth: authReducer,
  }, 
  devTools: true,
});

export default appStore;