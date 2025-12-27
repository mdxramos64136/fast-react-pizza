import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between text-sm">
        <p
          aria-label={`${quantity} ${quantity === 1 ? "item" : "items"} of ${name}`}
          className="font-semibold"
        >
          <span>{quantity}&times;</span>
          {name}
        </p>
        <p aria-label={`Total price for ${name}`} className="font-bold">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      <p
        aria-live="polite"
        className="text-sm text-stone-500 capitalize italic"
      >
        {isLoadingIngredients ? "Loading" : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
