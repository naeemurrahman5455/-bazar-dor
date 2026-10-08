import Link from "next/link";
import Navlinks from "./Navlinks";
import Marquee from "./Marquee";
import { CiShoppingCart } from "react-icons/ci";
import MobileMenu from "./MobileMenu";

const Header = async () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/categories`);

  const categories = await res.json();

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex min-h-17 items-center justify-between gap-3 sm:min-h-19 sm:gap-4">
          {/* Left Side - Logo & Date */}
          <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            {/* Logo */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#05893E] shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl">
              <CiShoppingCart className="text-2xl font-bold text-white sm:text-3xl" />
            </div>

            {/* Brand Information */}
            <div className="min-w-0">
              <h1 className="truncate text-lg font-extrabold leading-tight tracking-tight text-base-content sm:text-xl md:text-2xl">
                বাজার দর
              </h1>

              <p className="mt-0.5 max-w-48 truncate text-[10px] font-medium text-base-content/60 sm:max-w-none sm:text-xs md:text-sm">
                {date}
              </p>
            </div>
          </Link>

          {/* Right Side - Actions */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Sign In */}
            <button
              type="button"
              className="btn btn-ghost btn-sm hidden rounded-xl px-3 sm:inline-flex"
            >
              সাইন ইন
            </button>

            {/* Sign Up */}
            <button
              type="button"
              className="btn btn-success btn-sm hidden rounded-xl px-3 text-xs text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-md sm:px-4 sm:text-sm md:inline-flex"
            >
              সাইন আপ
            </button>

            {/* Mobile Menu */}
            <MobileMenu data={categories} />
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navlinks />
      </div>

      {/* Price Marquee */}
      <Marquee />
    </header>
  );
};

export default Header;
