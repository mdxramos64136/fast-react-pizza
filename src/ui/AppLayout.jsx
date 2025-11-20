import { Outlet } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <p>Conteúdo da rota filha atual.</p>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;

/**
 * <AppLayout/> is the parent route of others route in the app
 * <Outlet/> renders the content of the nested route inside another route.
 * It's provided by react-router-dom
 *
 */
