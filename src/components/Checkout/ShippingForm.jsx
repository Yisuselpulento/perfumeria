import { useState, useEffect } from "react";
import { CHILE_LOCATIONS } from "../../helpers/chileLocations.js";

const REQUIRED_FIELDS = ["street", "city", "state", "phone"];

const ShippingForm = ({ onChange, defaultAddress }) => {
  const [form, setForm] = useState({
    fullName: "",
    street: "",
    state: "", // Región
    city: "",  // Comuna
    phone: "",
    country: "Chile",
  });

  const [errors, setErrors] = useState({});

  // 👉 precargar dirección por defecto
  useEffect(() => {
    if (defaultAddress) {
      setForm({
        fullName: defaultAddress.fullName || "",
        street: defaultAddress.street || "",
        state: defaultAddress.state || "",
        city: defaultAddress.city || "",
        phone: defaultAddress.phone || "",
        country: defaultAddress.country || "Chile",
      });
    }
  }, [defaultAddress]);

  const validate = (field, value) => {
    if (REQUIRED_FIELDS.includes(field) && !value.trim()) {
      return "Este campo es obligatorio";
    }

    if (field === "phone" && value && !/^\+?\d{8,15}$/.test(value)) {
      return "Número de teléfono inválido";
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updated;

    // si cambia región → reseteamos ciudad
    if (name === "state") {
      updated = { ...form, state: value, city: "" };
    } else {
      updated = { ...form, [name]: value };
    }

    setForm(updated);

    const newErrors = {
      ...errors,
      [name]: validate(name, value),
    };

    setErrors(newErrors);

    // 🔥 enviamos data + flag de error
    onChange(updated, Object.values(newErrors).some(Boolean));
  };

  const selectedRegion = CHILE_LOCATIONS.find(
    (r) => r.region === form.state
  );

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Datos de envío</h3>

      {/* NOMBRE */}
      <input
        name="fullName"
        placeholder="Nombre completo"
        value={form.fullName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      {/* REGIÓN */}
      <select
        name="state"
        value={form.state}
        onChange={handleChange}
        className={`w-full border p-2 rounded bg-stone-950 ${
          errors.state ? "border-red-500" : ""
        }`}
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
      <input
        list="shipping-cities"
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder={
          form.state
            ? "Selecciona ciudad"
            : "Selecciona primero una región"
        }
        disabled={!form.state}
        className={`w-full border p-2 rounded ${
          errors.city ? "border-red-500" : ""
        }`}
        required
      />


      <datalist id="shipping-cities">
        {selectedRegion?.comunas.map((comuna) => (
          <option key={comuna} value={comuna} />
        ))}
      </datalist>

           {/* DIRECCIÓN */}
      <input
        name="street"
        placeholder="Dirección"
        value={form.street}
        onChange={handleChange}
        className={`w-full border p-2 rounded ${
          errors.street ? "border-red-500" : ""
        }`}
        required
      />
      {errors.street && (
        <p className="text-red-500 text-sm">{errors.street}</p>
      )}


      {/* TELÉFONO */}
      <input
        type="tel"
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
        className={`w-full border p-2 rounded ${
          errors.phone ? "border-red-500" : ""
        }`}
        required
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone}</p>
      )}
    </div>
  );
};

export default ShippingForm;