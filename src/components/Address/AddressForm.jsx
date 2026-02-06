import { useState, useEffect } from "react";
import { CHILE_LOCATIONS } from "../../helpers/chileLocations.js";

const AddressForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    street: "",
    state: "", // Región
    city: "",  // Comuna
    phone: "",
    label: "",
    isDefault: false,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        street: initialData.street || "",
        state: initialData.state || "",
        city: initialData.city || "",
        phone: initialData.phone || "",
        label: initialData.label || "",
        isDefault: initialData.isDefault || false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // si cambia la región → reseteamos ciudad
    if (name === "state") {
      setForm({
        ...form,
        state: value,
        city: "",
      });
      return;
    }

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const selectedRegion = CHILE_LOCATIONS.find(
    (r) => r.region === form.state
  );

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold">
        {initialData ? "Editar dirección" : "Nueva dirección"}
      </h3>

      <input
        className="border p-2 rounded"
        placeholder="Etiqueta (Ej: Casa, Oficina)"
        name="label"
        value={form.label}
        onChange={handleChange}
        required
      />

 
      {/* REGIÓN */}
      <select
        name="state"
        value={form.state}
        onChange={handleChange}
        className="border p-2 rounded bg-stone-950 max-h-48 overflow-y-auto"
        required
      >
        <option value="">Selecciona una región</option>
        {CHILE_LOCATIONS.map((r) => (
          <option key={r.region} value={r.region}>
            {r.region}
          </option>
        ))}
      </select>

      {/* CIUDAD / COMUNA */}
      <select
        name="city"
        value={form.city}
        onChange={handleChange}
        className="border p-2 rounded bg-stone-950 max-h-48 overflow-y-auto"
        required
        disabled={!form.state}
      >
        <option value="">
          {form.state
            ? "Selecciona una ciudad"
            : "Selecciona primero una región"}
        </option>

        {selectedRegion?.comunas.map((comuna) => (
          <option key={comuna} value={comuna}>
            {comuna}
          </option>
        ))}
      </select>

           <input
        className="border p-2 rounded"
        placeholder="Direccion"
        name="street"
        value={form.street}
        onChange={handleChange}
        required
      />


      <input
        className="border p-2 rounded"
        placeholder="Teléfono"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isDefault"
          checked={form.isDefault}
          onChange={handleChange}
        />
        <span>Usar como dirección predeterminada</span>
      </label>

      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 border rounded cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-3 py-2 bg-primary text-white rounded cursor-pointer"
        >
          {initialData ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;