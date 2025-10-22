import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { HomePage } from "./components/Homepage/homepage.jsx";
import { ProductsPage } from "./components/ProductsPage/productsPage.jsx";
import { Cart } from "./components/cart.jsx";
import { Login } from "./components/auth/loginpage.jsx";
import { Signup } from "./components/auth/signuppage.jsx";
import { ProductDetailPage } from "./components/ProductsPage/productDetailspage.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/homepage",
    Component: HomePage,
  },
  {
    path: "/products",
    Component: ProductsPage,
  },
  {
    path: "/products/:id",
    Component: ProductDetailPage,
  },
  {
    path: "/cart",
    Component: Cart,
  },
  {
    path: "/signin",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
]);

export function App() {
  return <RouterProvider router={routes}></RouterProvider>;
}
