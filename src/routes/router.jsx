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
import JoinedClub from "../pages/User/Club/JoinedClub";
import PaymentSuccess from "../pages/User/Payment/PaymentSuccess";
import ManageClubMember from "../pages/Manager/ClubMember/ManageClubMember";
import CreateEvent from "../pages/Manager/Event/CreateEvent";
import ManageEvent from "../pages/Manager/Event/ManageEvent";
import UpdateEvent from "../pages/Manager/Event/UpdateEvent";
import Event from "../pages/Public/Event/Event";
import EventDetail from "../pages/Public/Event/EventDetail";
import EventPaymentSuccess from "../pages/User/Payment/EventPaymentSuccess";
import MyEvent from "../pages/User/Event/MyEvent";
import MyPayments from "../pages/User/Payment/MyPayments";
import EventMember from "../pages/Manager/EventMembers/EventMember";
import Payments from "../pages/Admin/Payment/Payments";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Profile from "../pages/User/Profile/Profile";

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
        path: "profile",
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      {
        path: "clubs",
        element: <Club />,
      },
      {
        path: "club/:id",
        element: <ClubDetails />,
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "event-payment-success",
        element: (
          <PrivateRoute>
            <EventPaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "events",
        element: <Event />,
      },
      {
        path: "events/:id",
        element: <EventDetail />,
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
        element: <DashboardHome />,
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
      {
        path: "member/joined-club",
        element: (
          <PrivateRoute>
            <JoinedClub />
          </PrivateRoute>
        ),
      },
      {
        path: "manageclubuser/:id",
        element: (
          <ManagerRoute>
            <ManageClubMember />
          </ManagerRoute>
        ),
      },
      {
        path: "create-event",
        element: (
          <ManagerRoute>
            <CreateEvent />
          </ManagerRoute>
        ),
      },
      {
        path: "manage-event",
        element: (
          <ManagerRoute>
            <ManageEvent />
          </ManagerRoute>
        ),
      },
      {
        path: "event/:id",
        element: (
          <ManagerRoute>
            <UpdateEvent />
          </ManagerRoute>
        ),
      },
      {
        path: "my-events",
        element: (
          <PrivateRoute>
            <MyEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "my-payments",
        element: (
          <PrivateRoute>
            <MyPayments />
          </PrivateRoute>
        ),
      },
      {
        path: "event-registration/:id",
        element: (
          <ManagerRoute>
            <EventMember />
          </ManagerRoute>
        ),
      },
      {
        path: "admin/payments",
        element: (
          <AdminRoute>
            <Payments />
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
