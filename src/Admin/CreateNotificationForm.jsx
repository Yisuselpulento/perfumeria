import { useState } from "react";

const CreateNotificationForm = ({ onCreate }) => {
  const [form, setForm] = useState({
    type: "promo",
    title: "",
    message: "",
    meta: { discountCode: "", expiresAt: "", url: "" },
    priority: "high"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("meta.")) {
      setForm((prev) => ({
        ...prev,
        meta: { ...prev.meta, [name.split(".")[1]]: value }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded shadow-md space-y-3">
      <h2 className="text-lg font-semibold">Crear Notificación</h2>
      <input type="text" name="title" placeholder="Título" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" required />
      <textarea name="message" placeholder="Mensaje" value={form.message} onChange={handleChange} className="w-full p-2 border rounded" required />
      <input type="text" name="meta.discountCode" placeholder="Código de Descuento" value={form.meta.discountCode} onChange={handleChange} className="w-full p-2 border rounded" />
      <input type="date" name="meta.expiresAt" value={form.meta.expiresAt} onChange={handleChange} className="w-full p-2 border rounded" />
      <input type="text" name="meta.url" placeholder="URL" value={form.meta.url} onChange={handleChange} className="w-full p-2 border rounded" />
      <select name="priority" value={form.priority} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">Crear</button>
    </form>
  );
};

export default CreateNotificationForm;