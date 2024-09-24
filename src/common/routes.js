import { Outlet } from "react-router-dom";
import Auth from "./Auth";

export const routes = [
  {
    path: "",
    // element: <Main />,
    children: [],
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
