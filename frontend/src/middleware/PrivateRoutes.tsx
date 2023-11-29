import { Navigate, Outlet } from "react-router-dom";

import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";

import "./privateRoutes.css";

import isAuthenticated from "@/middleware/isAuthenticated";
import AdminRoute from "@/middleware/AdminRoute";

const PrivateRoutes = () => {
  const isAuth = isAuthenticated();

  if (isAuth) {
    return (
      <AdminRoute>
        <section
          id="page"
          className="bg-global w-full font-[Nunito,sans-serif,sans]"
        >
          <nav
            className="p-5 h-fit bg-global max-h-20 flex justify-end ml-auto 
                      items-center"
          >
            <Navbar />
          </nav>
          <aside
            className="fixed bg-white left-5 top-5 py-4 rounded-lg w-[50px]
                        p-2 z-10 md:w-[200px] flex-[0_0_200px] h-[42.6rem]
                        bg-opacity-90 border card-shadow .card-shadow]"
          >
            <Sidebar />
          </aside>
          <main
            className="card-shadow bg-white max-w-xl mx-auto -ml-24 
                          md:max-w-5xl w-full rounded-lg md:mx-auto px-4 py-8 mt-7"
          >
            {/* <Card className=""> */}
            <Outlet />
            {/* </Card> */}
          </main>
        </section>
      </AdminRoute>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default PrivateRoutes;
