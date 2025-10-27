import {
  arrayUnion,
  collection,
  doc,
  firestore,
  increment,
  onSnapshot,
  runTransaction,
} from "../firestoreExports";
import type { CartItemModel, HistoryModel } from "../../../models";
import {
  CART_COLLECTION,
  DASHBOARD_COLLECTION,
  HISTORY_COLLECTION,
} from "../../../constants";
import type { FirebaseError } from "firebase/app";
import { handleFirebaseError } from "../../../utils";
import type { PaymentMethod } from "../../../types";

export const addCartToHistory = async (
  userId: string,
  cartData: CartItemModel[],
  address: string,
  paymentMethod: PaymentMethod
) => {
  try {
    await runTransaction(firestore, async (transaction) => {
      const cartRef = doc(firestore, CART_COLLECTION(userId));
      const cartSnap = await transaction.get(cartRef);
      const dashboardRef = doc(firestore, DASHBOARD_COLLECTION(userId));
      const dashboardSnap = await transaction.get(dashboardRef);

      if (!cartSnap.exists()) throw new Error("Cart is empty");
      const cartFinalPrice = Number(
        cartData.reduce((acc, curr) => acc + curr.finalPrice, 0).toFixed(2)
      );

      const historyRef = doc(collection(firestore, HISTORY_COLLECTION(userId)));
      const historyItem = {
        id: crypto.randomUUID(),
        address,
        paymentMethod,
        Cart: cartData,
        date: new Date().toLocaleDateString("en-US"),
        totalPrice: cartFinalPrice,
      };

      if (!dashboardSnap.exists()) {
        transaction.set(dashboardRef, {
          totalRevenue: cartFinalPrice,
          totalSales: 1,
          products: cartData.length,
          salesOverview: [
            {
              totalPrice: historyItem.totalPrice,
              Cart: historyItem.Cart,
              date: historyItem.date,
            },
          ],
        });
      } else {
        transaction.update(dashboardRef, {
          totalRevenue: increment(cartFinalPrice),
          totalSales: increment(1),
          products: increment(cartData.length),
          salesOverview: arrayUnion({
            totalPrice: historyItem.totalPrice,
            Cart: historyItem.Cart,
            date: historyItem.date,
          }),
        });
      }

      transaction.set(historyRef, historyItem);
      transaction.delete(cartRef);
    });
    return "Cart moved to history successfully.";
  } catch (error) {
    return handleFirebaseError((error as FirebaseError).code);
  }
};

export const subscribeToHistory = (
  userId: string,
  onUpdate: (history: HistoryModel[]) => void,
  onError: (error: FirebaseError) => void
) => {
  const unsubscribe = onSnapshot(
    collection(firestore, HISTORY_COLLECTION(userId)),
    (snapshot) =>
      onUpdate(snapshot.docs.map((doc) => doc.data() as HistoryModel)),
    (error) => {
      if (onError) onError(error);
    }
  );
  return unsubscribe;
};
