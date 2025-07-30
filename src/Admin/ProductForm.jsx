import { useState } from "react";
import { createProductFetching } from "../services/ProductsFetching";
import { toast } from "sonner";
import LoadingButton from "../components/LoadingButton";
import { Alert } from "../components/Alert";

const ProductForm = () => {
  const [alert, setAlert] = useState({
    msg: "",
    error: false
  });
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "men",
    image: null, // imagen principal - archivo
    onSale: false,
    status: "in_stock",
    variants: [
      { volume: 3, price: "", stock: "" },
      { volume: 5, price: "", stock: "" },
      { volume: 10, price: "", stock: "" },
    ],
    ingredients: [
      { name: "", imageFile: null }, // imagen de ingrediente como archivo
    ],
    tags: [
      // ahora tags es un array de objetos {name, intensity}
      { name: "", intensity: "" }
    ],
  });

  // Cambios para inputs simples
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Cambios para variantes
  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...formData.variants];
    newVariants[index][name] = value;
    setFormData((prev) => ({ ...prev, variants: newVariants }));
  };

  // Cambios para ingredientes (nombre e imagen archivo)
  const handleIngredientChange = (index, e) => {
    const { name, value, files } = e.target;
    const newIngredients = [...formData.ingredients];
    if (name === "imageFile") {
      newIngredients[index].imageFile = files[0] || null;
    } else {
      newIngredients[index][name] = value;
    }
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", imageFile: null }],
    }));
  };

  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  // Cambios para tags (nombre e intensidad)
  const handleTagChange = (index, e) => {
    const { name, value } = e.target; // name será 'name' o 'intensity'
    const newTags = [...formData.tags];
    newTags[index][name] = name === "intensity" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, { name: "", intensity: "" }],
    }));
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  // Imagen principal
  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] || null }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // formatear variantes
      const formattedVariants = formData.variants.map(({ volume, price, stock }) => ({
        volume,
        price: Number(price),
        stock: Number(stock),
      }));

      // formatear ingredientes para el JSON (solo nombre)
      const ingredientsData = formData.ingredients.map(({ name }) => ({ name }));

      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("brand", formData.brand);
      form.append("category", formData.category);
      form.append("onSale", formData.onSale);
      form.append("status", formData.status);
      form.append("tags", JSON.stringify(formData.tags));
      form.append("variants", JSON.stringify(formattedVariants));
      form.append("ingredients", JSON.stringify(ingredientsData));

      // imagen principal
      if (formData.image) {
        form.append("productImage", formData.image);
      }

      // imágenes de ingredientes
      formData.ingredients.forEach(({ imageFile }, i) => {
        if (imageFile) {
          form.append("ingredientImages", imageFile);
        }
      });

      const response = await createProductFetching(form);

      if (response.success) {
        toast.success(
          <div className="text-green-600">
            {response.message || "Producto creado con éxito"}
          </div>
        );

        // resetear formulario
        setFormData({
          name: "",
          description: "",
          brand: "",
          category: "men",
          image: null,
          onSale: false,
          status: "in_stock",
          variants: [
            { volume: 3, price: "", stock: "" },
            { volume: 5, price: "", stock: "" },
            { volume: 10, price: "", stock: "" },
          ],
          ingredients: [{ name: "", imageFile: null }],
          tags: [{ name: "", intensity: "" }],
        });
      } else {
        setAlert({ error: true, msg: response.message || "Error al crear producto" });
      }
    } catch (error) {
      toast.error("Hubo un error al crear el producto.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Crear Producto</h2>

      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Marca</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label>Categoría</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="men">Hombre</option>
          <option value="women">Mujer</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>

      <div>
        <label>Imagen principal</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex items-center space-x-2">
        <label>Oferta</label>
        <input
          type="checkbox"
          name="onSale"
          checked={formData.onSale}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Estado</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="in_stock">En stock</option>
          <option value="low_stock">Quedan pocos</option>
          <option value="out_of_stock">Agotado</option>
        </select>
      </div>

      <fieldset>
        <legend className="font-semibold mb-2">Variantes (ml, precio, stock)</legend>
        {formData.variants.map((variant, i) => (
          <div key={variant.volume} className="flex gap-2 mb-2">
            <div>
              <label>Volumen: {variant.volume}ml</label>
            </div>
            <input
              type="number"
              name="price"
              placeholder="Precio"
              value={variant.price}
              onChange={(e) => handleVariantChange(i, e)}
              min={0}
              className="border p-1 rounded w-20"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={variant.stock}
              onChange={(e) => handleVariantChange(i, e)}
              min={0}
              className="border p-1 rounded w-20"
            />
          </div>
        ))}
      </fieldset>

      <fieldset>
        <legend className="font-semibold mb-2">Ingredientes</legend>
        {formData.ingredients.map((ingredient, i) => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <input
              type="text"
              name="name"
              placeholder="Nombre ingrediente"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(i, e)}
              className="border p-1 rounded flex-1"
            />
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={(e) => handleIngredientChange(i, e)}
              className="border p-1 rounded flex-1"
            />
            {i > 0 && (
              <button
                type="button"
                onClick={() => removeIngredient(i)}
                className="bg-red-500 text-white px-2 rounded"
              >
                X
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="bg-blue-500 text-white px-3 rounded"
        >
          Añadir ingrediente
        </button>
      </fieldset>

      <fieldset>
        <legend className="font-semibold mb-2">Tags (nombre e intensidad 1 a 10)</legend>
        {formData.tags.map((tag, i) => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <input
              type="text"
              name="name"
              placeholder="Nombre tag"
              value={tag.name}
              onChange={(e) => handleTagChange(i, e)}
              className="border p-1 rounded flex-1"
            />
            <input
              type="number"
              name="intensity"
              placeholder="Intensidad (1-10)"
              min={1}
              max={10}
              value={tag.intensity}
              onChange={(e) => handleTagChange(i, e)}
              className="border p-1 rounded w-24"
            />
            {i > 0 && (
              <button
                type="button"
                onClick={() => removeTag(i)}
                className="bg-red-500 text-white px-2 rounded"
              >
                X
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addTag}
          className="bg-blue-500 text-white px-3 rounded"
        >
          Añadir tag
        </button>
      </fieldset>

      <LoadingButton
        loading={loading}
        type="submit"
        className="bg-green-600 hover:bg-green-700"
      >
        Crear producto
      </LoadingButton>

      {alert.msg && <Alert alert={alert} />}
    </form>
  );
};

export default ProductForm;