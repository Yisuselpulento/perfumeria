import { useSearchParams } from "react-router-dom";
import { tagColors } from "../helpers/tagscolors";

const FiltersDrawer = ({ isOpen, onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();

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

 return (
    <div
      className={`fixed top-0 -left-1 h-full bg-white shadow-lg transform transition-transform z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} w-[65%] text-gray-600 md:w-1/3`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Filtros</h2>
        <button onClick={onClose} className="text-xl font-bold">&times;</button>
      </div>

      <div className="p-4 flex flex-col gap-4">

        {/* Género */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-800">Género</h3>
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
          <h3 className="font-semibold mb-2 text-gray-800">Temporada</h3>
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

        {/* Tiempo del día */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-800">Ocasion / Tiempo del día</h3>
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
          <h3 className="font-semibold mb-2 text-gray-800">Aromas</h3>
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

        {/* Orden */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-800">Ordenar por</h3>
          <select
            className="w-full p-2 border rounded"
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