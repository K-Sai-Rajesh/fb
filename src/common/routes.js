import { Outlet } from "react-router-dom";
import Auth from "./Auth";
import Home from "../components/layout/Home";
import Login from "../components/pages/login/Login";
import LandingPage from "../components/layout/LandingPage";
import App from "../components/pages/signup";
import Type from "../components/pages/signup/Type";
import Seller from "../components/pages/signup/seller";
import MyLocation from "../components/pages/signup/seller/Location";
import ProfilePicture from "../components/pages/signup/seller/ProfilePicture";
import RegistrationStatus from "../components/pages/signup/seller/RegistrationStatus";

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
        element: <App />,
        children: [
          {
            path: '',
            element: <Type />
          },
          {
            path: 'seller',
            children: [
              {
                path: 'details',
                element: <Seller />
              },
              {
                path: 'location',
                element: <MyLocation />
              },
              {
                path: 'profile picture',
                element: <ProfilePicture />
              },
              {
                path: 'status',
                element: <RegistrationStatus />
              }
            ]
          },
          {
            path: '',
            element: <Type />
          }
        ]
      },
      {
        path: '/category/*',
        element: <Login />
      },
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
