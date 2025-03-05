import apiSlice from "./apiSlice";
import { CUSTOMER_URL } from "./constants";

export const customerApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        createCustomer:builder.mutation({
            url:`${CUSTOMER_URL}/create`,
            method:"POST",
            body: FormData,
            credentials: 'include',
        }),
    }),
});

export const {
    useCreateCustomerMutation
} = customerApiSlice;