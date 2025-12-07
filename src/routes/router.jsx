import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManageUser from "../pages/ManageUser/ManageUser";
import CreateClub from "../pages/Club/CreateClub";

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
          <PrivateRoute>
            <CreateClub />
          </PrivateRoute>
        ),
      },
    ],
  },
]);