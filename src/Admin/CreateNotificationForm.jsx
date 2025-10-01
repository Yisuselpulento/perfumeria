import { useState } from "react";

const CreateNotificationForm = ({ onCreate }) => {
  const [form, setForm] = useState({
    scope: "global",   // por defecto promociones globales
    type: "promo",
    title: "",
    message: "",
    userId: "", // solo se usa si scope === "user"
    meta: { discountCode: "", expiresAt: "", url: "" },
    priority: "medium"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Campos anidados de meta
    if (name.startsWith("meta.")) {
      setForm(prev => ({
        ...prev,
        meta: { ...prev.meta, [name.split(".")[1]]: value }
      }));
    } 
    // Si cambia scope, ajustamos type por conveniencia
    else if (name === "scope") {
      setForm(prev => ({
        ...prev,
        scope: value,
        type: value === "global" ? "promo" : (value === "admin" ? "admin" : "system")
      }));
    } 
    else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.message.trim()) {
      alert("Título y mensaje son obligatorios");
      return;
    }

    // Normalizar expiresAt
    const metaNormalized = { ...form.meta };
    if (metaNormalized.expiresAt) {
      metaNormalized.expiresAt = new Date(metaNormalized.expiresAt).toISOString();
    }

    // Si es user scope, userId es obligatorio
    if (form.scope === "user" && !form.userId.trim()) {
      alert("Debes ingresar el ID del usuario para notificación individual");
      return;
    }

    onCreate({ ...form, meta: metaNormalized });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-4 rounded shadow-md space-y-3 bg-neutral-900 text-white"
    >
      <h2 className="text-lg font-semibold">Crear Notificación</h2>

      {/* Selector de alcance */}
      <select
        name="scope"
        value={form.scope}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-neutral-800"
      >
        <option value="global">Global (todos los usuarios)</option>
        <option value="user">Usuario específico</option>
        <option value="admin">Solo administradores</option>
      </select>

      {/* Campo userId si es scope:user */}
      {form.scope === "user" && (
        <input
          type="text"
          name="userId"
          placeholder="ID del usuario"
          value={form.userId}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-neutral-800"
        />
      )}

      <input
        type="text"
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-neutral-800"
        required
      />

      <textarea
        name="message"
        placeholder="Mensaje"
        value={form.message}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-neutral-800"
        required
      />

      {/* Meta extra */}
      <input
        type="text"
        name="meta.discountCode"
        placeholder="Código de Descuento"
        value={form.meta.discountCode}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-neutral-800"
      />

      <input
        type="date"
        name="meta.expiresAt"
        value={form.meta.expiresAt}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-neutral-800"
      />

      <input
        type="text"
        name="meta.url"
        placeholder="URL"
        value={form.meta.url}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-neutral-800"
      />

      {/* Prioridad */}
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-neutral-800"
      >
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer "
      >
        Crear
      </button>
    </form>
  );
};

export default CreateNotificationForm;