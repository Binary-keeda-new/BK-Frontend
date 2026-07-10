"use client";

import { useState } from "react";
import { TbTargetArrow } from "react-icons/tb";

export default function GoalsButton() {
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
  <TbTargetArrow className="text-3xl" />
</button>
    {open && (
  <div
    className="
    absolute
    top-[74px]
    right-0

    w-[320px]
    h-[320px]

    bg-[#13141c]
    border
    border-[#1e293b]

    rounded-3xl

    overflow-hidden

    shadow-[0_0_20px_rgba(0,0,0,0.4)]

    animate-in
    slide-in-from-right
    duration-500

    z-50
    "
  >
    <div className="h-full overflow-y-auto p-4">
      <h3 className="text-orange-400 font-semibold text-xl mb-5">
        Goals
      </h3>

      <div className="space-y-4 text-white">
        <label className="flex items-center gap-3">
          <input type="checkbox" />
          Machine Learning
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" />
          Gaming
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" />
          Full Stack Development
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" />
          Data Science
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" />
          Cyber Security
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" />
          UI/UX Design
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" />
          Video Editing
        </label>

        <label className="flex items-center gap-3">
          <input type="checkbox" />
          Competitive Programming
        </label>
      </div>
    </div>
  </div>
)}
</div>
);
}