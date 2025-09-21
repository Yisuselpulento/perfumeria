import { useState } from "react";

const ShippingForm = ({ onChange }) => {
  const [form, setForm] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    country: "Chile"
  });

  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    let message = "";

    if (!value.trim()) {
      message = "Este campo es obligatorio";
    }

    if (field === "zip" && !/^\d{4,10}$/.test(value)) {
      message = "Código postal inválido";
    }

    if (field === "phone" && !/^\+?\d{8,15}$/.test(value)) {
      message = "Número de teléfono inválido";
    }

    return message;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };

    setForm(updated);
    const newErrors = { ...errors, [name]: validate(name, value) };
    setErrors(newErrors);

    onChange(updated, Object.values(newErrors).some((err) => err));
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Datos de envío</h3>

      {[
        "fullName",
        "street",
        "city",
        "state",
        "zip",
        "phone",
        "country"
      ].map((field) => (
        <div key={field}>
          <input
            type={field === "phone" ? "tel" : "text"}
            name={field}
            placeholder={
              field === "fullName"
                ? "Nombre completo"
                : field === "street"
                ? "Dirección"
                : field === "city"
                ? "Ciudad"
                : field === "state"
                ? "Región / Estado"
                : field === "zip"
                ? "Código postal"
                : field === "phone"
                ? "Teléfono"
                : "País"
            }
            value={form[field]}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors[field] ? "border-red-500" : ""
            }`}
            required
          />
          {errors[field] && (
            <p className="text-red-500 text-sm">{errors[field]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShippingForm;