const CategoryLoading = () => {
  return (
    <section className="min-h-[60vh] bg-base-100">
      <div className="container mx-auto px-4 py-10 sm:py-12 lg:px-6 lg:py-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="skeleton h-12 w-12 shrink-0 rounded-2xl" />

          <div className="space-y-2">
            <div className="skeleton h-7 w-36" />
            <div className="skeleton h-4 w-28" />
          </div>
        </div>

        <div className="mb-7 flex justify-end">
          <div className="skeleton h-12 w-full rounded-xl sm:w-56" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-base-200 p-5"
            >
              <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-2xl" />

                <div className="flex-1 space-y-3">
                  <div className="skeleton h-5 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                  <div className="skeleton h-3 w-1/3" />
                </div>
              </div>

              <div className="mt-5 flex justify-between border-t border-base-200 pt-4">
                <div className="space-y-2">
                  <div className="skeleton h-3 w-16" />
                  <div className="skeleton h-7 w-24" />
                </div>

                <div className="skeleton h-14 w-28 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryLoading;