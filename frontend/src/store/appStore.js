import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartSlice from "./cartSlice";
import categorySlice from "./categoriySlice";

const appStore = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    products: productReducer,
    cart: cartSlice,
    category: categorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default appStore;