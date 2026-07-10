"use client";

import { useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

export default function FilterButton() {

  const [price, setPrice] = useState(25000);

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
          top-[68px]
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
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Laptops
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Monitors
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Tablets
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Keyboards
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Headphones
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Accessories
            </label>
          </div>

          {/* Brands */}
          <h3 className="text-cyan-400 font-semibold mb-3">
            Brands
          </h3>

          <div className="space-y-2 text-white mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Apple
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Samsung
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Dell
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              HP
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Logitech
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Sony
            </label>
          </div>

           {/* Price Range */}
<h3 className="text-green-400 font-semibold mb-3">
  Price Range
</h3>

<div className="mb-6">
  <input
    type="range"
    min="500"
    max="50000"
    value={price}
    onChange={(e) => setPrice(Number(e.target.value))}
    className="
    w-full
    accent-orange-500
    cursor-pointer
    "
  />

  <div className="flex justify-between text-sm text-gray-400 mt-2">
    <span>₹500</span>
    <span>₹50,000</span>
  </div>

  <p className="text-white mt-2">
    Up to: <span className="text-orange-400">₹{price}</span>
  </p>
</div>


        </div>
        </div>
      )}
    </div>
  );
}
