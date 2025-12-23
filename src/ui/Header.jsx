import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header
      aria-label="Main header"
      className="flex items-center justify-between border-b border-stone-200 bg-yellow-500 px-4 py-3 font-mono text-xl sm:px-6"
    >
      <Link
        aria-label="Fast React Pizza Co. homepage"
        to="/"
        className="tracking-widest"
      >
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;

/**
 * For letter spacing use trackin-value. Ex.: "tracking-widest"
 * However you can modify it and put your own value inside brackets: tracking-[5px]
 * The format -[valuept/rea/etc] works with any property [scape hatch]
 */
