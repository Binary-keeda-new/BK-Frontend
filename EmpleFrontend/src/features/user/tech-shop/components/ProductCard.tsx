import { HiOutlineHeart, HiHeart } from "react-icons/hi2";

type ProductCardProps = {
  name: string;
  price: string;
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

      min-h-[340px]

       transition-all
       duration-300

       hover:border-orange-500
       hover:shadow-[0_0_25px_rgba(249,115,22,0.45)]
       hover:-translate-y-2

      "
    >
      {/* Image Placeholder */}
      <div className="relative h-52 rounded-2xl bg-[#1e293b] mb-4 overflow-hidden">

  <img
    src={image || "/placeholder.png"}
    alt={name}
    className="w-full h-full object-cover"
  />

  {/* Wishlist */}
  <button
    onClick={onWishlistToggle}
    className="
absolute
top-3
right-3

w-[40px]
h-[40px]

rounded-full

bg-black/25
backdrop-blur-sm

shadow-[0_8px_20px_rgba(0,0,0,0.35)]

flex
items-center
justify-center

transition-all
duration-300

hover:bg-black/35
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
      <div className="flex justify-between items-center">
        <h3 className="text-white text-1xl font-semibold">
        {name}
      </h3>

        <span className="text-yellow-400">
          ⭐ {rating}
        </span>
      </div>

      {/* Price */}
      <p className="text-orange-400 text-1xl font-bold mt-2">
  {price}
</p>


{/*buy now*/}

<div className="w-full flex justify-center mt-7">

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


  {/*wishlist*/}

      </div>
    </div>
  );
}