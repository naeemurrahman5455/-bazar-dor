
import Link from "next/link";

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

const getUnit = (unit) => {
  const units = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return units[unit] || unit;
};

const SectionAProductCard = ({ product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block h-full"
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D03739]/20 hover:shadow-xl">

        {/* Product Info */}
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl transition-transform duration-300 group-hover:scale-110">
            {product.image}
          </div>

          <div className="min-w-0 pr-2">
            <h3 className="line-clamp-1 text-lg font-extrabold text-base-content transition-colors group-hover:text-[#D03739]">
              {product.nameBn}
            </h3>

            <p className="mt-1 text-sm font-medium text-base-content/50">
              প্রতি {getUnit(product.unit)}
            </p>
          </div>
        </div>

        {/* Price & Change */}
        <div className="mt-5 flex items-end justify-between border-t border-base-200 pt-4">
          <div>
            <p className="text-xs font-medium text-base-content/50">
              আজকের দাম
            </p>

            <p className="mt-1 text-2xl font-extrabold text-base-content">
              ৳{toBanglaNumber(product.today)}
            </p>
          </div>

          {/* Price Increase */}
          <div className="rounded-xl px-3 py-2 text-right">
   

            <p className="mt-0.5 font-bold text-[#D03739]">
              ▲ {toBanglaNumber(Math.abs(product.change.pct))}%
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default SectionAProductCard;