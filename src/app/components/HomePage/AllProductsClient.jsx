
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AllProductCard from "./AllProductCard";

const getPrice = (value) => {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";
  const englishDigits = "0123456789";

  const normalized = String(value ?? "").replace(/[০-৯]/g, (digit) => {
    return englishDigits[banglaDigits.indexOf(digit)];
  });

  const price = Number(normalized.replace(/[৳,\s]/g, ""));

  return Number.isFinite(price) ? price : 0;
};

const AllProductsClient = ({ data }) => {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...data].sort((a, b) => {
    if (sortBy === "price-asc") {
      return getPrice(a.today) - getPrice(b.today);
    }

    if (sortBy === "price-desc") {
      return getPrice(b.today) - getPrice(a.today);
    }

    return 0;
  });

  return (
    <section>
      {/* Header Section */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

        {/* Left Side: Heading */}
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
            সব পণ্য 
          </h1>

          <p className="mt-2 text-sm text-base-content/60 sm:text-base">
            মোট{" "}
            <span className="font-semibold text-[#1A9951]">
              {data.length.toLocaleString("bn-BD")}
            </span>{" "}
            টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Right Side: Filter Options */}
        {/* <div className="w-full flex items-center gap-4 sm:w-60">
          <label
            htmlFor="category-sort"
            className="mb-2 block text-sm font-semibold text-base-content"
          >
            <p>সাজান</p>
          </label>

          <div className="relative">
            
            <select
              id="category-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="পণ্য সাজান"
              className="select pt-4 select-bordered h-12 w-full rounded-xl border-base-300 bg-base-100 pr-10 text-sm font-medium text-base-content shadow-sm transition-all hover:border-success/50 focus:border-success focus:outline-none focus:ring-2 focus:ring-success/15"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60"
            />
          </div>
        </div> */}
{/* Modern Sort Options */}
<div className="flex w-full items-center gap-3 sm:w-auto">
  <label
    htmlFor="category-sort"
    className="shrink-0 text-sm font-semibold text-base-content/70"
  >
    সাজান
  </label>

  <div className="group relative min-w-0 flex-1 sm:w-60 sm:flex-none">
    <select
      id="category-sort"
      value={sortBy}
      onChange={(event) => setSortBy(event.target.value)}
      aria-label="পণ্য সাজান"
      className="h-12 w-full appearance-none rounded-xl border border-base-300 bg-base-100 px-4 pr-11 text-sm font-medium text-base-content shadow-sm outline-none transition-all duration-200 hover:border-[#1A9951]/50 hover:shadow-md focus:border-[#1A9951] focus:ring-4 focus:ring-[#1A9951]/10"
    >
      <option value="default">ডিফল্ট</option>
      <option value="price-asc">দাম: কম থেকে বেশি</option>
      <option value="price-desc">দাম: বেশি থেকে কম</option>
    </select>

    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
      <ChevronDown
        size={17}
        strokeWidth={2}
        className="text-base-content/50 transition-transform duration-200 group-focus-within:rotate-180 group-focus-within:text-[#1A9951]"
      />
    </div>
  </div>
</div>




      </div>

      {/* Products Section: Below Header */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <AllProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProductsClient;
