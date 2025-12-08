import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import ManagerRoute from "./ManagerRoute";
import AdminRoute from "./AdminRoute";
import ManageUser from "../pages/ManageUser/ManageUser";
import CreateClub from "../pages/Club/CreateClub";
import ManageClub from "../pages/Club/ManageClub";
import UpdateClub from "../pages/Club/UpdateClub";
import ManageClubAdmin from "../pages/Club/ManageClubAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <h1>System One</h1>,
      },
      {
        path: "manage-user",
        element: (
          <AdminRoute>
            <ManageUser />
          </AdminRoute>
        ),
      },
      {
        path: "create-club",
        element: (
          <ManagerRoute>
            <CreateClub />
          </ManagerRoute>
        ),
      },
      {
        path: "manage-club",
        element: (
          <ManagerRoute>
            <ManageClub />
          </ManagerRoute>
        ),
      },
      {
        path: "manage-club/:id",
        element: (
          <ManagerRoute>
            <UpdateClub />
          </ManagerRoute>
        ),
      },
      {
        path: "admin/manage-club",
        element: (
          <AdminRoute>
            <ManageClubAdmin />
          </AdminRoute>
        ),
      }
    ],
  },
]);