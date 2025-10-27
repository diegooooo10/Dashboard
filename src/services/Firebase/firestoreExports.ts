import { firebaseApp } from "./firebase";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  onSnapshot,
  runTransaction,
  where,
  query,
  documentId,
  getDocs,
  arrayUnion,
  increment,
} from "firebase/firestore";
export const firestore = getFirestore(firebaseApp);
export {
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  onSnapshot,
  runTransaction,
  documentId,
  where,
  query,
  getDocs,
  arrayUnion,
  increment,
};
