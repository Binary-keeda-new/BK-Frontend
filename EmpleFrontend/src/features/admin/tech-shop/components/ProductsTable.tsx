"use client";

import { Product } from "../types/techShop.types";

type Props = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};
export default function ProductsTable({ products,onEdit,onDelete,}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--clr-surface)] p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Recent Products
        </h2>

        <button className="text-sm font-medium text-orange-500 hover:text-orange-400">
          View all
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-left text-sm text-white/50">
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 font-medium">Price</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
  {products.length === 0 ? (
    <tr>
      <td
        colSpan={4}
        className="py-8 text-center text-white/50"
      >
        No products found.
      </td>
    </tr>
  ) : (
    products.map((product) => (
      <tr
        key={product._id}
        className="transition hover:bg-white/[0.02]"
      >
        <td className="py-4 text-white">
          {product.productName}
        </td>

        <td className="py-4 text-white">
          ₹{product.currentPrice.toLocaleString()}
        </td>

        <td className="py-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              product.status === "published"
                ? "bg-green-500/15 text-green-400"
                : "bg-yellow-500/15 text-yellow-400"
            }`}
          >
            {product.status}
          </span>
        </td>

        <td className="py-4 text-right">
          <button
  onClick={() => onEdit(product)}
  className="mr-4 text-sm text-blue-400 hover:text-blue-300"
>
  Edit
</button>

          <button
  onClick={() => onDelete(product._id)}
  className="text-sm text-red-400 hover:text-red-300"
>
  Delete
</button>
        </td>
      </tr>
    ))
  )}
</tbody>
        </table>
      </div>
    </div>
  );
}