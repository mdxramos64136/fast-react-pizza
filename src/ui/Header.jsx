import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";


function Header() {
  return (
    <header className=" text-xl flex items-center justify-between bg-yellow-500 px-4 py-3 sm:px-6  border-b border-stone-200 ">
      <Link to="/" className="tracking-widest">Fast ReactPizza Co.</Link>
      <SearchOrder />
      <Username/>
    </header>
  );
}

export default Header;

/**
 * For letter spacing use trackin-value. Ex.: "tracking-widest"
 * However you can modify it and put your own value inside brackets: tracking-[5px]
 * The format -[valuept/rea/etc] works with any property [scape hatch]
 */