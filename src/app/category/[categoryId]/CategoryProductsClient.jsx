"use client";

import { useState } from "react";
import AllProductCard from "@/app/components/HomePage/AllProductCard";

const CategoryProductsClient = ({ products }) => {
  const [sortBy, setSortBy] = useState("default");

  const categoryName = products[0]?.categoryNameBn || "পণ্য";
  const categoryIcon = products[0]?.categoryIcon || "🛒";

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.today - b.today;
    }

    if (sortBy === "price-desc") {
      return b.today - a.today;
    }

    return a.id - b.id;
  });

  const toBanglaNumber = (number) =>
    String(number).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[digit]);

  return (
    <section className="min-h-[60vh] bg-base-100">
      <div className="container mx-auto px-4 py-10 sm:py-12 lg:px-6 lg:py-16">



<div className="mb-7 flex flex-col justify-between gap-5 rounded-2xl border border-base-200 bg-base-100 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:flex-row sm:items-center sm:p-6">
  <div className="flex items-center gap-3">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-3xl">
      {categoryIcon}
    </div>

    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
        {categoryName}
      </h1>

      <p className="mt-1 text-sm text-base-content/60">
        মোট {toBanglaNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
      </p>
    </div>
  </div>
</div>






{/* Modern Sort Control */}
<div className="mb-8 flex flex-col gap-3 rounded-2xl border border-base-200 bg-base-100 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-end sm:gap-4 sm:p-5">
  {/* Label */}
  <label
    htmlFor="category-sort"
    className="flex shrink-0 items-center gap-2 text-sm font-semibold text-base-content/80"
  >
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-success/10 text-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 7h16" />
        <path d="M7 12h10" />
        <path d="M10 17h4" />
      </svg>
    </span>

    <span>দাম সাজান</span>
  </label>

  {/* Select */}
  <div className="relative w-full sm:w-60">
    <select
      id="category-sort"
      value={sortBy}
      onChange={(event) => setSortBy(event.target.value)}
      className="select pt-4 select-bordered h-12 w-full rounded-xl border-base-300 bg-base-100 pr-10 text-sm font-medium text-base-content shadow-sm outline-none transition-all duration-200 hover:border-success/50 focus:border-success focus:outline-none focus:ring-2 focus:ring-success/15"
    >
      <option value="default">ডিফল্ট</option>
      <option value="price-asc">দাম: কম থেকে বেশি</option>
      <option value="price-desc">দাম: বেশি থেকে কম</option>
    </select>
  </div>
</div>


        {/* Products Grid */}
              <p className="mt-1 text-sm text-base-content/60">
                মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
              </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <AllProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryProductsClient;