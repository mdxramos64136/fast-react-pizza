/* eslint-disable react-refresh/only-export-components */
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
function UpdateOrder({ order }) {
  // eslint-disable-next-line no-unused-vars
  const fetcher = useFetcher();

  /////////////////////
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;
////////////////////////////
export async function action({ params }) {
  //true because the button is only visible when the priority is false
  //that's why we turn that on
  //paraams contains the id of the obj
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
