import { useEffect, useState } from "react";
import { getProductById, subscribeToCart } from "../../services";
import type { CartItemModel, ProductModel } from "../../models";
import { handleFirebaseError } from "../../utils";
import { useAuthStore, useCurrentCartStore, useModalStore } from "../../store";
import { CircleLoader } from "../Loaders";
import { IconShoppingCart } from "../Icons";
import { CartProduct } from "./CartProduct";

export const Cart = () => {
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const changeModal = useModalStore((state) => state.changeModal);
  const {
    setCurrentCartItemsStore,
    currentCartItemsStore,
    setCurrentCartStore,
  } = useCurrentCartStore();

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = subscribeToCart(
      user.uid,
      (cart) => {
        if (cart.products.length > 0) {
          setCurrentCartStore(cart);
          getProductById(cart).then((products: ProductModel[]) => {
            const cartProducts: CartItemModel[] = products.map((product) => {
              const item = cart.products.find(
                (p) => p.uidProduct === product.id
              );
              return {
                ...product,
                quantity: item ? item.quantity : 1,
                finalPrice: Number(
                  (product.price * (item?.quantity ?? 1)).toFixed(2)
                ),
              };
            });
            setCurrentCartItemsStore(cartProducts);
          });
        }
        setIsLoading(false);
      },
      (error) => {
        setError(handleFirebaseError(error.code));
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid, setCurrentCartItemsStore, setCurrentCartStore]);

  return (
    <article className="mt-[5.05rem] py-3 px-6 text-text dark:text-text-dark h-[calc(100dvh-5.05rem)]">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Cart</h2>
        <p className="text-text-secondary dark:text-text-secondary-dark md:text-base text-sm">
          Review the items in your cart before checkout.
        </p>
      </header>
      {isLoading && <CircleLoader />}
      {!isLoading && error !== "" && (
        <p className="text-lg text-error dark:text-error-dark font-semibold text-center">
          {error}
        </p>
      )}
      {!isLoading && error === "" && currentCartItemsStore.length < 1 && (
        <div className="text-text-secondary dark:text-text-secondary-dark grid grid-rows-[1fr_auto_auto_1fr] gap-2 lg:h-[calc(100%-5.05rem)] md:h-[calc(100%-14rem)] h-[calc(100%-12.05rem)] place-items-center">
          <IconShoppingCart size={60} className="row-start-2"/>
          <span className="font-semibold text-lg text-center text-pretty row-start-3">
            No items in the cart right now.
          </span>
        </div>
      )}
      {currentCartItemsStore.length > 0 && !isLoading && error === "" && (
        <section className="grid gap-4 card p-5 mx-auto max-w-7xl">
          {currentCartItemsStore.map((product) => {
            return <CartProduct key={product.id} cartItem={product} />;
          })}
          <footer className="flex flex-col gap-4">
            <p className="flex justify-between font-semibold text-text dark:text-text-dark">
              <span>Subtotal:</span>
              <span className="text-end ">
                {`$${currentCartItemsStore
                  .reduce((prev, acc) => prev + acc.finalPrice, 0)
                  .toFixed(2)}`}
              </span>
            </p>
            <button
              className="button"
              onClick={() => {
                changeModal("checkout");
              }}
            >
              Buy Now
            </button>
          </footer>
        </section>
      )}
    </article>
  );
};
