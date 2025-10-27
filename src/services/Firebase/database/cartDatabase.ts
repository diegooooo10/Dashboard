import { CART_COLLECTION, PRODUCTS_COLLECTION } from "../../../constants";
import type { CartModel, ProductModel } from "../../../models";
import type { FirebaseError } from "firebase/app";
import { handleFirebaseError } from "../../../utils";
import {
  firestore,
  doc,
  onSnapshot,
  runTransaction,
} from "../firestoreExports";

export const updateProductCart = async ({
  product,
  type = "plus",
  uid,
}: {
  uid: string;
  type?: "plus" | "minus";
  product: ProductModel;
}) => {
  const cartRef = doc(firestore, CART_COLLECTION(uid));
  const productRef = doc(firestore, `${PRODUCTS_COLLECTION}/${product.id}`);

  try {
    await runTransaction(firestore, async (transaction) => {
      const productSnap = await transaction.get(productRef);
      if (
        !productSnap.exists() ||
        (productSnap.data().stock < 1 && type === "plus")
      )
        throw new Error("Out of stock");

      const cartSnap = await transaction.get(cartRef);
      const cart: CartModel = cartSnap.exists()
        ? (cartSnap.data() as CartModel)
        : { products: [] };

      const existing = cart.products.find((p) => p.uidProduct === product.id);
      if (existing && type === "plus") {
        existing.quantity += 1;
      } else if (existing && type === "minus") {
        if (existing.quantity <= 1) {
          cart.products = cart.products.filter(
            (p) => p.uidProduct !== product.id
          );
        } else {
          existing.quantity -= 1;
        }
      } else {
        cart.products.push({
          uidProduct: product.id,
          quantity: 1,
        });
      }

      transaction.update(productRef, {
        stock:
          type === "plus"
            ? (productSnap.data().stock -= 1)
            : (productSnap.data().stock += 1),
      });
      transaction.set(cartRef, cart, { merge: true });
    });
    if (type === "minus") {
      return "Product removed from cart successfully.";
    } else {
      return "Product added to cart successfully.";
    }
  } catch (error) {
    if (error instanceof Error) {
      return handleFirebaseError((error as Error).message);
    } else {
      return handleFirebaseError((error as FirebaseError).code);
    }
  }
};

export const subscribeToCart = (
  uid: string,
  onUpdate: (cart: CartModel) => void,
  onError?: (error: FirebaseError) => void
) => {
  const unsubscribe = onSnapshot(
    doc(firestore, CART_COLLECTION(uid)),
    (snapshot) => {
      if (snapshot.exists()) {
        onUpdate(snapshot.data() as CartModel);
      } else {
        onUpdate({ products: [] });
      }
    },
    (error) => {
      if (onError) onError(error);
    }
  );
  return unsubscribe;
};
