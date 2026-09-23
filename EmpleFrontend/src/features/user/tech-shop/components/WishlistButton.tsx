"use client";

import { HiOutlineHeart, HiHeart } from "react-icons/hi2";

type WishlistButtonProps = {
  showWishlist: boolean;
  setShowWishlist: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function WishlistButton({
  showWishlist,
  setShowWishlist,
}: WishlistButtonProps) {
  return (
    <button
    onClick={() => setShowWishlist(!showWishlist)}
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
  {showWishlist ? (
  <HiHeart className="text-3xl text-red-500" />
) : (
  <HiOutlineHeart className="text-3xl" />
)}
</button>
  );
}