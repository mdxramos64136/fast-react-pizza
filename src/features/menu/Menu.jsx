/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  //custon hook to get the data:
  // no params need because react router knows that the data that we want here is
  //the one associated with this page (check the route in the App.jsx)
  const menu = useLoaderData();

  //
  return (
    <ul className="divide-y divide-yellow-300 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

//fetch the data from apiRestaurant.js and return it.
export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
