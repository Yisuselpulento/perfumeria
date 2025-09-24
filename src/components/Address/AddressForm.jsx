import { useState, useEffect } from "react";

const AddressForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    label: "",
    isDefault: false,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        street: initialData.street,
        city: initialData.city,
        state: initialData.state,
        zip: initialData.zip,
        phone: initialData.phone,
        label: initialData.label,
        isDefault: initialData.isDefault || false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="flex flex-col gap-3 " onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold">{initialData ? "Editar dirección" : "Nueva dirección"}</h3>

      <input className="border p-2 rounded" placeholder="Etiqueta (Ej: Casa, Oficina)" name="label" value={form.label} onChange={handleChange} required />
      <input className="border p-2 rounded" placeholder="Calle" name="street" value={form.street} onChange={handleChange} required />
      <input className="border p-2 rounded" placeholder="Ciudad" name="city" value={form.city} onChange={handleChange} required />
      <input className="border p-2 rounded" placeholder="Estado/Región" name="state" value={form.state} onChange={handleChange} required />
      <input className="border p-2 rounded" placeholder="Código Postal" name="zip" value={form.zip} onChange={handleChange} required />
      <input className="border p-2 rounded" placeholder="Teléfono" name="phone" value={form.phone} onChange={handleChange} required />
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
        <button type="button" onClick={onCancel} className="px-3 py-2 border rounded">
          Cancelar
        </button>
        <button type="submit" className="px-3 py-2 bg-primary text-white rounded">
          {initialData ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;