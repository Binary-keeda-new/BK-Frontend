type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  affiliateLink: string;
};

export default function ProductModal({
  isOpen,
  onClose,
  affiliateLink,
}: ProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#13141c] p-6 rounded-2xl w-[350px] border border-[#1e293b]">
        <h2 className="text-white text-xl font-bold mb-4">
          Buy Product
        </h2>

        <div className="flex flex-col gap-3">
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white text-center py-2 rounded-xl"
          >
            Open Affiliate Link
          </a>

          <button
            onClick={onClose}
            className="bg-gray-700 text-white py-2 rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}