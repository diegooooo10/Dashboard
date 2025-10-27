import type { ProductModel } from "../../models";
import { updateProductCart } from "../../services";
import {
  useAuthStore,
  useCurrentProductStore,
  useModalStore,
} from "../../store";
import { ImageLazy } from "../Common";
import { IconPencil, IconShoppingCart, IconTrash } from "../Icons";
import { showToast } from "../ShowToast";

type ProductCardProps = {
  product: ProductModel;
  isAdmin: boolean;
};

export const ProductCard = ({ product, isAdmin }: ProductCardProps) => {
  const changeModal = useModalStore((state) => state.changeModal);
  const { setProduct } = useCurrentProductStore();
  const user = useAuthStore((state) => state.user);

  const addToCart = async () => {
    if (!user) return;
    const message = await updateProductCart({ uid: user.uid, product });
    showToast(message);
  };

  const stockStatusHigh = "dark:bg-success-dark/50  bg-green-700";
  const stockStatusMedium = "bg-orange-800 dark:bg-warning-dark/30";
  const stockStatusLow = "bg-error dark:bg-error-dark/50";

  const getStockInfo = (stock: number) => {
    if (stock > 3)
      return {
        text: `${stock} units available`,
        classes: stockStatusHigh,
      };
    if (stock > 0)
      return {
        text: `${stock} units available`,
        classes: stockStatusMedium,
      };
    return { text: "Out of stock", subText: "", classes: stockStatusLow };
  };

  const stockInfo = getStockInfo(product.stock);

  return (
    <article className="card flex flex-col">
      <ImageLazy
        src={product.thumbnail}
        alt={product.title}
        className="rounded-t-md border-b border-border dark:border-border-dark w-full aspect-video"
      />

      <header className="px-5 gap-2 my-4 flex flex-col">
        <div className="grid md:grid-cols-[1fr_auto] gap-2">
          <h2 className="font-bold text-lg sm:text-base line-clamp-2 text-pretty">
            {product.title}
          </h2>
          <span className="text-xs bg-primary dark:bg-primary-dark text-text-dark rounded-md w-fit px-2 py-1">
            {product.category}
          </span>
        </div>

        <p className="text-secondary dark:text-text-secondary-dark text-sm line-clamp-2">
          {product.description}
        </p>
      </header>
      <section className="flex justify-between px-5">
        <span className="font-medium text-base sm:text-sm">
          ${product.price}
        </span>
        <div className="flex flex-col items-end">
          <span
            className={`text-xs rounded-md px-2 py-1 text-text-dark ${stockInfo.classes}`}
          >
            {stockInfo.text}
          </span>
        </div>
      </section>

      <footer className="px-5 grid grid-cols-[1fr_auto] gap-2 my-4 ">
        <button
          onClick={addToCart}
          disabled={product.stock === 0}
          className="button disabled-button flex items-center justify-center gap-2 "
          aria-label={`Add ${product.title} to cart`}
        >
          <IconShoppingCart size={16} />
          {product.stock > 0 ? "Add to Cart" : "Out of stock"}
        </button>
        {isAdmin && (
          <nav className="flex gap-2">
            <button
              className=" bg-error dark:bg-red-800 hover:bg-red-900 px-2 rounded-md text-text-dark flex items-center justify-center cursor-pointer transition-theme"
              onClick={() => {
                setProduct(product);
                changeModal("confirmPasswordDeleteProduct");
              }}
              aria-label={`Delete ${product.title}`}
            >
              <IconTrash size={14} />
            </button>

            <button
              className="bg-green-700 hover:bg-green-800  px-2 rounded-md text-text-dark flex items-center justify-center cursor-pointer transition-theme"
              onClick={() => {
                setProduct(product);
                changeModal("modifiedProduct");
              }}
              aria-label={`Edit ${product.title}`}
            >
              <IconPencil size={14} />
            </button>
          </nav>
        )}
      </footer>
    </article>
  );
};
