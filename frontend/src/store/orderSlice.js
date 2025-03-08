import apiSlice from "./apiSlice";
import { ORDERS_URL } from "./constants";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}/create`,
        method: "POST",
        body: { ...order },
        credentials: 'include',
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/updatestock`,
        method: "PUT",
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),

    deliverOrderProcur: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/deliver/procur/${orderId}`,
        method: "PUT",
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
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