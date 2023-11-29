import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@/redux/features/api/apiSlice';
import authSliceReducer from '@/redux/features/auth/authSlice';
import modalSliceReducer from '@/redux/features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    modal: modalSliceReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// // call refresh token at evrey page hard refrsh
// const initialApp = async () => {
  
//   await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));
  
//   // call userInfo page at evrey page hard refrsh;
//   await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
// };

// initialApp();