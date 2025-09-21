import { useSearchParams } from "react-router-dom";
import { tagColors } from "../helpers/tagscolors";
import { useState, useEffect } from "react";

const FiltersDrawer = ({ isOpen, onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const selectedGenero = searchParams.get("filter_genero")?.split(",") || [];
  const selectedTemporada = searchParams.get("filter_temporada")?.split(",") || [];
   const selectedTags = searchParams.get("filter_tags")?.split(",") || [];
  const selectedTiempo = searchParams.get("filter_tiempo")?.split(",") || [];
  const selectedOrder = searchParams.get("orderby") || "";
  

  const generos = ["hombre", "mujer", "unisex"];
  const temporadas = ["verano", "otoño", "invierno", "primavera"];
  const tiempos = ["día", "noche", "día_y_noche"];
  const tags = Object.keys(tagColors);
  const ordenes = [
    { label: "Más recientes", value: "date" },
    { label: "Precio: más bajo", value: "price_asc" },
    { label: "Precio: más alto", value: "price_desc" },
    { label: "Más vendidos", value: "sold" },
  ];

  const toggleFilter = (param, value) => {
    const current = searchParams.get(param)?.split(",") || [];
    const newValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    const newParams = new URLSearchParams(searchParams);
    if (newValues.length > 0) {
      newParams.set(param, newValues.join(","));
    } else {
      newParams.delete(param);
    }
    setSearchParams(newParams);
  };

  const changeOrder = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("orderby", value);
    } else {
      newParams.delete("orderby");
    }
    setSearchParams(newParams);
  };

  const applyPriceFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    if (minPrice) newParams.set("minPrice", minPrice);
    else newParams.delete("minPrice");
    if (maxPrice) newParams.set("maxPrice", maxPrice);
    else newParams.delete("maxPrice");
    setSearchParams(newParams);
  };

  useEffect(() => {
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
  }, [searchParams]);

 return (
    <div
      className={`
        fixed top-0 -left-1 h-full bg-white md:bg-transparent text-gray-600 md:text-gray-400 z-50 w-[65%] shadow-lg
        transform transition-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 md:w-full md:max-w-[280px] md:shadow-none
      `}
    >
      {/* Header solo para móvil */}
      <div className="flex justify-between items-center p-4 border-b md:hidden">
        <h2 className="text-lg font-bold">Filtros</h2>
        <button onClick={onClose} className="text-xl font-bold cursor-pointer hover:text-white hover:bg-primary rounded-full p-1">&times;</button>
      </div>

      <div className="p-4 flex flex-col gap-4 overflow-y-auto h-full md:h-auto">
        {/* Género */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-800 md:text-gray-300">Género</h3>
          <div className="flex flex-col gap-1">
            {generos.map((g) => (
              <label key={g} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedGenero.includes(g)}
                  onChange={() => toggleFilter("filter_genero", g)}
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Temporada */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-800 md:text-gray-300">Temporada</h3>
          <div className="flex flex-col gap-1">
            {temporadas.map((t) => (
              <label key={t} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTemporada.includes(t)}
                  onChange={() => toggleFilter("filter_temporada", t)}
                />
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Tiempo */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-800 md:text-gray-300">Ocasion / Tiempo del día</h3>
          <div className="flex flex-col gap-1">
            {tiempos.map((t) => (
              <label key={t} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTiempo.includes(t)}
                  onChange={() => toggleFilter("filter_tiempo", t)}
                />
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-800 md:text-gray-300">Aromas</h3>
          <div className="flex flex-col gap-1 overflow-y-auto" style={{ maxHeight: "150px" }}>
            {tags.map((tag) => (
              <label key={tag} className={`flex items-center gap-2 ${tag} px-2 py-1 rounded`}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => toggleFilter("filter_tags", tag)}
                />
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Precio */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-800 md:text-gray-300">Precio</h3>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Mínimo"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Máximo"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
            <button
              onClick={applyPriceFilter}
              className="bg-gray-200 md:bg-primary md:hover:bg-primary/80 md:text-gray-300 px-3 py-1 rounded hover:bg-gray-300 cursor-pointer"
            >
              Aplicar
            </button>
          </div>
        </div>

        {/* Orden */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-800 md:text-gray-300">Ordenar por</h3>
          <select
            className="w-full p-2 border rounded md:text-gray-700 md:bg-white"
            value={selectedOrder}
            onChange={(e) => changeOrder(e.target.value)}
          >
            {ordenes.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltersDrawer;