"use client";

import { useEffect, useState } from "react";
import { Product, ProductFormData } from "../types/techShop.types";
import { createProduct, updateProduct } from "../services/techShop.service";

type Props = {
  isOpen: boolean;
  editTarget: Product | null;
  onClose: () => void;
  onSuccess: (product: Product) => void;
};

const EMPTY_FORM: ProductFormData = {
  productName: "",
  productRating: 0,
  brand: "",
  category: "",
  goals: [],
  productImage: "",
  currentPrice: 0,
  originalPrice: 0,
  affiliateLink: "",
  status: "draft",
};

export default function ProductFormModal({
  isOpen,
  editTarget,
  onClose,
  onSuccess,
}: Props) {
  const [formData, setFormData] =
    useState<ProductFormData>(EMPTY_FORM);

  const [loading, setLoading] = useState(false);

  const [showGoalsDropdown, setShowGoalsDropdown] = useState(false);

  useEffect(() => {
    if (editTarget) {
      setFormData(editTarget);
    } else {
      setFormData(EMPTY_FORM);
    }
  }, [editTarget, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "productRating" ||
        name === "currentPrice" ||
        name === "originalPrice"
          ? Number(value)
          : value,
    }));
  };

  const handleGoalChange = (goal: string) => {
  setFormData((prev) => ({
    ...prev,
    goals: prev.goals.includes(goal)
      ? prev.goals.filter((g) => g !== goal)
      : [...prev.goals, goal],
  }));
};


  const handleClose = () => {
    setFormData(EMPTY_FORM);
    onClose();
  };

  const handleSubmit = async () => {
  try {
    setLoading(true);

    const result = editTarget
      ? await updateProduct(editTarget._id, formData)
      : await createProduct(formData);

    onSuccess(result);
    handleClose();
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      alert(err.message); // Sirf actual error aayega
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-[rgb(19,20,27)] p-6 ring-1 ring-white/10">

        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {editTarget ? "Edit Product" : "Create Product"}
            </h2>

            <p className="mt-1 text-sm text-white/55">
              Fill in the details to add a new product.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="rounded-full bg-[rgb(10,11,14)] px-3 py-1 text-sm text-white/70 ring-1 ring-white/10 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

  {/* Product Name */}
  <div>
    <label className="mb-2 block text-sm font-medium text-white">
      Product Name
    </label>

    <input
      type="text"
      name="productName"
      value={formData.productName}
      onChange={handleChange}
      placeholder="MacBook Air M4"
      className="w-full rounded-xl border border-white/10 bg-[rgb(10,11,14)] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
    />
  </div>

  {/* Product Rating */}
  <div>
    <label className="mb-2 block text-sm font-medium text-white">
      Product Rating
    </label>

    <input
      type="number"
      name="productRating"
      step="0.1"
      min="0"
      max="5"
      value={formData.productRating}
      onChange={handleChange}
      placeholder="4.8"
      className="w-full rounded-xl border border-white/10 bg-[rgb(10,11,14)] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
    />
  </div>

</div>

<div className="grid grid-cols-1 gap-5 md:grid-cols-2">

  {/* Brand */}
<div>
  <label className="mb-2 block text-sm font-medium text-white">
    Brand
  </label>

  <select
    name="brand"
    value={formData.brand}
    onChange={handleChange}
    className="w-full rounded-xl border border-white/10 bg-[rgb(10,11,14)] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
  >
    <option value="">Select Brand</option>

    <option value="Apple">Apple</option>
    <option value="Samsung">Samsung</option>
    <option value="Dell">Dell</option>
    <option value="HP">HP</option>
    <option value="Logitech">Logitech</option>
    <option value="Sony">Sony</option>
    <option value="Lenovo">Lenovo</option>
    <option value="ASUS">ASUS</option>
    <option value="Noise">Noise</option>
    <option value="Acer">Acer</option>
    <option value="MSI">MSI</option>
    <option value="LG">LG</option>
    <option value="Nothing">Nothing</option>
    <option value="OnePlus">OnePlus</option>
    <option value="Keychron">Keychron</option>
    <option value="boAt">boAt</option>
    <option value="JBL">JBL</option>
    <option value="Portronics">Portronics</option>
    <option value="Amazon">Amazon</option>
    <option value="Google">Google</option>
    <option value="Anker">Anker</option>
  </select>
</div>

  {/* Category */}
  <div>
    <label className="mb-2 block text-sm font-medium text-white">
      Category
    </label>

    <select
      name="category"
      value={formData.category}
      onChange={handleChange}
      className="w-full rounded-xl border border-white/10 bg-[rgb(10,11,14)] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
    >
      <option value="">Select Category</option>
      <option value="Laptop">Laptop</option>
      <option value="Mobile">Mobile</option>
      <option value="Tablet">Tablet</option>
      <option value="Smart Watch">Smart Watch</option>
      <option value="Earbuds">Earbuds</option>
      <option value="Headphones">Headphones</option>
      <option value="Keyboard">Keyboard</option>
      <option value="Mouse">Mouse</option>
      <option value="Monitor">Monitor</option>
      <option value="Accessories">Accessories</option>
      <option value="Books">Books</option>
    </select>
  </div>

  {/* Goals */}
<div className="relative">
  <label className="mb-2 block text-sm font-medium text-white">
    Goals
  </label>

  <button
    type="button"
    onClick={() => setShowGoalsDropdown(!showGoalsDropdown)}
    className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[rgb(10,11,14)] px-4 py-3 text-sm text-white transition hover:border-orange-500"
  >
    <span className="truncate">
      {formData.goals.length
        ? formData.goals.join(", ")
        : "Select Goals"}
    </span>

    <svg
      className={`h-4 w-4 transition ${
        showGoalsDropdown ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  </button>

  {showGoalsDropdown && (
    <div className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-white/10 bg-[rgb(19,20,27)] p-3 shadow-xl">

      {[
        "Machine Learning",
        "Artificial Intelligence",
        "Programming",
        "DSA",
        "Competitive Programming",
        "Web Development",
        "App Development",
        "Full Stack Development",
        "Data Science",
        "Cyber Security",
        "Cloud Computing",
        "DevOps",
        "UI/UX Design",
        "Video Editing",
        "Gaming",
        "Content Creation",
        "Productivity",
        "Study",
      ].map((goal) => (
        <label
          key={goal}
          className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-white hover:bg-white/5"
        >
          <input
            type="checkbox"
            checked={formData.goals.includes(goal)}
            onChange={() => handleGoalChange(goal)}
            className="h-4 w-4 accent-orange-500"
          />

          {goal}
        </label>
      ))}

    </div>
  )}
</div>

</div>

<div className="grid grid-cols-1 gap-5 md:grid-cols-2">

  {/* Current Price */}
  <div>
    <label className="mb-2 block text-sm font-medium text-white">
      Current Price
    </label>

    <input
      type="number"
      name="currentPrice"
      value={formData.currentPrice}
      onChange={handleChange}
      placeholder="79999"
      className="w-full rounded-xl border border-white/10 bg-[rgb(10,11,14)] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
    />
  </div>

  {/* Original Price */}
  <div>
    <label className="mb-2 block text-sm font-medium text-white">
      Original Price
    </label>

    <input
      type="number"
      name="originalPrice"
      value={formData.originalPrice}
      onChange={handleChange}
      placeholder="99999"
      className="w-full rounded-xl border border-white/10 bg-[rgb(10,11,14)] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
    />
  </div>

</div>

<div className="grid grid-cols-1 gap-5 md:grid-cols-2">

  {/* Affiliate Link */}
  <div>
    <label className="mb-2 block text-sm font-medium text-white">
      Affiliate Link
    </label>

    <input
      type="url"
      name="affiliateLink"
      value={formData.affiliateLink}
      onChange={handleChange}
      placeholder="https://..."
      className="w-full rounded-xl border border-white/10 bg-[rgb(10,11,14)] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
    />
  </div>

  {/* Status */}
  <div>
    <label className="mb-2 block text-sm font-medium text-white">
      Status
    </label>

    <select
      name="status"
      value={formData.status}
      onChange={handleChange}
      className="w-full rounded-xl border border-white/10 bg-[rgb(10,11,14)] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
    >
      <option value="draft">Draft</option>
      <option value="published">Published</option>
    </select>
  </div>

</div>

{/* Product Image */}
<div>
  <label className="mb-2 block text-sm font-medium text-white">
    Image Name
  </label>

  <input
    type="text"
    value={formData.productImage.replace("/techShop/", "")}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        productImage: `/techShop/${e.target.value}`
      }))
    }
    placeholder="macbook.png"
    className="w-full rounded-xl border border-white/10 bg-[rgb(10,11,14)] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500"
  />

  <p className="text-sm text-gray-400">
  Put this image inside <span className="text-orange-400">public/techShop/</span>
</p>
</div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={handleClose}
              className="rounded-xl border border-white/10 px-5 py-2 text-white transition hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={
  loading ||
  !formData.productName ||
  !formData.brand ||
  !formData.category ||
  !formData.currentPrice ||
  !formData.originalPrice ||
  !formData.affiliateLink
}
              className="rounded-xl bg-orange-500 px-5 py-2 font-medium text-white transition hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Saving..."
                : editTarget
                ? "Update Product"
                : "Create Product"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}