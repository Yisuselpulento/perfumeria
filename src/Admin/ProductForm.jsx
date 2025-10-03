import { useEffect, useState } from "react";
import { createProductFetching, updateProductFetching } from "../services/ProductsFetching";
import { toast } from "sonner";
import LoadingButton from "../components/LoadingButton";
import { Alert } from "../components/Alert";
import { tagColors } from "../helpers/tagscolors";

const availableTags = Object.keys(tagColors);

const ProductForm = ({ initialValues = null, onCreate, onUpdate, onCancel }) => {
  const [alert, setAlert] = useState({ msg: "", error: false });
  const [loading, setLoading] = useState(false);

  // ------------------- ESTADO DEL FORM -------------------
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "hombre",
    image: null,
    currentImageUrl: "",
    onSale: false,
    status: "en_stock",
    timeOfDay: "día",
    seasons: [],
    variants: [
      { volume: 4, price: "", stock: "" },
      { volume: 7, price: "", stock: "" },
      { volume: 10, price: "", stock: "" },
    ],
    ingredients: [{ name: "", imageFile: null, currentImageUrl: "" }],
    tags: [{ name: "", intensity: "" }],
  });

  // ------------------- CARGAR VALORES INICIALES -------------------
  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || "",
        description: initialValues.description || "",
        brand: initialValues.brand || "",
        category: initialValues.category || "hombre",
        image: null,
        currentImageUrl: initialValues.image?.url || "",
        onSale: initialValues.onSale || false,
        status: initialValues.status || "en_stock",
        timeOfDay: initialValues.timeOfDay || "día",
        seasons: initialValues.seasons || [],
        variants: initialValues.variants || [
          { volume: 4, price: "", stock: "" },
          { volume: 7, price: "", stock: "" },
          { volume: 10, price: "", stock: "" },
        ],
        ingredients: (initialValues.ingredients || []).map((ing) => ({
          name: ing.name || "",
          imageFile: null,
          currentImageUrl: ing.image?.url || "",
        })),
        tags: (initialValues.tags || []).map((tag) => ({
          name: tag.name || "",
          intensity: tag.intensity || "",
        })),
      });
    }
  }, [initialValues]);

  // ------------------- MANEJADORES BÁSICOS -------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSeasonsChange = (e) => {
    const options = Array.from(e.target.selectedOptions);
    setFormData((prev) => ({ ...prev, seasons: options.map((opt) => opt.value) }));
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

  const addIngredient = () =>
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", imageFile: null, currentImageUrl: "" }],
    }));

  const removeIngredient = (index) =>
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));

  const handleTagChange = (index, e) => {
    const { name, value } = e.target;
    const newTags = [...formData.tags];
    newTags[index][name] = name === "intensity" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

  const addTag = () => setFormData((prev) => ({ ...prev, tags: [...prev.tags, { name: "", intensity: "" }] }));
  const removeTag = (index) =>
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }));

  const handleImageChange = (e) => setFormData((prev) => ({ ...prev, image: e.target.files[0] || null }));

  // ------------------- ENVIAR FORMULARIO -------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ------------------- VALIDACIÓN BÁSICA -------------------
    for (let i = 0; i < formData.ingredients.length; i++) {
      if (!formData.ingredients[i].name) {
        setAlert({ error: true, msg: `El ingrediente ${i + 1} debe tener nombre.` });
        setLoading(false);
        return;
      }
    }

    try {
      // Convertir variantes a números
      const formattedVariants = formData.variants.map(({ volume, price, stock }) => ({
        volume,
        price: Number(price),
        stock: Number(stock),
      }));

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
      form.append(
        "ingredients",
        JSON.stringify(formData.ingredients.map((ing) => ({ name: ing.name })))
      );

      // Imagen principal
      if (formData.image) form.append("productImage", formData.image);

      // Imágenes de ingredientes en orden
      formData.ingredients.forEach((ing) => {
        if (ing.imageFile) form.append("ingredientImages", ing.imageFile);
      });

      // ------------------- LÓGICA DE CREAR O ACTUALIZAR -------------------
      let response;
      if (initialValues && initialValues._id && onUpdate) {
        response = await updateProductFetching(initialValues._id, form);
        if (response.success) {
          toast.success("Producto actualizado correctamente");
          onUpdate(response.product);
        } else {
          setAlert({ error: true, msg: response.message || "Error al actualizar" });
        }
      } else {
        response = await createProductFetching(form);
        if (response.success) {
          toast.success("Producto creado correctamente");
          onCreate?.(response.data);
          // Reset form
          setFormData({
            name: "",
            description: "",
            brand: "",
            category: "hombre",
            image: null,
            currentImageUrl: "",
            onSale: false,
            status: "en_stock",
            timeOfDay: "día",
            seasons: [],
            variants: [
              { volume: 4, price: "", stock: "" },
              { volume: 7, price: "", stock: "" },
              { volume: 10, price: "", stock: "" },
            ],
            ingredients: [{ name: "", imageFile: null, currentImageUrl: "" }],
            tags: [{ name: "", intensity: "" }],
          });
        } else {
          setAlert({ error: true, msg: response.message || "Error al crear producto" });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al guardar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl mx-auto p-4 backdrop-blur-lg border border-black/20 shadow-md mt-3 max-h-[90vh] overflow-y-auto"
    >
      <h2 className="text-lg mb-4">{initialValues ? "Editar Producto" : "Crear Producto"}</h2>

      {/* Nombre */}
      <div>
        <label>Nombre</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />
      </div>

      {/* Descripción */}
      <div>
        <label>Descripción</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />
      </div>

      {/* Marca */}
      <div>
        <label>Marca</label>
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full border p-2 rounded" />
      </div>

      {/* Categoría */}
      <div>
        <label>Categoría</label>
        <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>

      {/* Momento del día */}
      <div>
        <label>Momento del día</label>
        <select name="timeOfDay" value={formData.timeOfDay} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="día">Día</option>
          <option value="noche">Noche</option>
          <option value="día_y_noche">Día y noche</option>
        </select>
      </div>

      {/* Temporadas */}
      <div>
        <label>Temporadas</label>
        <select multiple value={formData.seasons} onChange={handleSeasonsChange} className="w-full border p-2 rounded h-32">
          <option value="verano">Verano</option>
          <option value="otoño">Otoño</option>
          <option value="invierno">Invierno</option>
          <option value="primavera">Primavera</option>
        </select>
      </div>

      {/* Imagen principal */}
      <div>
        <label>Imagen principal</label>
        <input type="file" name="productImage" accept="image/*" onChange={handleImageChange} className="w-full border p-2 rounded" />
        {formData.image ? (
          <img src={URL.createObjectURL(formData.image)} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded border" />
        ) : formData.currentImageUrl ? (
          <img src={formData.currentImageUrl} alt="Producto actual" className="mt-2 h-24 w-24 object-cover rounded border" />
        ) : null}
      </div>

      {/* Oferta */}
      <div className="flex items-center space-x-2">
        <label>Oferta</label>
        <input type="checkbox" name="onSale" checked={formData.onSale} onChange={handleChange} />
      </div>

      {/* Estado */}
      <div>
        <label>Estado</label>
        <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="en_stock">En stock</option>
          <option value="poco_stock">Quedan pocos</option>
          <option value="sin_stock">Agotado</option>
        </select>
      </div>

      {/* Variantes */}
      <fieldset>
        <legend className="font-semibold mb-2">Variantes (ml, precio, stock)</legend>
        {formData.variants.map((variant, i) => (
          <div key={i} className="grid grid-cols-2 gap-4 items-center mb-2 w-[70%]">
            <div>
              <label>Volumen:</label>
              <p>{variant.volume} ml</p>
            </div>
            <div className="flex gap-2">
              <input type="number" name="price" placeholder="Precio" value={variant.price} onChange={(e) => handleVariantChange(i, e)} min={0} className="border p-1 rounded w-24" />
              <input type="number" name="stock" placeholder="Stock" value={variant.stock} onChange={(e) => handleVariantChange(i, e)} min={0} className="border p-1 rounded w-20" />
            </div>
          </div>
        ))}
      </fieldset>

      {/* Ingredientes */}
      <fieldset>
        <legend className="font-semibold mb-2">Ingredientes</legend>
        {formData.ingredients.map((ingredient, i) => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <input type="text" name="name" placeholder="Nombre ingrediente" value={ingredient.name} onChange={(e) => handleIngredientChange(i, e)} className="border p-1 rounded w-full" />
            <input id={`ingredient-file-${i}`} type="file" name="imageFile" accept="image/*" onChange={(e) => handleIngredientChange(i, e)} className="hidden" />
            <label htmlFor={`ingredient-file-${i}`} className="cursor-pointer bg-blue-500 px-3 py-1 rounded text-sm hover:bg-gray-300">Subir imagen</label>
            {ingredient.imageFile ? (
              <img src={URL.createObjectURL(ingredient.imageFile)} alt={`Preview ingrediente ${i}`} className="h-12 w-12 object-cover rounded border" />
            ) : ingredient.currentImageUrl ? (
              <img src={ingredient.currentImageUrl} alt={`Ingrediente actual ${i}`} className="h-12 w-12 object-cover rounded border" />
            ) : null}
            {i > 0 && <button type="button" onClick={() => removeIngredient(i)} className="bg-red-500 text-white px-2 rounded">X</button>}
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="bg-blue-500 text-white px-3 rounded mt-2">Añadir ingrediente</button>
      </fieldset>

      {/* Tags */}
      <fieldset>
        <legend className="font-semibold mb-2">Tags</legend>
        {formData.tags.map((tag, i) => (
          <div key={i} className="flex gap-2 items-center mb-2">
            <select name="name" value={tag.name} onChange={(e) => handleTagChange(i, e)} className="border p-1 rounded flex-1">
              <option value="">Seleccione un tag</option>
              {availableTags.map((t) => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
            <input type="number" name="intensity" placeholder="Intensidad (1-10)" min={1} max={10} value={tag.intensity} onChange={(e) => handleTagChange(i, e)} className="border p-1 rounded w-24" />
            {i > 0 && <button type="button" onClick={() => removeTag(i)} className="bg-red-500 text-white px-2 rounded">X</button>}
          </div>
        ))}
        <button type="button" onClick={addTag} className="bg-blue-500 text-white px-3 rounded">Añadir tag</button>
      </fieldset>

      {/* Botones */}
      <div className="flex gap-2">
        <LoadingButton loading={loading} type="submit">{initialValues ? "Actualizar producto" : "Crear producto"}</LoadingButton>
        {onCancel && <button type="button" onClick={onCancel} className="px-3 py-1 rounded border border-gray-400">Cancelar</button>}
      </div>

      {alert.msg && <Alert alert={alert} />}
    </form>
  );
};

export default ProductForm;