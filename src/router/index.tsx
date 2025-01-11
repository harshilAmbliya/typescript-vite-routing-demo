import { createBrowserRouter, Navigate } from "react-router-dom";
import routes from "./route";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import DashboardLayout from "@/layout/DashboardLayout";

// check routes with specific conditions
const token = localStorage.getItem("auth_token") || null;
const role = localStorage.getItem("role") || null;

const prepareRoutes = () => {
  if (token === null || role === null) {
    return [{ path: "*", element: <Navigate replace to="/login" /> }];
  }

  return routes
    .filter((route) => role && route.role.includes(role))?.map((route) => {
      const { role, ...rest } = route; // Remove role from the route object
      return {
        ...rest,
        element:
          token !== null ? route.element : <Navigate replace to="/login" />, // Redirect if no token
      };
    })
};

const filteredRoutes = prepareRoutes();

const preParedRoutes = createBrowserRouter([
  {
    path: "/login",
    element:
      token !== null && role !== null ? (
        role === "user" ? (
          <Navigate replace to={"/user"} />
        ) : (
          <Navigate replace to={"/admin"} />
        )
      ) : (
        <Login />
      ),
  },
  ...(role === "user"
    ? [
      {
        element: token !== null && role !== null ? (
          <DashboardLayout /> // Wrap the admin routes with the DashboardLayout
        ) : (
          <Navigate replace to="/login" />
        ),
        children: [
          ...filteredRoutes, // Add all the admin-related routes here
          {
            path: "/",
            element: token !== null && role !== null ? <Home /> : <Navigate replace to="/login" />,
          },
          { path: "*", element: <Navigate replace to="/" /> }, // Redirect user to "/"
        ],
      }
    ]
    : [
      {
        element: token !== null && role !== null ? (
          <DashboardLayout /> // Wrap the admin routes with the DashboardLayout
        ) : (
          <Navigate replace to="/login" />
        ),
        children: [
          ...filteredRoutes, // Add all the admin-related routes here
          { path: "*", element: <Navigate replace to="/admin" /> }, // Redirect admin to "/admin/dashboard"
        ],
      },
    ]),
]);

export default preParedRoutes;
