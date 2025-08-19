import { useState } from "react";

const ShippingForm = ({ onChange }) => {
  const [form, setForm] = useState({
    fullName: "",
    street: "",
    city: "",
    country: "Chile",
    zip: ""
  });

   const [errors, setErrors] = useState({});

    const validate = (field, value) => {
    let message = "";

    if (!value.trim()) message = "Este campo es obligatorio";

    if (field === "zip" && !/^\d{4,10}$/.test(value)) {
      message = "Código postal inválido";
    }

    return message;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };

    setForm(updated);
    setErrors({ ...errors, [name]: validate(name, value) });
    onChange(updated, Object.values(errors).some((err) => err));
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Datos de envío</h3>

      {["fullName", "street", "city", "zip", "country"].map((field) => (
        <div key={field}>
          <input
            type="text"
            name={field}
            placeholder={
              field === "fullName"
                ? "Nombre completo"
                : field === "street"
                ? "Dirección"
                : field === "city"
                ? "Ciudad"
                : field === "zip"
                ? "Código postal"
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