"use client";
import { useState } from "react";
import ProductModal from "../components/ProductModal";
import SearchBar from "../components/SearchBar";
import FilterButton from "../components/Filterbutton";
import ProductCard from "../components/ProductCard";
import WishlistButton from "../components/WishlistButton";
import GoalsButton from "../components/GoalsButton";

export default function TechShopPage() {

const [wishlist, setWishlist] = useState<number[]>([]);
const [showWishlist, setShowWishlist] = useState(false);

const [cart, setCart] = useState<number[]>([]);
const [showCart, setShowCart] = useState(false);


const toggleWishlist = (id: number) => {
  setWishlist((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
  );
};

const toggleCart = (id: number) => {
  setCart((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
  );
};


  const products = [
  {
    id: 1,
    name: "MacBook Air M4",
    price: "₹99,999",
    rating: 4.8,
     image: "/techshop/1.jpg",
     affiliateLink: "https://amazon.in",
  },
  {
    id: 2,
    name: "LG UltraWide Monitor",
    price: "₹14,999",
    rating: 4.7,
     image: "/techshop/2.png",
  affiliateLink: "https://amzn.to/abc123",
  },
  {
    id: 3,
    name: "Sony WH-CH520",
    price: "₹4,999",
    rating: 4.6,
     image: "/techshop/3.png",
  affiliateLink: "https://amzn.to/abc123",
  },
  {
    id: 4,
    name: "Logitech MX Master 3S",
    price: "₹8,999",
    rating: 4.9,
     image: "/techshop/4.jpg",
  affiliateLink: "https://amzn.to/abc123",
  },
  {
    id: 5,
    name: "Redragon Keyboard",
    price: "₹3,499",
    rating: 4.5,
     image: "/techshop/5.png",
  affiliateLink: "https://amzn.to/abc123",
  },
  {
    id: 6,
    name: "Samsung T7 SSD",
    price: "₹7,999",
    rating: 4.8,
     image: "/techshop/6.png",
  affiliateLink: "https://amzn.to/abc123",
  },
  {
    id: 7,
    name: "Ambrane Power Bank",
    price: "₹1,999",
    rating: 4.4,
     image: "/products/macbook.jpg",
  affiliateLink: "https://amzn.to/abc123",
  },
  {
    id: 8,
    name: "HP Laptop Backpack",
    price: "₹1,299",
    rating: 4.3,
     image: "/products/macbook.jpg",
  affiliateLink: "https://amzn.to/abc123",
  },
  {
    id: 9,
    name: "Anker 65W Charger",
    price: "₹2,499",
    rating: 4.7, 
    image: "/products/macbook.jpg",
  affiliateLink: "https://amzn.to/abc123",
  },
  {
    id: 10,
    name: "Apple AirPods 4",
    price: "₹12,999",
    rating: 4.8,
     image: "/products/macbook.jpg",
  affiliateLink: "https://amzn.to/abc123",
  },
  {
  id: 11,
  name: "HP 15s Laptop",
  price: "₹52,999",
  rating: 4.5,
  image: "/products/hp15s.jpg",
  affiliateLink: "https://amzn.to/hp15s",
},
{
  id: 12,
  name: "Lenovo IdeaPad Slim 3",
  price: "₹48,999",
  rating: 4.4,
  image: "/products/lenovo-ideapad.jpg",
  affiliateLink: "https://amzn.to/lenovo-ideapad",
},
{
  id: 13,
  name: "ASUS VivoBook 15",
  price: "₹54,999",
  rating: 4.6,
  image: "/products/asus-vivobook.jpg",
  affiliateLink: "https://amzn.to/asus-vivobook",
},
{
  id: 14,
  name: "Acer Aspire Lite",
  price: "₹45,999",
  rating: 4.3,
  image: "/products/acer-aspire.jpg",
  affiliateLink: "https://amzn.to/acer-aspire",
},
{
  id: 15,
  name: "Dell Inspiron 15",
  price: "₹58,999",
  rating: 4.7,
  image: "/products/dell-inspiron.jpg",
  affiliateLink: "https://amzn.to/dell-inspiron",
},
{
  id: 16,
  name: "Samsung Galaxy Tab A9+",
  price: "₹18,999",
  rating: 4.4,
  image: "/products/tab-a9.jpg",
  affiliateLink: "https://amzn.to/tab-a9",
},
{
  id: 17,
  name: "Redmi Pad SE",
  price: "₹13,999",
  rating: 4.3,
  image: "/products/redmi-pad-se.jpg",
  affiliateLink: "https://amzn.to/redmi-pad-se",
},
{
  id: 18,
  name: "Apple iPad 10th Gen",
  price: "₹34,999",
  rating: 4.8,
  image: "/products/ipad-10.jpg",
  affiliateLink: "https://amzn.to/ipad10",
},
{
  id: 19,
  name: "Redmi Note 13",
  price: "₹17,999",
  rating: 4.5,
  image: "/products/redmi-note13.jpg",
  affiliateLink: "https://amzn.to/redmi-note13",
},
{
  id: 20,
  name: "Samsung Galaxy M35",
  price: "₹19,999",
  rating: 4.4,
  image: "/products/galaxy-m35.jpg",
  affiliateLink: "https://amzn.to/galaxy-m35",
},
{
  id: 21,
  name: "Apple Watch SE",
  price: "₹24,999",
  rating: 4.8,
  image: "/products/apple-watch-se.jpg",
  affiliateLink: "https://amzn.to/apple-watch-se",
},
{
  id: 22,
  name: "Noise ColorFit Pro 5",
  price: "₹3,999",
  rating: 4.4,
  image: "/products/noise-pro5.jpg",
  affiliateLink: "https://amzn.to/noise-pro5",
},
{
  id: 23,
  name: "Fire-Boltt Ninja Call",
  price: "₹1,499",
  rating: 4.2,
  image: "/products/fireboltt-ninja.jpg",
  affiliateLink: "https://amzn.to/fireboltt-ninja",
},
{
  id: 24,
  name: "boAt Wave Call",
  price: "₹1,799",
  rating: 4.3,
  image: "/products/boat-wave-call.jpg",
  affiliateLink: "https://amzn.to/boat-wave-call",
},
{
  id: 25,
  name: "Fastrack Revoltt",
  price: "₹2,299",
  rating: 4.4,
  image: "/products/fastrack-revoltt.jpg",
  affiliateLink: "https://amzn.to/fastrack-revoltt",
},
{
  id: 26,
  name: "Crucial 8GB DDR4 RAM",
  price: "₹1,699",
  rating: 4.7,
  image: "/products/crucial-8gb.jpg",
  affiliateLink: "https://amzn.to/crucial-8gb",
},
{
  id: 27,
  name: "Kingston 16GB DDR4 RAM",
  price: "₹3,199",
  rating: 4.8,
  image: "/products/kingston-16gb.jpg",
  affiliateLink: "https://amzn.to/kingston-16gb",
},
{
  id: 28,
  name: "Samsung 980 SSD",
  price: "₹4,999",
  rating: 4.8,
  image: "/products/samsung-980.jpg",
  affiliateLink: "https://amzn.to/samsung-980",
},
{
  id: 29,
  name: "WD Blue SSD",
  price: "₹3,999",
  rating: 4.6,
  image: "/products/wd-blue.jpg",
  affiliateLink: "https://amzn.to/wd-blue",
},
{
  id: 30,
  name: "Crucial MX500 SSD",
  price: "₹4,499",
  rating: 4.7,
  image: "/products/mx500.jpg",
  affiliateLink: "https://amzn.to/mx500",
},
{
  id: 31,
  name: "Logitech G102 Mouse",
  price: "₹1,495",
  rating: 4.7,
  image: "/products/logitech-g102.jpg",
  affiliateLink: "https://amzn.to/logitech-g102",
},
{
  id: 32,
  name: "HP Wireless Mouse",
  price: "₹799",
  rating: 4.3,
  image: "/products/hp-mouse.jpg",
  affiliateLink: "https://amzn.to/hp-mouse",
},
{
  id: 33,
  name: "Logitech K380 Keyboard",
  price: "₹2,999",
  rating: 4.8,
  image: "/products/logitech-k380.jpg",
  affiliateLink: "https://amzn.to/logitech-k380",
},
{
  id: 34,
  name: "Amazon Basics Laptop Sleeve",
  price: "₹699",
  rating: 4.4,
  image: "/products/laptop-sleeve.jpg",
  affiliateLink: "https://amzn.to/laptop-sleeve",
},
{
  id: 35,
  name: "Spigen Laptop Sleeve",
  price: "₹1,299",
  rating: 4.6,
  image: "/products/spigen-sleeve.jpg",
  affiliateLink: "https://amzn.to/spigen-sleeve",
},
{
  id: 36,
  name: "JBL Tune 760NC",
  price: "₹5,499",
  rating: 4.5,
  image: "/products/jbl-760nc.jpg",
  affiliateLink: "https://amzn.to/jbl-760nc",
},
{
  id: 37,
  name: "boAt Rockerz 450",
  price: "₹1,299",
  rating: 4.3,
  image: "/products/boat-450.jpg",
  affiliateLink: "https://amzn.to/boat-450",
},
{
  id: 38,
  name: "Sony WH-1000XM5",
  price: "₹29,999",
  rating: 4.9,
  image: "/products/sony-xm5.jpg",
  affiliateLink: "https://amzn.to/sony-xm5",
},
{
  id: 39,
  name: "JBL Go 3 Speaker",
  price: "₹2,999",
  rating: 4.5,
  image: "/products/jbl-go3.jpg",
  affiliateLink: "https://amzn.to/jbl-go3",
},
{
  id: 40,
  name: "OnePlus Bullets Z2",
  price: "₹1,999",
  rating: 4.4,
  image: "/products/bullets-z2.jpg",
  affiliateLink: "https://amzn.to/bullets-z2",
},
{
  id: 41,
  name: "Green Soul Chair",
  price: "₹8,999",
  rating: 4.6,
  image: "/products/greensoul-chair.jpg",
  affiliateLink: "https://amzn.to/greensoul-chair",
},
{
  id: 42,
  name: "CELLBELL Office Chair",
  price: "₹7,499",
  rating: 4.4,
  image: "/products/cellbell-chair.jpg",
  affiliateLink: "https://amzn.to/cellbell-chair",
},
{
  id: 43,
  name: "Nilkamal Study Table",
  price: "₹4,999",
  rating: 4.3,
  image: "/products/nilkamal-table.jpg",
  affiliateLink: "https://amzn.to/nilkamal-table",
},
{
  id: 44,
  name: "Portronics Bed Table",
  price: "₹1,299",
  rating: 4.2,
  image: "/products/bed-table.jpg",
  affiliateLink: "https://amzn.to/bed-table",
},
{
  id: 45,
  name: "Milton Water Bottle",
  price: "₹499",
  rating: 4.5,
  image: "/products/milton-bottle.jpg",
  affiliateLink: "https://amzn.to/milton-bottle",
},
{
  id: 46,
  name: "Atomic Habits",
  price: "₹499",
  rating: 4.9,
  image: "/products/atomic-habits.jpg",
  affiliateLink: "https://amzn.to/atomic-habits",
},
{
  id: 47,
  name: "Rich Dad Poor Dad",
  price: "₹399",
  rating: 4.8,
  image: "/products/rich-dad-poor-dad.jpg",
  affiliateLink: "https://amzn.to/rich-dad-poor-dad",
},
{
  id: 48,
  name: "The Psychology of Money",
  price: "₹449",
  rating: 4.9,
  image: "/products/psychology-of-money.jpg",
  affiliateLink: "https://amzn.to/psychology-of-money",
},
{
  id: 49,
  name: "Ikigai",
  price: "₹349",
  rating: 4.7,
  image: "/products/ikigai.jpg",
  affiliateLink: "https://amzn.to/ikigai",
},
{
  id: 50,
  name: "The Alchemist",
  price: "₹299",
  rating: 4.8,
  image: "/products/the-alchemist.jpg",
  affiliateLink: "https://amzn.to/the-alchemist",
},
];

const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedLink, setSelectedLink] = useState("");

const visibleProducts = showWishlist
    ? products.filter((product) =>
        wishlist.includes(product.id)
      )
    : products;
    

  return (
    <div className="min-h-screen bg-[#0e0f15] p-8">
      <h1 className="font-syne text-3xl font-bold">
  Tech Shop
</h1>

      <p className="font-inter text-gray-400 mb-3 mt-2">
  Discover the latest gadgets.
</p>

      {/* Search */}
       <div className="flex items-center gap-4 mb-4">
  <div className="flex-1">
    <SearchBar />
  </div>

  <FilterButton />

  <WishlistButton
  showWishlist={showWishlist}
  setShowWishlist={setShowWishlist}
/>

  <GoalsButton />


</div>



      {/* Products */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {visibleProducts.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          rating={product.rating}
          image={product.image}
          affiliateLink={product.affiliateLink}
          isWishlisted={wishlist.includes(product.id)}
          onWishlistToggle={() => toggleWishlist(product.id)}
          onBuyNow={() => {
          setSelectedLink(product.affiliateLink);
          setIsModalOpen(true);
  }}
        />
      ))}
    </div>

     <ProductModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  affiliateLink={selectedLink}

/>
    </div>
  );
}