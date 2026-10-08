"use client";

import { useState } from "react";
import Link from "next/link";

const MobileMenu = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn btn-square btn-ghost btn-sm rounded-xl"
        aria-label={isOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
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
        )}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-100 w-72 rounded-2xl border border-base-300 bg-base-100 p-3 shadow-2xl">
          <div className="grid gap-2">
            {data.map((items) => (
              <Link
                href={`/category/${items.slug}`}
                key={items.id}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl border border-base-200 px-4 py-3 font-semibold transition-all hover:border-[#05893E] hover:bg-[#05893E] hover:text-white"
              >
                <span className="text-xl">
                  {items.icon}
                </span>

                <span>{items.nameBn}</span>

              </Link>
              
            ))}
          </div>


       <div className="flex mt-10 shrink-0 items-center gap-1.5 sm:gap-2">

            {/* Sign In */}
            <button
              type="button"
              className="btn btn-ghost btn-sm rounded-xl px-3 sm:inline-flex"
            >
              সাইন ইন
            </button>

            {/* Sign Up */}
            <button
              type="button"
              className="btn btn-success btn-sm  rounded-xl px-3 text-xs text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-md sm:px-4 sm:text-sm"
            >
              সাইন আপ
            </button>

          </div>

          
        </div>
      )}
    </div>
  );
};

export default MobileMenu;