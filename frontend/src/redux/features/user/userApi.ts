import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "/auth/update-user-avatar",
        method: "PUT",
        body: avatar,
        credentials: "include",
      })
    }),
    editProfile: builder.mutation({
      query: ({fName}) => ({
        url: "/auth/update-user-info",
        method: "PUT",
        body: {fName},
        credentials: "include",
      })
    }),
    updatePassword: builder.mutation({
      query: ({oldPassword, newPassword}) => ({
        url: "/auth/update-user-password",
        method: "PUT",
        body: 
        {
          oldPassword,
          newPassword,
        },
        credentials: "include",
      })
    }),
  })
});

export const { useUpdateAvatarMutation, useEditProfileMutation, useUpdatePasswordMutation } = userApi;