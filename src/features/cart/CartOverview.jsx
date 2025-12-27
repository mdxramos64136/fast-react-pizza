import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice, getTotalCartQty } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQty);
  const totalCartPrice = useSelector(getTotalPrice);

  if (!totalCartQuantity) return null;
  ////////////////////
  return (
    <div
      aria-live="polite"
      className="flex items-center justify-between bg-stone-800 p-4 px-4 py-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base"
    >
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>
          {totalCartQuantity} {totalCartQuantity === 1 ? "pizza" : "pizzas"}
        </span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">
        Open cart <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
}

export default CartOverview;

//space = distance between elements
//reselect library
