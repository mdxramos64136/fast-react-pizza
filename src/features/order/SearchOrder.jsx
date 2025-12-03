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
      <input
        type="text"
        placeholder="search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-yellow-100 rounded-full px-4 py-2 text-sm placeholder:text-stone-400 w-28 sm:w-64  sm:focus:w-62 transition-all duration-600 focus:outline-none focus:ring focus:ring-yellow-700 focus:ring-opacity-50"
      />
    </form>
  );
}

export default SearchOrder;
