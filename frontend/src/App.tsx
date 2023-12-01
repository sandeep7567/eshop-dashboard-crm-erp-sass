import { Suspense, lazy, useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import Loader from "@/components/ui/Loader";

import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";

import { useLogoutMutation } from "./redux/features/auth/authApi";
import { userLoggedOut } from "./redux/features/auth/authSlice";

import AuthRoute from "@/router/AuthRoute";
import AppRoute from "@/router/AppRoute";

const PrivateRoutes = lazy(() => import("@/middleware/PrivateRoutes"));

function App() {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const expirationTime = localStorage.getItem("expirationTime")
    ? JSON.parse(localStorage.getItem("expirationTime") || "")
    : 0;

  // if jwt token expire, then it will be run and
  // dispatch logout apicall and also dispatch
  // useLogout authSlice to logout from the backend and
  // frontend also going to logout and
  // reset state of redux, respectively,
  const currentTime = new Date().getTime();
  const logout = async () => {
    if (expirationTime !== null) {
      if (expirationTime) {
        // console.log(currentTime > expirationTime);
        if (currentTime > expirationTime) {
          await logoutApiCall(userInfo?._id).unwrap();
          dispatch(userLoggedOut());
          navigate("/login");
        }
      }
    }
  };

  useEffect(() => {
    logout();
  }, [dispatch, expirationTime, currentTime]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {AuthRoute.map((route) => {
          const { element, path } = route;
          return <Route key={path} path={path} element={element} />;
        })}

        <Route element={<PrivateRoutes />}>
          {AppRoute.map((route) => {
            const { element, path } = route;
            return <Route key={path} path={path} element={element} />;
          })}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
