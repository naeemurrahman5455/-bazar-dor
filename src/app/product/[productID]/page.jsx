


import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const ProductDetailsPage = async ({ params }) => {
  const { productID } = await params;

  // Login Protection
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/sign-in?callbackURL=${encodeURIComponent(
        `/product/${productID}`,
      )}`,
    );
  }

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/bazardor/products/${productID}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`Product API Error: ${res.status}`);
  }

  const product = await res.json();

  const formatPrice = (price) =>
    new Intl.NumberFormat("bn-BD", {
      maximumFractionDigits: 2,
    }).format(price);

  const unitLabels = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };

  const markets = product.markets || [];

  const getAverage = (min, max) => (min + max) / 2;

  const allPrices = markets.flatMap((market) => [
    market.min,
    market.max,
  ]);

  const minMarket = markets.reduce(
    (lowest, market) =>
      market.min < lowest.min ? market : lowest,
    markets[0],
  );

  const maxMarket = markets.reduce(
    (highest, market) =>
      market.max > highest.max ? market : highest,
    markets[0],
  );

  const minPrice = allPrices.length
    ? Math.min(...allPrices)
    : null;

  const maxPrice = allPrices.length
    ? Math.max(...allPrices)
    : null;

  const avgPrice = allPrices.length
    ? allPrices.reduce((sum, price) => sum + price, 0) /
      allPrices.length
    : null;

  return (
    <main className="min-h-screen bg-base-200/50">
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:py-14">
        {/* Product Header */}
        <div className="mb-8 rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-5xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-base-content sm:text-4xl">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-base-content/60">
                {unitLabels[product.unit] || product.unit} ·{" "}
                {product.nameBn}
              </p>

              <p
                className={`mt-2 text-sm font-medium ${
                  product.today > product.yesterday
                    ? "text-red-600"
                    : product.today < product.yesterday
                      ? "text-[#047F39]"
                      : "text-base-content/60"
                }`}
              >
                {product.today > product.yesterday
                  ? `গতকালের তুলনায় আজ দাম বেড়েছে ${formatPrice(
                      product.today - product.yesterday,
                    )} টাকা`
                  : product.today < product.yesterday
                    ? `গতকালের তুলনায় আজ দাম কমেছে ${formatPrice(
                        product.yesterday - product.today,
                      )} টাকা`
                    : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}
              </p>
            </div>

            <div className="mt-4 flex flex-col items-center gap-1 sm:mt-0">
              <span className="text-sm text-base-content/60">
                আজকের দাম
              </span>

              <span className="text-2xl font-extrabold text-primary">
                ৳{formatPrice(product.today)}
              </span>

              <p className="text-sm text-base-content/60">
                টাকা /{" "}
                {product.unit === "kg" ? "কেজি" : product.unit}
              </p>

              <span
                className={`badge ${
                  product.change.dir === "down"
                    ? "border-transparent bg-[#047F39]/10 text-[#047F39]"
                    : product.change.dir === "up"
                      ? "border-transparent bg-red-100 text-red-600"
                      : "badge-ghost"
                }`}
              >
                {product.change.dir === "down"
                  ? "▼"
                  : product.change.dir === "up"
                    ? "▲"
                    : "●"}{" "}
                {formatPrice(Math.abs(product.change.pct))}%
              </span>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-base-content">
              দামের সারসংক্ষেপ
            </h2>

            <p className="mt-1 text-sm text-base-content/60">
              সার্বিক বাজারদরের সংক্ষিপ্ত বিবরণ
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Minimum Price */}
            <div className="rounded-2xl border border-success/20 bg-base-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base-content/70">
                  সর্বনিম্ন দাম
                </h3>

                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/10 text-xl text-success">
                  ↓
                </span>
              </div>

              <p className="mt-5 text-3xl font-extrabold text-success">
                {minPrice !== null
                  ? `৳${formatPrice(minPrice)}`
                  : "দাম নেই"}
              </p>

              <p className="mt-2 text-sm text-base-content/50">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Maximum Price */}
            <div className="rounded-2xl border border-error/20 bg-base-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base-content/70">
                  সর্বাধিক দাম
                </h3>

                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-error/10 text-xl text-error">
                  ↑
                </span>
              </div>

              <p className="mt-5 text-3xl font-extrabold text-error">
                {maxPrice !== null
                  ? `৳${formatPrice(maxPrice)}`
                  : "দাম নেই"}
              </p>

              <p className="mt-2 text-sm text-base-content/50">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Average Price */}
            <div className="rounded-2xl border border-primary/20 bg-base-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base-content/70">
                  গড় দাম
                </h3>

                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
                  ≈
                </span>
              </div>

              <p className="mt-5 text-3xl font-extrabold text-primary">
                {avgPrice !== null
                  ? `৳${formatPrice(avgPrice)}`
                  : "দাম নেই"}
              </p>

              <p className="mt-2 text-sm text-base-content/50">
                প্রতি কেজি-এর হিসাবে
              </p>
            </div>
          </div>
        </section>

        {/* Today's Prices by Market */}
        <section className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
          <div className="flex flex-col gap-2 border-b border-base-300 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-base-content sm:text-2xl">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="text-sm text-base-content/60">
              বাজার, ক্যাটাগরি এবং সর্বনিম্ন, সর্বোচ্চ ও গড় দামের
              বিস্তারিত তালিকা।
            </p>
          </div>

          {markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-base-200 text-base-content">
                    <th>বাজার</th>
                    <th>বিভাগ</th>
                    <th className="text-right">সর্বনিম্ন</th>
                    <th className="text-right">সর্বাধিক</th>
                    <th className="text-right">গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const marketAverage = getAverage(
                      market.min,
                      market.max,
                    );

                    return (
                      <tr key={`${market.market}-${index}`}>
                        <td>
                          <div className="font-semibold text-base-content">
                            {market.market}
                          </div>
                        </td>

                        <td>
                          <div className="mt-1 text-xs text-base-content/50">
                            {market.division}
                          </div>
                        </td>

                        <td className="text-right font-semibold text-success">
                          ৳{formatPrice(market.min)}
                        </td>

                        <td className="text-right font-semibold text-error">
                          ৳{formatPrice(market.max)}
                        </td>

                        <td className="text-right font-bold text-primary">
                          ৳{formatPrice(marketAverage)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center text-base-content/60">
              এই পণ্যের বাজারভিত্তিক মূল্যতথ্য পাওয়া যায়নি।
            </div>
          )}

          <div className="border-t border-base-300 px-5 py-4 text-xs text-base-content/50 sm:px-6">
            Average Price = (Minimum Price + Maximum Price) ÷ 2
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
