import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import FiltersDrawer from "../components/FiltersDrawer";
import ProductList from "../components/ProductList";
import FilterIcon from "../icons/FilterIcon";

const Storage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="p-2 md:px-26">
      <Link className="text-primary hover:text-primary/80 " to="/">
        Atrás
      </Link>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="hidden md:block md:w-1/6">
          <FiltersDrawer isOpen={true} onClose={() => {}} />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="md:hidden flex justify-between items-center gap-2">
            <SearchBar />
            <button
              className="bg-primary hover:bg-primary/80 w-[100px] text-white p-1 rounded flex items-center justify-center gap-2"
              onClick={() => setDrawerOpen(true)}
            >
              <FilterIcon width={20} height={20} />
              Filtros
            </button>
          </div>

          <div className="hidden md:block">
            <SearchBar />
          </div>
          <ProductList />
        </div>
      </div>

      <div className="md:hidden">
    <FiltersDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
  </div>
    </div>
  );
};

export default Storage;