import { useRoutes } from "react-router-dom";
// import { LoggedInRoutes } from "./protected";
import { AuthLayout } from "@/components/Layout/AuthLayout";

import { SignUp } from "@/pages/Auth/Signup";
import Login from "@/pages/Auth/Login";
import { LoggedInRoutes, ProtectedRoutes } from "./protected";
import MainLayout from "@/components/Layout/MainLayout";
import { Home } from "@/pages/Home/Home";
import ProductDetail from "@/pages/ProductDetail/ProductDetail";
import { AddProduct } from "@/pages/AddProduct/AddProduct";
import { EditProduct } from "@/pages/EditProduct/EditProduct";

export const AppRoutes = (): JSX.Element => {
  const routes = useRoutes([
    {
      path: "/",
      element: <ProtectedRoutes />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "/product",
              element: <Home />,
            },
            {
              path: "/product/:id",
              element: <ProductDetail />,
            },
            {
              path: "/product/:id/edit",
              element: <EditProduct />,
            },
            {
              path: "/product/add",
              element: <AddProduct />,
            },
          ],
        },
      ],
    },
    {
      path: "/auth",
      element: <LoggedInRoutes />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            {
              path: "/auth/signup",
              element: <SignUp />,
            },
            {
              path: "/auth/login",
              element: <Login />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <h1>404 Page Not Found</h1>,
    },
  ]);
  return <>{routes}</>;
};
