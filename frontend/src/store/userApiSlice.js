import apiSlice from "./apiSlice";
import { USERS_URL } from "./constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
        credentials: 'include',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
        credentials: 'include',
      }),
    }),
    listUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}/all`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    updateUserClr: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "puT",
        body: data,
        credentials: 'include',
      }), 
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useListUsersQuery,
  useUpdateUserClrMutation, 
} = userApiSlice;