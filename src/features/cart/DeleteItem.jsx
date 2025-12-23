import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { removeItem } from "./cartSlice";

function DeleteItem({ pizzaId, name }) {
  const dispatch = useDispatch();

  ////////
  return (
    <Button
      ariaLabel={`Remove ${name} pizza from cart`}
      type="small"
      onClick={() => dispatch(removeItem(pizzaId))}
    >
      Delete
    </Button>
  );
}

export default DeleteItem;
