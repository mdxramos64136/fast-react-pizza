import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  //whenever it's true render the loading indicator
  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      {isLoading && <Loader />}
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
