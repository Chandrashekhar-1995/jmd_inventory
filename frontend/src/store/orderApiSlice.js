import apiSlice from "./apiSlice";
import { ORDERS_URL } from "./constants";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  useDeliverOrderProcurMutation,
} = orderApiSlice;