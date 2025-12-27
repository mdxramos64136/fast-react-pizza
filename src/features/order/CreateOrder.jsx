/* eslint-disable react-refresh/only-export-components */

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

/////////////////////////////////////////////////////////////
function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";

  /** This componnet is connected with the action createOrderAction, so it has
   * access to the data that is returned from that action. */
  const formErrors = useActionData();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user);

  const isLoadingAddress = addressStatus === "loading";

  const dispatch = useDispatch();

  if (!cart) return <EmptyCart />;

  ////////////////////////////
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="customer" className="sm:basis-40">
            First Name
          </label>
          <div className="grow">
            <input
              id="customer"
              type="text"
              name="customer"
              required
              className="input w-full"
              defaultValue={username}
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="phone-number" className="sm:basis-40">
            Phone number
          </label>
          <div className="grow">
            <input
              id="phone-number"
              aria-describedby={formErrors?.phone ? "phone-error" : undefined}
              type="tel"
              name="phone"
              required
              className="input w-full"
            />
          </div>
          {formErrors?.phone && (
            <p
              id="phone-error"
              role="alert"
              className="mt-2 rounded-md bg-red-100 p-2 text-xs font-bold text-red-600"
            >
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="address" className="sm:basis-40">
            Address
          </label>
          <div className="relative grow">
            <input
              id="address"
              aria-describedby={
                addressStatus === "error" ? "address-error" : undefined
              }
              disabled={isLoadingAddress}
              defaultValue={address}
              type="text"
              name="address"
              required
              className="input w-full pr-28"
            />
            {addressStatus === "error" && (
              <p
                id="address-error"
                role="alert"
                className="mt-2 rounded-md bg-red-100 p-2 text-xs font-bold text-red-600"
              >
                {errorAddress}
              </p>
            )}

            <p aria-live="polite" className="sr-only">
              {isLoadingAddress ? "Getting your current location" : ""}
            </p>

            <span className="absolute inset-y-1 right-1 flex items-stretch">
              <Button
                disabled={isLoadingAddress}
                type="small"
                ariaLabel="Get current location to fill address"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-4 w-4 border-2 border-yellow-600 accent-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>

          {/* FOR SCREEN READER ONLY */}
          <p aria-live="polite" className="sr-only">
            Total order price {formatCurrency(totalPrice)}
          </p>
        </div>

        <div className="flex sm:justify-end">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude} , ${position.longitude}`
                : " "
            }
          />
          <Button disabled={isSubmiting} type="order">
            {isSubmiting ? "Placing Order..." : "Order now "}
            {formatCurrency(totalPrice)}
          </Button>
        </div>
      </Form>
    </div>
  );
}

/** we cannot redirect  user to another page using navigate function
 * because it comes from calling useNavigateHook and hooks can only be used
 * inside Components. So we use redirect function provided by RR. It creates
 * a new request.
 * It only works inside loaders and actions
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
    priority: data.priority === "true",
  };

  //error handling in form action
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please provide a valid phone number!";

  if (Object.keys(errors).length > 0) return errors;

  //if evething is ok, create a new order, claer the cart, and redirect
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;

/**
 *  remember that useDispatch hook cannot be used in normal function, 
 * only inside components. So i did ere is a trick. 
 *
 *  don't overuse this approche as it deactivate some performance optimization
  store.dispatch(clearCart());

 */
