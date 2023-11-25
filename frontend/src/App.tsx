import { Suspense, lazy } from "react";

import { Route, Routes } from "react-router-dom";

import "./App.css";
import Loader from "@/components/ui/Loader";

const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));

// admin private route
const PrivateRoutes = lazy(() => import("@/middleware/PrivateRoutes"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const Product = lazy(() => import("@/pages/dashboard/product/Product"));
const Category = lazy(() => import("@/pages/dashboard/product/Category"));
const CreateNewProduct = lazy(() => import("@/pages/dashboard/product/CreateNewProduct"));
const CreateNewCategory = lazy(() => import("@/pages/dashboard/product/CreateNewCategory"));

function App() {
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
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/category/create" element={<CreateNewCategory />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
