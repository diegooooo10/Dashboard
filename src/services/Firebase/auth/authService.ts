import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  auth,
  onAuthStateChanged,
} from "../authExports";

export const registerUser = async (email: string, password: string) =>
  await createUserWithEmailAndPassword(auth, email, password);

export const loginUser = async (email: string, password: string) =>
  await signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);

export const onAuthChange = (callback: (firebaseUser: User | null) => void) =>
  onAuthStateChanged(auth, callback);

export const initiAuthValues = (
  callback: (currentUser: User | null) => Promise<void>
) => onAuthStateChanged(auth, callback);
