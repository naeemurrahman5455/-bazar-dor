import AllProductCard from "./AllProductCard";

const toBanglaNumber = (number) => {
  return number
    .toString()
    .replace(/0/g, "০")
    .replace(/1/g, "১")
    .replace(/2/g, "২")
    .replace(/3/g, "৩")
    .replace(/4/g, "৪")
    .replace(/5/g, "৫")
    .replace(/6/g, "৬")
    .replace(/7/g, "৭")
    .replace(/8/g, "৮")
    .replace(/9/g, "৯");
};

const AllProducts = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/products`);

  if (!res.ok) {
    throw new Error(`Products API Error: ${res.status}`);
  }

  const data = await res.json();

  return (
    <section  id="সব-পণ্য" className="bg-base-100">
      <div className="container mx-auto px-4 py-10 sm:py-12 lg:py-16">
        {/* Section Header */}
        <div className="flex justify-between">
          <div className="mb-7">
            <h1 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
              সব পণ্য
            </h1>

            <p className="mt-1 text-sm text-base-content/60">
             মোট <span className="rounded-full px-3 py-1 text-sm font-semibold text-[#1A9951]">
              {toBanglaNumber(data.length)}টি পণ্য
            </span> দেখানো হচ্ছে
            </p>
          </div>

          <div>
            <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-[#1A9951]">
              {toBanglaNumber(data.length)}টি পণ্য
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((product) => (
            <AllProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
