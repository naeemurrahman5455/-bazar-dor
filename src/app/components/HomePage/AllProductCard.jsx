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

const AllProductCard = ({ product }) => {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block h-full"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        {/* Product */}
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl transition-transform duration-300 group-hover:scale-110">
            {product.image}
          </div>

          <div className="min-w-0">
            <h3 className="line-clamp-1 text-lg font-extrabold text-base-content">
              {product.nameBn}
            </h3>

            <p className="mt-1 text-sm text-base-content/50">
              প্রতি {getUnit(product.unit)}
            </p>

            <p className="mt-1 text-xs font-medium text-base-content/40">
              {product.categoryNameBn}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-end justify-between border-t border-base-200 pt-4">
          <div>
            <p className="text-xs font-medium text-base-content/50">
              আজকের দাম
            </p>

            <p className="mt-1 text-2xl font-extrabold text-base-content">
              ৳{toBanglaNumber(product.today)}
            </p>
          </div>

          {/* Change */}
          {product.change && (
            <div
              className={`rounded-xl px-3 py-2 text-right ${
                isUp
                  ? "bg-[#D03739]/10"
                  : isDown
                    ? "bg-green-50"
                    : "bg-base-200"
              }`}
            >
              <p
                className={`text-xs font-medium ${
                  isUp
                    ? "text-[#D03739]/80"
                    : isDown
                      ? "text-green-600"
                      : "text-base-content/50"
                }`}
              >
                {isUp
                  ? "দাম বেড়েছে"
                  : isDown
                    ? "দাম কমেছে"
                    : "দাম অপরিবর্তিত"}
              </p>

              <p
                className={`mt-0.5 font-bold ${
                  isUp
                    ? "text-[#D03739]"
                    : isDown
                      ? "text-green-600"
                      : "text-base-content/50"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {toBanglaNumber(Math.abs(product.change.pct))}%
              </p>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default AllProductCard;