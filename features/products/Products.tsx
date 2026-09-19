
"use client";

import {
  useGetProductsQuery,
} from "@/lib/services/api";

import ProductCard from "@/components/ProductCard";

export default function Products() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery();

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    console.log(error);

    return (
      <div>
        <p>Failed to load products.</p>

        <pre>
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
