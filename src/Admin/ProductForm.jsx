import { useState } from "react";
import { createProductFetching } from "../services/ProductsFetching";
import { toast } from "sonner";
import LoadingButton from "../components/LoadingButton";
import { Alert } from "../components/Alert";
import { tagColors } from "../helpers/tagscolors";

const availableTags = Object.keys(tagColors);

const ProductForm = () => {
  const [alert, setAlert] = useState({
    msg: "",
    error: false,
  });
  const [loading, setLoading] = useState(false);

  console.log("holi")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "hombre",
    image: null, 
    onSale: false,
    status: "en_stock",
    timeOfDay: "día", 
    seasons: [], 
    variants: [
      { volume: 3, price: "", stock: "" },
      { volume: 5, price: "", stock: "" },
      { volume: 10, price: "", stock: "" },
    ],
    ingredients: [{ name: "", imageFile: null }],
    tags: [{ name: "", intensity: "" }],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSeasonsChange = (e) => {
    const options = Array.from(e.target.selectedOptions);
    setFormData((prev) => ({
      ...prev,
      seasons: options.map((opt) => opt.value),
    }));
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...formData.variants];
    newVariants[index][name] = value;
    setFormData((prev) => ({ ...prev, variants: newVariants }));
  };

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

  const handleTagChange = (index, e) => {
    const { name, value } = e.target; 
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

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    for (let i = 0; i < formData.ingredients.length; i++) {
    const ing = formData.ingredients[i];
    if (!ing.name || !ing.imageFile) {
      setAlert({ error: true, msg: `El ingrediente ${i + 1} debe tener nombre e imagen.` });
      setLoading(false);
      return;
    }
  }

    try {
      const formattedVariants = formData.variants.map(({ volume, price, stock }) => ({
        volume,
        price: Number(price),
        stock: Number(stock),
      }));

      const ingredientsData = formData.ingredients.map(({ name }) => ({ name }));

      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("brand", formData.brand);
      form.append("category", formData.category);
      form.append("onSale", formData.onSale);
      form.append("status", formData.status);
      form.append("timeOfDay", formData.timeOfDay);
      form.append("seasons", JSON.stringify(formData.seasons));
      form.append("tags", JSON.stringify(formData.tags));
      form.append("variants", JSON.stringify(formattedVariants));
      form.append("ingredients", JSON.stringify(ingredientsData));

      if (formData.image) {
        form.append("productImage", formData.image);
      }

      formData.ingredients.forEach(({ imageFile }) => {
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

        setFormData({
          name: "",
          description: "",
          brand: "",
          category: "hombre",
          image: null,
          onSale: false,
          status: "en_stock",
          timeOfDay: "día",
          seasons: [],
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4 backdrop-blur-lg border border-black/20 shadow-md mt-3">
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
           <option value="hombre" className="text-black">Hombre</option>
          <option value="mujer" className="text-black">Mujer</option>
          <option value="unisex" className="text-black">Unisex</option>
        </select>
      </div>

      <div>
        <label>Momento del día</label>
        <select
          name="timeOfDay"
          value={formData.timeOfDay}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="día" className="text-black">Día</option>
          <option value="noche" className="text-black">Noche</option>
          <option value="día_y_noche" className="text-black">Día y noche</option>
        </select>
      </div>

      <div>
        <label>Temporadas</label>
        <select
          multiple
          name="seasons"
          value={formData.seasons}
          onChange={handleSeasonsChange}
          className="w-full border p-2 rounded h-32"
        >
         <option value="verano">Verano</option>
          <option value="otoño">Otoño</option>
          <option value="invierno">Invierno</option>
          <option value="primavera">Primavera</option>
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
        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Preview"
            className="mt-2 h-24 w-24 object-cover rounded border"
          />
        )}
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
         <option value="en_stock" className="text-black" >En stock</option>
          <option value="poco_stock" className="text-black">Quedan pocos</option>
          <option value="sin_stock" className="text-black">Agotado</option>
        </select>
      </div>

     <fieldset>
        <legend className="font-semibold mb-2">Variantes (ml, precio, stock)</legend>
        {formData.variants.map((variant, i) => (
          <div
            key={variant.volume}
            className="grid grid-cols-2 gap-4 items-center mb-2 w-[70%]"
          >
            <div>
              <label className="font-medium">Volumen:</label>
              <p>{variant.volume} ml</p>
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                name="price"
                placeholder="Precio"
                value={variant.price}
                onChange={(e) => handleVariantChange(i, e)}
                min={0}
                className="border p-1 rounded w-24"
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
              className="border p-1 rounded w-full"
            />

            <input
              id={`ingredient-file-${i}`}
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={(e) => handleIngredientChange(i, e)}
              className="hidden"
            />

            <label
              htmlFor={`ingredient-file-${i}`}
              className="cursor-pointer bg-blue-500 px-3 py-1 rounded text-sm hover:bg-gray-300 whitespace-nowrap"
            >
              Subir imagen
            </label>
             {ingredient.imageFile && (
              <img
                src={URL.createObjectURL(ingredient.imageFile)}
                alt={`Preview ingrediente ${i}`}
                className="h-12 w-12 object-cover rounded border"
              />
            )}

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
          className="bg-blue-500 text-white px-3 rounded mt-2"
        >
          Añadir ingrediente
        </button>
      </fieldset>

      <fieldset>
          <legend className="font-semibold mb-2">Tags (selección múltiple e intensidad 1 a 10)</legend>
          {formData.tags.map((tag, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <select
                name="name"
                value={tag.name}
                onChange={(e) => handleTagChange(i, e)}
                className="border p-1 rounded flex-1"
              >
                <option value="">Seleccione un tag</option>
                {availableTags.map((t) => (
                  <option key={t} value={t} className="text-black">
                    {t.charAt(0).toUpperCase() + t.slice(1)} 
                  </option>
                ))}
              </select>

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
      >
        Crear producto
      </LoadingButton>

      {alert.msg && <Alert alert={alert} />}
    </form>
  );
};

export default ProductForm;