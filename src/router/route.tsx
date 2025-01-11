import About from "../pages/About";
import Dashboard from "../pages/admin/Dashboard";
import Home from "../pages/Home";

const routes = [
  {
    path: "/",
    element: (
        <Home />
    ),
    role: ["user"],
  },
  {
    path: "/about",
    element: (
        <About />
    ),
    role: ["user"],
  },
  {
    path: "/admin",
    element: (
        <Dashboard />
    ),
    role: ["admin"],

  },
];

export default routes;
