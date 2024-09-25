import { Outlet } from "react-router-dom";
import Auth from "./Auth";
import Home from "../components/layout/Home";
import Login from "../components/pages/Login/Login";
import Signup from "../components/pages/Signup/Signup";
import LandingPage from "../components/layout/LandingPage";

export const routes = [
  {
    path: "",
    element: <Home />,
    children: [
      {
        path: '',
        element: <LandingPage />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ],
  },
  {
    path: "/auth",
    element: (
      <Auth>
        <Outlet />
      </Auth>
    ),
    children: [],
  },
  {
    path: "dashboard/*",
    // element: <NotFound />,
  },
];
