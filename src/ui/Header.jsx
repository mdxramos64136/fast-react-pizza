import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

function Header() {
  return (
    <header>
      <Link to="/">Fast ReactPizza Co.</Link>
      <SearchOrder />
      <p>Header</p>
    </header>
  );
}

export default Header;
