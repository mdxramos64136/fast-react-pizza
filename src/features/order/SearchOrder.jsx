import { useState } from "react";

function SearchOrder() {
  const [query, setQuery] = useState("");
  //to navigate to the #id order/page:

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
