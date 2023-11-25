import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// import { userLoggedIn } from '../auth/authSlice';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
// const development = process.env.NODE_ENV === 'development';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
  }),
  endpoints: () => ({
    // refreshToken: builder.query({
    //   query: (data) => ({
    //     url: "/auth/refresh",
    //     method: "GET",
    //     credentials: "include",
    //   }),
    //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //     try {
    //       const result = await queryFulfilled;
    //     } catch (error) {
    //       if (development) {
    //         console.log(error);
    //       }
    //     }
    //   }
    // }),
    // loadUser: builder.query({
    //   query: (data) => ({
    //     url: "/auth/getUser",
    //     method: "GET",
    //     credentials: "include",
    //   }),
    //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //     try {
    //       const result = await queryFulfilled;
    //       dispatch(
    //         userLoggedIn({
    //           accessToken: result.data.accessToken,
    //           user: result.data.user,
    //         })
    //       );
    //     } catch (error) {
    //       if (development) {
    //         console.log(error);
    //       }
    //     }
    //   }
    // }),
    // activation: builder.query({
    //   query: (accountVerifyToken) => ({
    //     url: `/auth/activate/${accountVerifyToken}`,
    //     method: "GET",
    //     credentials: "include",
    //   })
    // }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  // useRefreshTokenQuery,
  // useLoadUserQuery,
  // useActivationQuery
} = apiSlice;