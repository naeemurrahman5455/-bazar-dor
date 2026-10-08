import SectionAProductCard from "./SectionAProductCard";

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

const SectionA = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/bazardor/products`
  );

  const data = await res.json();

  const topRisers = data
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="bg-base-100">
      <div className="container mx-auto px-4 py-10 sm:py-12 lg:py-16">

        {/* Section Header */}
        <div className="mb-7 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D03739]/10 text-xl text-[#D03739]">
              ▲
            </span>

            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
                আজ দাম বেড়েছে
              </h2>

              <p className="mt-1 text-sm text-base-content/60">
                যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে
              </p>
            </div>
          </div>

          {/* Product Count */}
          <span className="shrink-0 rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
            {toBanglaNumber(topRisers.length)}টি পণ্য
          </span>

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topRisers.map((product) => (
            <SectionAProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SectionA;