import { lazy } from "react";

const ErrorBox = lazy(() => import("@/components/ui/ErrorBox"))
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));

const AuthRoute = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: (
      <ErrorBox
        className="text-4xl flex justify-center items-center h-screen w-full"
        err="Not Found"
      />
    ),
  },
];

export default AuthRoute;