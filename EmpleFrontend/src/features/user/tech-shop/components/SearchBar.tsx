import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};
export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
        w-full
        bg-[#13141c]
        border
        border-[#1e293b]

        rounded-3xl

        px-2
        py-1

        pr-10

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