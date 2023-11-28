import { PRODUCT } from "@/constant/apiRouteConstant";
import { apiSlice } from "../api/apiSlice";
// import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

// const development = process.env.NODE_ENV === "development";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: `${PRODUCT}/category`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Category" as any],
    }),
    getCategoryById: builder.query({
      query: (categoryId) => ({
        url: `${PRODUCT}/category/${categoryId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Category" as any],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT}/category`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Category" as any],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT}/category/${data?.categoryId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Category" as any],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${PRODUCT}/categoryId/${categoryId}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Category" as any],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = productApi;
