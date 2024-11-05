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
import Category from "../components/pages/category/Category";
import Customer from "../components/pages/signup/customer";
import MyCustomerLocation from "../components/pages/signup/customer/Location";
import CustomerProfilePicture from "../components/pages/signup/customer/ProfilePicture";
import Products from "../components/pages/category/Products";
import SellerPage from "../components/pages/category/Seller";
import Users from "../components/pages/dashboard/Home";
import DashboardProducts from "../components/pages/dashboard/products/Products";
import ProductBar from "../components/pages/dashboard/productbar";
import CrudProduct from "../components/pages/dashboard/products/CrudProduct";
import MyGeoLocation from "../components/pages/category/MyLocation";

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
        path: 'location',
        element: <MyGeoLocation />
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
            path: 'customer',
            children: [
              {
                path: 'details',
                element: <Customer />
              },
              {
                path: 'location',
                element: <MyCustomerLocation />
              },
              {
                path: 'profile picture',
                element: <CustomerProfilePicture />
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
        element: <Category />
      },
      {
        path: '/product/*',
        element: <Products />
      },
      {
        path: '/seller/*',
        element: <SellerPage />
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <Auth>
        <Outlet />
      </Auth>
    ),
    children: [
      {
        path: '',
        element: <Users />
      }
    ]
  },
  {
    path: "dashboard/*",
    // element: <NotFound />,
  },
  {
    path: "products",
    element: (
      <Auth>
        <Outlet />
      </Auth>
    ),
    children: [
      {
        path: "",
        element: <ProductBar />,
        children: [
          {
            path: '',
            element: <DashboardProducts />
          },
          {
            path: 'add product',
            element: <CrudProduct />
          },
          {
            path: 'update product',
            element: <CrudProduct />
          }
        ]
      }
    ]
  },
];
