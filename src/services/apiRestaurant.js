// to acess menu itens type/menu in the end
const API_URL = "https://react-fast-pizza-api.jonas.io/api";

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting menu");

  const { data } = await res.json();

  //linking the name of the pizzas to a local img's:
  const imageMap = {
    Margherita: "/pizzas/margherita.png",
    Capricciosa: "/pizzas/capricciosa.png",
    Romana: "/pizzas/romana.png",
    "Prosciutto e Rucola": "/pizzas/prosciutto_rucola.png",
    Diavola: "/pizzas/diavola.png",
    Vegetale: "/pizzas/vegetale.png",
    Napoli: "/pizzas/napoli.png",
    Siciliana: "/pizzas/siciliana.png",
    Pepperoni: "/pizzas/pepperoni.png",
    Hawaiian: "/pizzas/hawaiian.png",
    "Spinach and Mushroom": "/pizzas/spinach_mush.png",
    Mediterranean: "/pizzas/mediterranean.png",
    Greek: "/pizzas/greek.png",
    Abruzzese: "/pizzas/abruzzese.png",
    "Pesto Chicken": "/pizzas/pesto.png",
    "Eggplant Parmesan": "/pizzas/egg_parmesan.png",
    "Roasted Veggie": "/pizzas/roasted.png",
    "Tofu and Mushroom": "/pizzas/tofu.png",
  };

  return data.map((pizza) => ({ ...pizza, imageUrl: imageMap[pizza.name] }));
}

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
