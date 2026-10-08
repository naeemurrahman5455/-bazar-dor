import { notFound } from "next/navigation";
import CategoryProductsClient from "./CategoryProductsClient";

const CategoryProducts = async ({ params }) => {
  const { categoryId } = await params;

  let data;

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/bazardor/products?category=${categoryId}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      notFound();
    }

    const response = await res.json();

    data = Array.isArray(response)
      ? response
      : Array.isArray(response.products)
        ? response.products
        : [];
  } catch (error) {
    if (error?.digest?.startsWith("NEXT_HTTP_ERROR_FALLBACK")) {
      throw error;
    }

    console.error("Category API Error:", error);
    notFound();
  }

  if (data.length === 0) {
    notFound();
  }

  return (<div>
     <CategoryProductsClient products={data} />;
  </div>)
 
};

export default CategoryProducts;