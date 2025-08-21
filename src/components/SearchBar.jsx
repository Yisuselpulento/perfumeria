import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (query.trim()) {
        newParams.set("q", query);
      } else {
        newParams.delete("q");
      }
      setSearchParams(newParams);
    }, 300); 

    return () => clearTimeout(handler); 
  }, [query]);

  useEffect(() => {
    if (searchParams.get("q") !== query) {
      setQuery(searchParams.get("q") || "");
    }
  }, [searchParams]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Buscar productos..."
      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
};

export default SearchBar;