import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import FiltersDrawer from "../components/FiltersDrawer";
import ProductList from "../components/ProductList";
import FilterIcon from "../icons/FilterIcon";

const Storage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="p-2 flex flex-col gap-4">
      <Link className="text-primary hover:text-primary/80" to="/">
        Atrás
      </Link>

      <SearchBar />

      <button
        className="bg-primary hover:bg-primary/80 w-[100px] text-white p-1 rounded flex items-center justify-center gap-2"
        onClick={() => setDrawerOpen(true)}
      >
        <FilterIcon width={20} height={20} />
        Filtros
      </button>

      <FiltersDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <ProductList />
    </div>
  );
};

export default Storage;