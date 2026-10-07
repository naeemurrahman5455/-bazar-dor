import Image from "next/image";
import Link from "next/link";
import headerLogo from "../../../public/logo-icon.png";
import Navlinks from "./Navlinks";
import Marquee from "./Marquee";
import { CiShoppingCart } from "react-icons/ci";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex min-h-[76px] items-center justify-between gap-4">
          {/* Left Side - Logo & Date */}
          <Link href="/" className="flex items-center gap-3">
            {/* Logo */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#05893E] shadow-sm">
              {/* <Image
                src={headerLogo}
                width={50}
                height={50}
                alt="বাজার দর Logo"
                className="h-full w-full object-contain"
                priority
              /> */}
              <CiShoppingCart className="text-white font-bold text-3xl" />

            </div>

            {/* Brand Information */}
            <div className="min-w-0">
              <h1 className="text-xl font-extrabold leading-tight tracking-tight text-base-content sm:text-2xl">
                বাজার দর
              </h1>

              <p className="mt-0.5 truncate text-xs font-medium text-base-content/60 sm:text-sm">
                {date}
              </p>
            </div>
          </Link>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn btn-ghost btn-sm hidden rounded-xl sm:inline-flex"
            >
              সাইন ইন
            </button>

            <button
              type="button"
              className="btn btn-success btn-sm rounded-xl px-4 text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
            >
              সাইন আপ
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="btn btn-square btn-ghost btn-sm rounded-xl md:hidden"
              aria-label="মেনু খুলুন"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Navlinks></Navlinks>
      <Marquee></Marquee>
    </header>
  );
};

export default Header;
