
const ProductDetailsLoading = () => {
  return (
    <main className="min-h-screen animate-pulse bg-base-200/50">

      <div className="container mx-auto px-4 py-10 sm:px-6 lg:py-14">
        {/* Product Header Skeleton */}
        <div className="mb-8 rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {/* Product Icon */}
            <div className="h-20 w-20 shrink-0 rounded-2xl bg-base-300" />

            {/* Product Information */}
            <div className="flex-1 space-y-4">
              <div className="h-8 w-3/4 max-w-xs rounded-lg bg-base-300" />
              <div className="h-4 w-40 rounded-md bg-base-300" />
              <div className="h-4 w-64 max-w-full rounded-md bg-base-300" />
            </div>

            {/* Today's Price */}
            <div className="flex w-full flex-col items-center gap-3 rounded-2xl border border-base-300 p-5 sm:w-56">
              <div className="h-4 w-24 rounded-md bg-base-300" />
              <div className="h-10 w-32 rounded-lg bg-base-300" />
              <div className="h-4 w-20 rounded-md bg-base-300" />
              <div className="h-7 w-20 rounded-full bg-base-300" />
            </div>
          </div>
        </div>

        {/* Price Summary Skeleton */}
        <section className="mb-10">
          <div className="mb-5 space-y-3">
            <div className="h-7 w-52 rounded-lg bg-base-300" />
            <div className="h-4 w-72 max-w-full rounded-md bg-base-300" />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="h-5 w-32 rounded-md bg-base-300" />
                  <div className="h-11 w-11 rounded-xl bg-base-300" />
                </div>

                <div className="mt-5 h-9 w-36 rounded-lg bg-base-300" />
                <div className="mt-3 h-4 w-44 max-w-full rounded-md bg-base-300" />
              </div>
            ))}
          </div>
        </section>

        {/* Market Prices Table Skeleton */}
        <section className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
          <div className="space-y-3 border-b border-base-300 p-5 sm:p-6">
            <div className="h-7 w-64 max-w-full rounded-lg bg-base-300" />
            <div className="h-4 w-80 max-w-full rounded-md bg-base-300" />
          </div>

          <div className="overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 bg-base-200 p-4 sm:grid-cols-5">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className={`h-4 rounded-md bg-base-300 ${
                    item > 3 ? "hidden sm:block" : ""
                  }`}
                />
              ))}
            </div>

            {/* Table Rows */}
            {[1, 2, 3, 4, 5, 6].map((row) => (
              <div
                key={row}
                className="grid grid-cols-3 items-center gap-4 border-t border-base-300 p-4 sm:grid-cols-5"
              >
                <div className="space-y-2">
                  <div className="h-4 w-full max-w-32 rounded-md bg-base-300" />
                  <div className="h-3 w-16 rounded-md bg-base-300" />
                </div>

                <div className="h-4 w-20 rounded-md bg-base-300" />
                <div className="h-4 w-16 rounded-md bg-base-300" />

                <div className="hidden h-4 w-16 rounded-md bg-base-300 sm:block" />
                <div className="hidden h-4 w-16 rounded-md bg-base-300 sm:block" />
              </div>
            ))}
          </div>

          <div className="border-t border-base-300 p-5">
            <div className="h-3 w-72 max-w-full rounded-md bg-base-300" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsLoading;
