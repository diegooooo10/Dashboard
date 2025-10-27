import { useState } from "react";
import type { CartItemModel } from "../../models";
import { ImageLazy } from "../Common";
import { IconMinus, IconPlus } from "../Icons";
import { updateProductCart } from "../../services";
import { showToast } from "../ShowToast";
import { useAuthStore } from "../../store";

type CartProductProps = {
  cartItem: CartItemModel;
};
export const CartProduct = ({ cartItem }: CartProductProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const updateCart = async (type: "plus" | "minus" = "plus") => {
    if (!user) return;
    setIsLoading(true);
    const message = await updateProductCart({
      uid: user.uid,
      type: type,
      product: cartItem,
    });
    showToast(message);
    setIsLoading(false);
  };
  return (
    <article className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-border dark:border-border-dark text-text dark:text-text-dark pb-4">
      <section className="flex flex-col md:flex-row gap-2">
        <ImageLazy
          alt={`Product Image: ${cartItem.thumbnail}`}
          src={cartItem.thumbnail}
          className="md:h-20 md:w-20 w-full rounded-md md:aspect-square aspect-video"
          height={80}
          width={80}
        />
        <div className="flex md:flex-col max-sm:justify-between max-sm:items-center  gap-1">
          <h2 className="text-lg font-semibold ">{cartItem.title}</h2>
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{`Unit price: $${cartItem.price}`}</p>
        </div>
      </section>

      <section className="flex flex-col items-end gap-2 max-sm:w-full">
        <aside className="flex items-center max-sm:self-center gap-3">
          <button
            className="w-6 h-6 flex items-center disabled-button justify-center rounded-md bg-bg dark:bg-bg-dark dark:hover:bg-bg-card-dark dark:border-border-dark hover:bg-bg-card border border-border p-1 cursor-pointer transition-theme"
            aria-label="Add item product"
            onClick={async () => {
              if (isLoading) return;
              await updateCart();
            }}
          >
            <IconPlus />
          </button>
          <span className="font-semibold text-sm">{cartItem.quantity}</span>
          <button
            className="w-6 h-6 flex items-center disabled-button justify-center rounded-md bg-bg dark:bg-bg-dark dark:hover:bg-bg-card-dark dark:border-border-dark hover:bg-bg-card border border-border p-1 cursor-pointer transition-theme"
            aria-label="Minus item product"
            onClick={async () => {
              if (isLoading) return;
              await updateCart("minus");
            }}
          >
            <IconMinus />
          </button>
        </aside>
        <footer className="text-right">
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{`Subtotal: $${cartItem.finalPrice}`}</p>
        </footer>
      </section>
    </article>
  );
};
