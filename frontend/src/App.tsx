import { Suspense, lazy, useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import Loader from "@/components/ui/Loader";

import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { useLogoutMutation } from "./redux/features/auth/authApi";
import { userLoggedOut } from "./redux/features/auth/authSlice";

const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));

// admin private route
const PrivateRoutes = lazy(() => import("@/middleware/PrivateRoutes"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const Product = lazy(() => import("@/pages/dashboard/product/Product"));
const CategoryList = lazy(() => import("@/pages/dashboard/product/CategoryList"));
const CreateNewProduct = lazy(
  () => import("@/pages/dashboard/product/CreateNewProduct")
);
const Category = lazy(
  () => import("@/pages/dashboard/product/Category")
);

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
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Product />} />
          <Route path="/admin/product/create" element={<CreateNewProduct />} />
          <Route path="/admin/admin" element={<Product />} />
          <Route path="/admin/customer" element={<Product />} />
          <Route path="/admin/settings" element={<Product />} />
          <Route path="/admin/category" element={<CategoryList />} />
          <Route
            path="/admin/category/create"
            element={<Category />}
          />
          <Route path="/admin/category/:id" element={<Category />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
