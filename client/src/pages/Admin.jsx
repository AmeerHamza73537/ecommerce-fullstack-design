import { useState, useEffect } from "react";
import {
  adminGetProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
} from "../api/admin";
import { uploadImage } from "../api/cloudinary";
import { sidebarCategories } from "../data/products";
import { Image, Loader2, X } from "lucide-react";

// Get only the actual selectable product categories (excluding "More category" if not needed,
// but the first 8 match the list from the image: Automobiles, Clothes and wear, Home interiors,
// Computer and tech, Tools, equipments, Sports and outdoor, Animal and pets, Machinery tools)
const availableCategories = sidebarCategories.slice(0, 8);

const emptyForm = {
  name: "",
  price: "",
  images: [], // Support up to 6 images
  description: "",
  category: availableCategories[0] || "Automobiles",
  stock: "",
};

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState(emptyForm);
  const [localPreviews, setLocalPreviews] = useState(Array(6).fill(""));
  const [editingId, setEditingId] = useState(null); // null = "add" mode
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState("");

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const loadProducts = () => {
    setLoading(true);
    adminGetProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("Something went wrong"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let ignore = false;
    adminGetProducts()
      .then((data) => {
        if (!ignore) setProducts(data);
      })
      .catch(() => {
        if (!ignore) setError("Something went wrong");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setLocalPreviews(Array(6).fill(""));
    setEditingId(null);
    setFormError("");
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setLocalPreviews(Array(6).fill(""));
    setForm({
      name: p.name || "",
      price: p.price ?? "",
      images: p.images || (p.image ? [p.image] : []),
      description: p.description || "",
      category: p.category || (availableCategories[0] || "Automobiles"),
      stock: p.stock ?? "",
    });
    setFormError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageUploadAtIndex = async (file, index) => {
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setLocalPreviews((prev) => {
      const next = [...prev];
      next[index] = localUrl;
      return next;
    });
    setUploading(true);
    setFormError("");
    try {
      const url = await uploadImage(file);
      setForm((prevForm) => {
        const nextImages = [...(prevForm.images || [])];
        while (nextImages.length <= index) {
          nextImages.push("");
        }
        nextImages[index] = url;
        return { ...prevForm, images: nextImages };
      });
      setLocalPreviews((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
    } catch (err) {
      setFormError(err.message || "Image upload failed");
      setLocalPreviews((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImageAtIndex = (index) => {
    setForm((prevForm) => {
      const nextImages = [...(prevForm.images || [])];
      nextImages[index] = "";
      while (nextImages.length > 0 && !nextImages[nextImages.length - 1]) {
        nextImages.pop();
      }
      return { ...prevForm, images: nextImages };
    });
    setLocalPreviews((prev) => {
      const next = [...prev];
      next[index] = "";
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");

    const activeImages = (form.images || []).filter(Boolean);

    const payload = {
      name: form.name,
      price: Number(form.price),
      image: activeImages[0] || "",
      images: activeImages,
      description: form.description,
      category: form.category,
      stock: Number(form.stock),
    };

    try {
      if (editingId) {
        await adminUpdateProduct(editingId, payload);
      } else {
        await adminCreateProduct(payload);
      }
      resetForm();
      loadProducts();
    } catch (err) {
      setFormError(err.response?.data?.message || "Could not save product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    try {
      await adminDeleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Could not delete product.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-5 text-2xl font-semibold text-gray-900">Admin Panel</h1>

      {/* ---------- Add / Edit form ---------- */}
      <section className="mb-8 rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          {editingId ? "Edit product" : "Add new product"}
        </h2>

        {formError && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {formError}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Price (USD)
            </label>
            <input
              required
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => setField("price", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none bg-white"
            >
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => setField("stock", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Image Upload Box (up to 6 images) */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Product Images (up to 6)
            </label>
            
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => {
                const imgUrl = (form.images && form.images[index]) || "";
                const previewUrl = localPreviews[index] || "";
                const isUploadingThis = uploading && previewUrl !== "";
                
                return (
                  <div key={index} className="relative aspect-square w-full">
                    <label className="group relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-2xl bg-slate-100 border border-transparent transition-all hover:bg-slate-200 overflow-hidden">
                      {/* File input (hidden) */}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploading}
                        onChange={(e) => handleImageUploadAtIndex(e.target.files[0], index)}
                      />

                      {/* Preview of local image or uploaded image */}
                      {(previewUrl || imgUrl) ? (
                        <>
                          <img
                            src={previewUrl || imgUrl}
                            alt={`Preview ${index + 1}`}
                            className="h-full w-full object-cover transition-opacity duration-300"
                          />
                          
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <span className="text-[10px] font-semibold text-white bg-black/60 px-2 py-1 rounded-full">
                              Change
                            </span>
                          </div>
                        </>
                      ) : (
                        /* Placeholder */
                        <div className="flex flex-col items-center justify-center text-center">
                          <Image size={24} className="text-slate-400 mb-1" />
                          <span className="text-[10px] text-slate-400">Add Image</span>
                        </div>
                      )}

                      {/* Spinner Overlay during upload */}
                      {isUploadingThis && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-[2px]">
                          <Loader2 size={20} className="animate-spin text-blue-600 mb-0.5" />
                          <span className="text-[8px] font-semibold text-gray-600">Uploading...</span>
                        </div>
                      )}
                    </label>

                    {/* Remove button if image is present */}
                    {(previewUrl || imgUrl) && !isUploadingThis && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImageAtIndex(index)}
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors"
                        title="Remove image"
                      >
                        <X size={10} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={submitting || uploading}
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting
                ? "Saving..."
                : editingId
                ? "Update product"
                : "Add product"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* ---------- Products table ---------- */}
      <section className="rounded-lg border border-gray-200 bg-white">
        <h2 className="border-b border-gray-100 p-4 text-lg font-semibold text-gray-800">
          All products ({products.length})
        </h2>

        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : error ? (
          <p className="p-6 text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t border-gray-100">
                    <td className="p-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-12 w-12 rounded border border-gray-100 object-cover"
                      />
                    </td>
                    <td className="p-3 font-medium text-gray-800">{p.name}</td>
                    <td className="p-3 text-gray-700">${p.price.toFixed(2)}</td>
                    <td className="p-3 text-gray-700">{p.category || "—"}</td>
                    <td className="p-3 text-gray-700">{p.stock}</td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-red-500 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
