import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu"; //renaming named import
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import { action as updateOrderAction } from "./features/order/UpdateOrder";

/** Function where we define our routes (Imperative way to create Router).
 * Imper. way is necessary in order to enable data fetching/ data loading with
 * react roater.
 * We can use powerful APi's like data loaders, data actions or data fetchers.
 * We do that by passing an array of object where each obj is a route
 * children prop accepts an array of routs (nested routes)//

 */
const router = createBrowserRouter([
  //the only porpouse of the {} below is to provide layout to the app
  {
    path: "/", //the root
    Component: AppLayout, //Instead of element: <AppLayout/>
    ErrorBoundary: Error,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "menu",
        Component: Menu,
        loader: menuLoader,
        ErrorBoundary: Error,
      },
      {
        path: "cart",
        Component: Cart,
      },
      {
        path: "order/new",
        Component: CreateOrder,
        action: createOrderAction,
      },
      {
        path: "order/:orderId", //with params
        Component: Order,
        loader: orderLoader,
        ErrorBoundary: Error,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
