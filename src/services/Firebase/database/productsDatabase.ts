import type { CartModel, ProductModel } from "../../../models";
import type { FirebaseError } from "firebase/app";
import type { User } from "firebase/auth";
import { handleFirebaseError } from "../../../utils";
import { PRODUCTS_COLLECTION } from "../../../constants";
import { onSnapshot, collection, setDoc, doc, deleteDoc, firestore, query, documentId, where, getDocs } from "../firestoreExports";
import { reauthenticateWithCredential, EmailAuthProvider } from "../authExports";

export const subscribeToProducts = (
  onUpdate: (products: ProductModel[]) => void,
  onError: (error: FirebaseError) => void
) => {
  const unsubscribe = onSnapshot(
    collection(firestore, PRODUCTS_COLLECTION),
    (snapshot) => {
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductModel[];
      onUpdate(products);
    },
    (error) => {
      if (onError) onError(error);
    }
  );
  return unsubscribe;
};

export const addProduct = async (product: ProductModel): Promise<string> => {
  try {
    await setDoc(
      doc(firestore, `${PRODUCTS_COLLECTION}/${product.id}`),
      product
    );
    return "Product added successfully.";
  } catch (error) {
    return handleFirebaseError((error as FirebaseError).code);
  }
};

export const deleteProduct = async (
  id: string,
  email: string,
  password: string,
  user: User
): Promise<string> => {
  try {
    await reauthenticateWithCredential(
      user,
      EmailAuthProvider.credential(email, password)
    );
    await deleteDoc(doc(firestore, `${PRODUCTS_COLLECTION}/${id}`));
    return "Product successfully deleted.";
  } catch (error) {
    return handleFirebaseError((error as FirebaseError).code);
  }
};

export const updateProduct = async (product: ProductModel): Promise<string> => {
  try {
    await setDoc(
      doc(firestore, `${PRODUCTS_COLLECTION}/${product.id}`),
      product,
      { merge: true }
    );
    return "Product updated successfully.";
  } catch (error) {
    if (error instanceof Error) {
      return handleFirebaseError((error as Error).message);
    } else {
      return handleFirebaseError((error as FirebaseError).code);
    }
  }
};

export const getProductById = async (cart: CartModel) => {
  const uids = cart.products.map((p) => p.uidProduct);
  const chunks = [];
  for (let i = 0; i < uids.length; i += 10) {
    chunks.push(uids.slice(i, i + 10));
  }
  const promises = chunks.map((batchIds) => {
    const q = query(
      collection(firestore, PRODUCTS_COLLECTION),
      where(documentId(), "in", batchIds)
    );
    return getDocs(q);
  });
  const snapshots = await Promise.all(promises);
  return snapshots.flatMap((snap) =>
    snap.docs.map((d) => ({ ...d.data() }))
  ) as ProductModel[];
};
