import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";

/** Function where we define our routes (Imperative way to create Router).
 * Imper. way is necessary in order to enable data fetching/ data loading with
 * react roater.
 * We can use powerful APi's like data loaders, data actions or data fetchers.
 * We do that by passing an array of object where each obj is a route
 * children prop accepts an array of routs (nested routes)
 */
const router = createBrowserRouter([
  //the only porpouse of the {} below is to provide layout to the app
  {
    element: <AppLayout />,
    children: [
      {
        path: "/", //the root
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId", //with params
        element: <Order />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
