import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";

type ProductCardProps = {
  name: string;
  price: number;
  rating: number;
  image?: string;
  affiliateLink?: string;
  onBuyNow: () => void;
  isWishlisted?: boolean;
  onWishlistToggle?: () => void;
};

export default function ProductCard({
  name,
  price,
  rating,
  image,
  affiliateLink,
  onBuyNow,
  isWishlisted,
  onWishlistToggle,
}: ProductCardProps) {
  return (
    <div
      className="
      bg-[#1a1c25]
      border
      border-[#1e293b]

      rounded-3xl
      p-3

      min-h-[355px]
      flex
      flex-col

       transition-all
       duration-300

       hover:border-orange-500
       hover:shadow-[0_0_15px_rgba(249,115,22,0.25)]
       hover:-translate-y-2

      "
    >
      {/* Image Placeholder */}
      <div
  className="
  relative
  h-56
  rounded-2xl
  bg-white
  mb-4
  overflow-hidden

  flex
  items-center
  justify-center
  p-4
"
>
  <img
    src={image || "/placeholder.png"}
    alt={name}
    className="
      max-w-full
      max-h-full
      object-contain
      transition-transform
      duration-300
      hover:scale-105
    "
  />

  {/* Wishlist */}
  <button
    onClick={onWishlistToggle}
    className="
    absolute 
    top-3
    right-3
    w-[37px]
    h-[37px]
    rounded-full
    bg-black/20
    backdrop-blur-sm
    border
    border-white/10
    flex
    items-center
    justify-center
    transition-all
    duration-300
    hover:scale-110
    "
  >
    {isWishlisted ? (
      <HiHeart className="text-red-500 text-[34px]" />
    ) : (
      <HiOutlineHeart className="text-white text-[34px]" />
    )}
  </button>

</div>

      {/* Name + Rating */}
      <div className="flex justify-between items-start">
        <h3 className="flex-1 text-white text-[19px] font-semibold leading-snug">
        {name}
      </h3>

        <span className="flex items-center gap-1 text-yellow-400">
        <FaStar className="text-[16px] text-[#FFD43B]" 
        />
        {rating}
        </span>
      </div>

      {/* Price */}
      <p className="text-orange-400 text-[15px] font-bold mt-2">
  ₹{price.toLocaleString("en-IN")}
</p>


{/*buy now*/}

<div className="w-full flex justify-center mt-auto pt-4">

 <button
  onClick={onBuyNow}
  className="
  px-8
  py-3
  rounded-2xl
  bg-[#f15a22]
  text-white
  "
>
  Buy Now
</button>

      </div>
    </div>
  );
}