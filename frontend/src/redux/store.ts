import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';
import authSliceReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
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