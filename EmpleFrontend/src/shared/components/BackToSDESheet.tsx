"use client";

import Link from "next/link";

export default function BackToSDESheet() {
  return (
    <div className="px-8 pt-6">
      <Link
        href="/user/resources/bk-sde-sheet"
        className="inline-flex items-center gap-1.5 text-gray-400 hover:text-orange-400 text-sm font-medium transition-colors"
      >
        <span>←</span> Back to BK SDE Sheet
      </Link>
    </div>
  );
}