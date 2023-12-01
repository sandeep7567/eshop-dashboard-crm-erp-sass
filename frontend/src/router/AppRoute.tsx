import { lazy } from "react";

// admin private route
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const Product = lazy(() => import("@/pages/dashboard/product/Product"));
const CategoryList = lazy(
  () => import("@/pages/dashboard/product/CategoryList")
);
const CreateNewProduct = lazy(
  () => import("@/pages/dashboard/product/CreateNewProduct")
);
const Category = lazy(() => import("@/pages/dashboard/product/Category"));

const AppRoute = [
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/product",
    element: <Product />,
  },
  {
    path: "/admin/product/create",
    element: <CreateNewProduct />,
  },
  {
    path: "/admin/admin",
    element: <Product />,
  },
  {
    path: "/admin/customer",
    element: <Dashboard />,
  },
  {
    path: "/admin/settings",
    element: <Dashboard />,
  },
  {
    path: "/admin/category",
    element: <CategoryList />,
  },
  {
    path: "/admin/category/create",
    element: <Category />,
  },
  {
    path: "/admin/category/:id",
    element: <Category />,
  },
];

export default AppRoute;
