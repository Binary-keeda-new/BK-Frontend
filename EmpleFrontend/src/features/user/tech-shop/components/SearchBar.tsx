import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

export default function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        className="
        w-full
        bg-[#13141c]
        border
        border-[#1e293b]

        rounded-3xl

        px-3
        py-2

        pr-12

        text-white
        placeholder:text-gray-400

        outline-none

        focus:border-orange-500
        "
      />

      <HiOutlineMagnifyingGlass
        className="
        absolute
        right-5
        top-1/2
        -translate-y-1/2

        text-gray-400
        text-xl
        "
      />
    </div>
  );
}