import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createCustomerServices } from "../services/customerServices";

const initialState = {
    customers: [],
    customer: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
  };
 
// create Customer
export const createCustomer = createAsyncThunk(
    "customers/create",
    async (FormData, thunkAPI) =>{
        try {
            return await createCustomerServices(FormData);
        } catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const customerSlice = createSlice({
    name:"customers",
    initialState,
    reducers: {
        resetStatus: (state) => {
          state.isSuccess = false;
          state.isError = false;
          state.message = "";
        },
    },
    extraReducers : (builder) =>{
      builder
      .addCase(getCustomers.pending, (state) =>{
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.customer = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.customer = action.payload;
        toast.success("Customer updated successfully");
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
    }
});

export const {resetStatus} = customerSlice.actions;

export default customerSlice.reducer;