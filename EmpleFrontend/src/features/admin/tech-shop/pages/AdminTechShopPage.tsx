"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../services/techShop.service";
import { Product } from "../types/techShop.types";
import ProductFormModal from "../components/ProductFormModal";
import ProductsTable from "../components/ProductsTable";
import { deleteProduct } from "../services/techShop.service";

export default function AdminTechShopPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editTarget, setEditTarget] = useState<Product | null>(null);

  async function loadProducts() {
  try {
    setLoading(true);

    const data = await getProducts();
    setProducts(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

const handleDelete = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) return;

  try {
    await deleteProduct(id);
    await loadProducts();
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      alert(err.message);
    }
  }
};

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-7">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-white">
            Tech Shop
          </h1>

          <p className="mt-1 text-[15px] text-white/50">
            Manage all affiliate products
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="
            rounded-2xl
            bg-[#FF5A1F]
            px-4
            py-2
            text-1xl
            font-semibold
            text-white
            transition
            hover:bg-[#e84d13]
          "
        >
          + Add Product
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
  <div className="rounded-2xl border border-white/10 bg-[var(--clr-surface)] p-5">
    <p className="text-sm text-white/50">
    Published Products
    </p>

    <h2 className="mt-1 text-2xl font-bold text-white">
      0
    </h2>
  </div>

  <div className="rounded-2xl border border-white/10 bg-[var(--clr-surface)] p-5">
    <p className="text-sm text-white/50">
    Draft Products
    </p>

    <h2 className="mt-1 text-2xl font-bold text-white">
      0
    </h2>
  </div>
</div>

      <ProductFormModal
  isOpen={isModalOpen}
  editTarget={editTarget}
  onClose={() => {
  setIsModalOpen(false);
  setEditTarget(null);
}}
  onSuccess={() => {
    setIsModalOpen(false);
    loadProducts(); 
  }}
/>
<ProductsTable
  products={products}
  onEdit={(product) => {
    setEditTarget(product);
    setIsModalOpen(true);
  }}
  onDelete={handleDelete}
/>
    </div>
  );
}