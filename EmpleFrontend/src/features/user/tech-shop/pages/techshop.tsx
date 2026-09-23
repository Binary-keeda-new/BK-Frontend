"use client";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/techShop.service";

import SearchBar from "../components/SearchBar";
import FilterButton from "../components/Filterbutton";
import ProductCard from "../components/ProductCard";
import WishlistButton from "../components/WishlistButton";
import GoalsButton from "../components/GoalsButton";

export default function TechShopPage() {

const [wishlist, setWishlist] = useState<string[]>([]);
const [showWishlist, setShowWishlist] = useState(false);

const [cart, setCart] = useState<string[]>([]);
const [showCart, setShowCart] = useState(false);


const toggleWishlist = (id: string) => {
  setWishlist((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
  );
};

const toggleCart = (id: string) => {
  setCart((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
  );
};

const [products, setProducts] = useState<any[]>([]);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  setCurrentPage(1);
}, [searchTerm]);

const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 12;

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      console.log("Products:", data);
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchProducts();
}, []);


const visibleProducts = products.filter((product) => {
  const matchesSearch = product.productName
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategories.length === 0 ||
    selectedCategories.includes(product.category);

  const matchesBrand =
    selectedBrands.length === 0 ||
    selectedBrands.includes(product.brand);

  const matchesPrice =
  selectedPriceRanges.length === 0 ||
  selectedPriceRanges.some((range) => {
    const price = product.currentPrice;

    switch (range) {
      case "Under ₹5,000":
        return price < 5000;

      case "₹5,000 – ₹20,000":
        return price >= 5000 && price <= 20000;

      case "₹20,000 – ₹50,000":
        return price > 20000 && price <= 50000;

      case "₹50,000 – ₹1,00,000":
        return price > 50000 && price <= 100000;

      case "Above ₹1,00,000":
        return price > 100000;

      default:
        return false;
    }
  }); 
  
  const matchesWishlist =
  !showWishlist || wishlist.includes(product._id);

  const matchesGoals =
  selectedGoals.length === 0 ||
  product.goals?.some((goal: string) =>
    selectedGoals.includes(goal)
  );


  return (
    matchesSearch &&
    matchesCategory &&
    matchesBrand &&
    matchesPrice &&
    matchesWishlist &&
    matchesGoals
  );
});

const totalPages = Math.ceil(
  visibleProducts.length / productsPerPage
);

const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct =
  indexOfLastProduct - productsPerPage;

const currentProducts = visibleProducts.slice(
  indexOfFirstProduct,
  indexOfLastProduct
);
    

  return (
    <div className="min-h-screen bg-[#0e0f15] p-6">
      <h1 className="font-heading text-white text-3xl font-bold mb-1 ml-1">
  Tech Shop
</h1>

      <p className="font-inter text-gray-400 mb-2 mt-2">
  Discover the latest gadgets.
</p>

      {/* Search */}
       <div className="flex items-center gap-3 mb-3">
  <div className="flex-1">
    <SearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>
  </div>

  <FilterButton
  selectedCategories={selectedCategories}
  setSelectedCategories={setSelectedCategories}
  selectedBrands={selectedBrands}
  setSelectedBrands={setSelectedBrands}
  selectedPriceRanges={selectedPriceRanges}
  setSelectedPriceRanges={setSelectedPriceRanges}
/>

  <WishlistButton
  showWishlist={showWishlist}
  setShowWishlist={setShowWishlist}
/>

  <GoalsButton
  products={products}
  selectedGoals={selectedGoals}
  setSelectedGoals={setSelectedGoals}
/>

</div>

{/* Products */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {currentProducts.map((product) => (
    <ProductCard
  key={product._id}
  name={product.productName}
  price={product.currentPrice}
  rating={product.productRating}
  image={product.productImage}
  affiliateLink={product.affiliateLink}
  isWishlisted={wishlist.includes(product._id)}
  onWishlistToggle={() => toggleWishlist(product._id)}
  onBuyNow={() => {
  window.open(product.affiliateLink, "_blank", "noopener,noreferrer");
  }}
  />
  ))}
</div>

{/* Pagination */}

{totalPages > 1 && (
  <div className="flex justify-center items-center gap-2 mt-8">
    {/* Previous */}
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-4 py-2 rounded-lg bg-[#1a1c25] text-white disabled:opacity-40"
    >
      Prev
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={`w-10 h-10 rounded-lg transition ${
          currentPage === index + 1
            ? "bg-orange-500 text-white"
            : "bg-[#1a1c25] text-gray-300 hover:bg-[#252836]"
        }`}
      >
        {index + 1}
      </button>
    ))}

    {/* Next */}
    <button
      onClick={() =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
      }
      disabled={currentPage === totalPages}
      className="px-4 py-2 rounded-lg bg-[#1a1c25] text-white disabled:opacity-40"
    >
      Next
    </button>
  </div>
)}
    </div>
  );
}