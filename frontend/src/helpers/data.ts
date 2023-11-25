export interface SiderBarLinkProps {
  id: number;
  name: string;
  path: string;
  icon: string;
}

export const sidebarLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: "LayoutDashboard",
  },
  {
    id: 2,
    name: "Admin",
    path: "/admin/admin",
    // type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "UserPlus2",
  },
  {
    id: 3,
    name: "Product",
    path: "/admin/product",
    // type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "ShoppingCart",
  },
  {
    id: 4,
    name: "Categories",
    path: "/admin/category",
    // type: ACCOUNT_TYPE.INSTRUCTOR || ACCOUNT_TYPE.STUDENT,
    icon: "PlusCircle",
  },
  {
    id: 5,
    name: "Customer",
    path: "/admin/customer",
    // type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "User",
  },
  {
    id: 6,
    name: "Settings",
    path: "/admin/settings",
    // type: ACCOUNT_TYPE.INSTRUCTOR || ACCOUNT_TYPE.STUDENT,
    icon: "Settings",
  },
];
