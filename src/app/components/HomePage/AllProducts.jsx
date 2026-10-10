

import AllProductsClient from "./AllProductsClient";

const AllProducts = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/bazardor/products`,
  );

  if (!res.ok) {
    throw new Error(`Products API Error: ${res.status}`);
  }

  const data = await res.json();

  return (
    <section id="সব-পণ্য" className="bg-base-100">
      <div className="container mx-auto px-4 py-10 sm:py-12 lg:py-16">
        {/* All Products Header, Sort Options & Products Grid */}
        <AllProductsClient data={data} />
      </div>
    </section>
  );
};

export default AllProducts;
