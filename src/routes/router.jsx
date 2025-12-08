import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import ManagerRoute from "./ManagerRoute";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../components/ErrorPage";
import ManageUser from "../pages/Admin/ManageUser/ManageUser";
import CreateClub from "../pages/Manager/Club/CreateClub";
import ManageClub from "../pages/Manager/Club/ManageClub";
import UpdateClub from "../pages/Manager/Club/UpdateClub";
import ManageClubAdmin from "../pages/Admin/Club/ManageClubAdmin";
import Club from "../pages/Public/Club/Club";
import ClubDetails from "../pages/Public/Club/ClubDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
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
      {
        path: "clubs",
        element: <Club />
      },
      {
        path: "club/:id",
        element: <ClubDetails />
      }
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
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);