import { createBrowserRouter, Navigate } from "react-router-dom";
import Auth from "../../pages/Auth";
import ManageCatalog from "../../pages/ManageCatalog";
import ManageUsers from "../../pages/ManageUsers";
import UserDetails from "../../pages/UserDetails";
import ManageOrders from "../../pages/ManageOrders";
import OrderDetail from "../../pages/OrderDetail";
import Settings from "../../pages/Settings";
import AdminLayout from "../common/AdminLayout";
import ProtectedRoute from "../common/ProtectedRoute";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: <Navigate to="/catalog" replace />,
      },
      {
        path: "/catalog",
        element: <ManageCatalog />,
      },
      {
        path: "/users",
        element: <ManageUsers />,
      },
      {
        path: "/users/:id",
        element: <UserDetails />,
      },
      {
        path: "/orders",
        element: <ManageOrders />,
      },
      {
        path: "/orders/:id",
        element: <OrderDetail />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

export default AppRoutes;