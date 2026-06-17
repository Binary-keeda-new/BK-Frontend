import Link from "next/link";

export default function LegalNavbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-[var(--clr-border)]
        bg-[rgba(10,11,15,0.90)]
        backdrop-blur-xl
      "
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-24 items-center">
          <Link href="/">
            <img
              src="/logo-final.png"
              alt="Emple"
              className="h-16 md:h-20 w-auto cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}