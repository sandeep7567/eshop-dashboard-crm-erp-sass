import { AUTH } from "@/constant/apiRouteConstant";
import { apiSlice } from "../api/apiSlice";
// import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

// const development = process.env.NODE_ENV === "development";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register: builder.mutation<RegistrationResponse, RegistrationData>({
    //   query: (data) => ({
    //     url: "/auth/register",
    //     method: "POST",
    //     body: data,
    //     credentials: "include",
    //   }),
    //   async onQueryStarted(arg,{queryFulfilled, dispatch}){
    //     try {
    //       const result = await queryFulfilled;
    //       // result.data.message: "registration is successfull" , result.data.success: true
    //       dispatch(userRegistration({
    //         token: result.data.token,
    //         // user: result?.data?.user,
    //       }));
    //     } catch (error) {
    //       if (development) {
    //         console.log(error);
    //       }
    //     }
    //   }
    // }),
    login: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: `${AUTH}/admin/login`,
        method: "POST",
        body: { email, password },
        credentials: "include" as const,
      }),
      // async onQueryStarted(arg,{queryFulfilled, dispatch}){
      //   try {
      //     const result = await queryFulfilled;
      //     dispatch(userLoggedIn({
      //       token: result?.data?.accessToken,
      //       user: result?.data?.user,
      //     }));
      //   } catch (error) {
      //     if (development) {
      //       console.log(error);
      //     }
      //   }
      // }
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH}/logout`,
        method: "POST",
        credentials: "include" as const,
      }),
    }),
    // logOut: builder.query({
    //   query: () => ({
    //     url: "/auth/logout",
    //     method: "GET",
    //     credentials: "include",
    //   }),
    //   async onQueryStarted(arg,{queryFulfilled, dispatch}){
    //     try {
    //       dispatch(
    //         userLoggedOut()
    //       );
    //     } catch (error) {
    //       if (development) {
    //         console.log(error);
    //       }
    //     }
    //   }
    // }),
    // resetOTPThroughEmail: builder.mutation({
    //   query: (email) => (
    //     {
    //     url: "/auth/reset-otp",
    //     method: "POST",
    //     body: email,
    //     credentials: "include",
    //   }),
    // }),
    // otpVerification: builder.mutation({
    //   query: (otp) => ({
    //     url: "/auth/otp",
    //     method: "POST",
    //     body: otp,
    //     credentials: "include",
    //   })
    // }),
    // resetPassword: builder.mutation({
    //   query: (data) => ({
    //     url: "/auth/reset-password",
    //     method: "PUT",
    //     body: data,
    //     credentials: "include",
    //   })
    // }),
  }),
});

export const {
  // useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  // useResetOTPThroughEmailMutation,
  // useOtpVerificationMutation,
  // useResetPasswordMutation,
} = authApi;
