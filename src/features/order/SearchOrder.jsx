import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  //to navigate to the #id order/page:
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="order-search">
        Search order by ID
      </label>
      <input
        id="order-search"
        type="text"
        placeholder="search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="focus:ring-opacity-50 w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-600 placeholder:text-stone-400 focus:ring focus:ring-yellow-700 focus:outline-none sm:w-42 sm:focus:w-64"
      />
    </form>
  );
}

export default SearchOrder;
