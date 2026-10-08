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






                  {/* Sort Control */}
          <div className="flex justify-end bg-base-100 mb-8 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]  rounded-2xl border border-base-200 items-center gap-3">
            <label
              htmlFor="category-sort"
              className="shrink-0 text-sm font-medium text-base-content/70"
            >
              সাজান:
            </label>

            <select
              id="category-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="select select-bordered w-full rounded-xl sm:w-56"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
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