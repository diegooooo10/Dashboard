import { useEffect, useState } from "react";
import { subscribeToProducts } from "../../services";
import type { ProductModel } from "../../models";
import { CircleLoader } from "../Loaders";
import { IconProduct } from "../Icons";
import { ProductCard } from "./ProductCard";
import { useAuthStore } from "../../store";
import { getFilteredProducts, handleFirebaseError } from "../../utils";
import type { ProductsFiltersType } from "../../types";
import { ProductsFilters } from "./ProductsFilters";

export const Products = () => {
  const [allProducts, setAllProducts] = useState<ProductModel[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
  const [productFilter, setProductFilter] = useState<ProductsFiltersType>({
    category: "Default",
    title: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { rol } = useAuthStore((state) => state.userConfiguration);

  useEffect(() => {
    const unsubscribe = subscribeToProducts(
      (products) => {
        setAllProducts(products);
        setFilteredProducts(products);
        setIsLoading(false);
      },
      (error) => {
        setError(handleFirebaseError(error.code));
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setFilteredProducts(getFilteredProducts(allProducts, productFilter));
  }, [productFilter, allProducts]);
  
  return (
    <article
      className="mt-[5.05rem] py-3 px-6 text-text dark:text-text-dark h-[calc(100dvh-5.05rem)]"
    >
      <header className="mb-4 flex lg:flex-row flex-col lg:justify-between lg:items-center gap-4">
        <div>
          <h2 className="font-bold text-2xl">Products</h2>
          <p className="text-text-secondary dark:text-text-secondary-dark md:text-base text-sm">
            {rol === "admin" || rol === "manager"
              ? "Manage and browse your products."
              : "Browse all available products."}
          </p>
        </div>
        <ProductsFilters
          rol={rol}
          productFilter={productFilter}
          setProductFilter={setProductFilter}
        />
      </header>
      {isLoading && <CircleLoader />}
      {!isLoading && error !== "" && (
        <p className="text-lg text-error dark:text-error-dark font-semibold text-center">
          {error}
        </p>
      )}
      {!isLoading && error === "" && filteredProducts.length < 1 && (
        <div className="text-text-secondary dark:text-text-secondary-dark grid grid-rows-[1fr_auto_auto_1fr] gap-2 lg:h-[calc(100%-5.05rem)] md:h-[calc(100%-14rem)] h-[calc(100%-12.05rem)] place-items-center">
          <IconProduct size={60} className="row-start-2" />
          <span className="font-semibold text-lg text-center text-pretty row-start-3">
            No products available at the moment.
          </span>
        </div>
      )}

      {filteredProducts.length > 0 && !isLoading && error === "" && (
        <section className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isAdmin={rol === "admin" || rol === "manager"}
            />
          ))}
        </section>
      )}
    </article>
  );
};
