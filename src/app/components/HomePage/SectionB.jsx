
import SectionBCard from "./SectionBCard";

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

const SectionB = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/bazardor/products`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Products API Error: ${res.status}`);
  }

  const data = await res.json();

  const topFallers = data
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <section className="bg-base-100">
      <div className="container mx-auto px-4 py-10 sm:py-12 lg:py-16">

        {/* Section Header */}
        <div className="mb-7 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6bbc8e58] text-xl text-[#1A9951]">
              ▼
            </span>

            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
                আজ দাম কমেছে
              </h2>

              <p className="mt-1 text-sm text-base-content/60">
                যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে
              </p>
            </div>
          </div>

          <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-[#1A9951]">
            {toBanglaNumber(topFallers.length)}টি পণ্য
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topFallers.map((product, index) => (
            <SectionBCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SectionB;