/* eslint-disable react-refresh/only-export-components */

import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];
/////////////////////////////////////////////////////////////
function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";

  /** This componnet is connected with the actio createOrderAction, so it has
   * access to the data that is returned from that action. */
  const formErrors = useActionData();

  //
  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button disabled={isSubmiting}>
            {isSubmiting ? "Placing Order..." : "Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

/** we cannot redirect  user to another page using navigate function
 * because it comes from calling useNavigateHook and hooks can only be used
 * inside Components. So we use redirect function provided by RR. It creates
 * a new request.
 * It only works inside loadess and actions
 * */
export async function action({ request }) {
  //formData() is provided by the browser
  const formData = await request.formData();
  //convert to JS objetc:
  const data = Object.fromEntries(formData);

  // builds ther order object
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  //error handling in form action
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please provide a valid phone number!";

  if (Object.keys(errors).length > 0) return errors;

  //if evething is ok, create a new order and redirect
  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
