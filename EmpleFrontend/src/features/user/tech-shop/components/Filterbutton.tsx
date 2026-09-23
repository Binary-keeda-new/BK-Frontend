"use client";

import { useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

type FilterButtonProps = {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  selectedPriceRanges: string[];
setSelectedPriceRanges: React.Dispatch<
  React.SetStateAction<string[]>
>;
};
export default function FilterButton({
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
   selectedPriceRanges,
  setSelectedPriceRanges,
}: FilterButtonProps) {

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          w-12 h-12
          rounded-full
          flex items-center justify-center
          cursor-pointer
          text-gray-400
          transition-all duration-300 ease-out
          hover:bg-[rgba(249,115,22,0.12)]
          hover:text-[#f97316]
          hover:-translate-y-1
        "
      >
        <HiOutlineAdjustmentsHorizontal className="text-3xl" />
      </button>

      {open && (
        <div
          className="
          absolute
          top-[57px]
          right-[-150px]

          w-[320px]
          max-h-[300px]

          bg-[#13141c]
          border
          border-[#1e293b]

          rounded-3xl
          overflow-hidden
          p-5

          transition-all
          duration-200

          shadow-[0_0_20px_rgba(0,0,0,0.4)]

          animate-in
          slide-in-from-right
          duration-500

          z-50
          "
        >
           <div
           className=" h-[280px] overflow-y-auto pr-2
          "
        >
          
          {/* Categories */}
          <h3 className="text-orange-400 font-semibold mb-3">
            Categories
          </h3>

          <div className="space-y-2 text-white mb-4">

  {[
    "Laptop",
    "Mobile",
    "Tablet",
    "Smart Watch",
    "Earbuds",
    "Headphones",
    "Keyboard",
    "Mouse",
    "Monitor",
    "Accessories",
    "Books",
  ].map((category) => (
    <label key={category} className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={selectedCategories.includes(category)}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedCategories((prev) => [...prev, category]);
          } else {
            setSelectedCategories((prev) =>
              prev.filter((item) => item !== category)
            );
          }
        }}
      />
      {category}
    </label>
  ))}

</div>
 
          {/* Brands */}
          <h3 className="text-cyan-400 font-semibold mb-3">
            Brands
          </h3>
          <div className="space-y-2 text-white mb-4">

  {[
    "Apple",
    "Samsung",
    "Dell",
    "HP",
    "Logitech",
    "LG",
    "Sony",
    "Lenovo",
    "ASUS",
    "Noise",
    "Acer",
    "MSI",
    "Nothing",
    "OnePlus",
    "Keychron",
    "boAt",
    "JBL",
    "Portronics",
    "Amazon",
    "Google",
    "Anker",
  ].map((brand) => (
    <label key={brand} className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={selectedBrands.includes(brand)}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedBrands((prev) => [...prev, brand]);
          } else {
            setSelectedBrands((prev) =>
              prev.filter((item) => item !== brand)
            );
          }
        }}
      />
      {brand}
    </label>
  ))}

</div>

          {/* Price */}
<h3 className="text-green-400 font-semibold mb-3">
  Price
</h3>

<div className="space-y-2 text-white mb-4">
  {[
    "Under ₹5,000",
    "₹5,000 – ₹20,000",
    "₹20,000 – ₹50,000",
    "₹50,000 – ₹1,00,000",
    "Above ₹1,00,000",
  ].map((range) => (
    <label key={range} className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={selectedPriceRanges.includes(range)}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedPriceRanges((prev) => [...prev, range]);
          } else {
            setSelectedPriceRanges((prev) =>
              prev.filter((item) => item !== range)
            );
          }
        }}
      />
      {range}
    </label>
  ))}
</div>

        </div>
        </div>
      )}
    </div>
  );
}
