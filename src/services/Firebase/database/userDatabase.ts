import type { Rol, UserConfiguration } from "../../../types";
import type { User } from "firebase/auth";
import type { FirebaseError } from "firebase/app";
import {
  CART_COLLECTION,
  DASHBOARD_COLLECTION,
  HISTORY_COLLECTION,
  USER_COLLECTION,
} from "../../../constants";
import { loginUser, registerUser } from "../auth";
import { handleFirebaseError } from "../../../utils";
import {
  setDoc,
  doc,
  firestore,
  getDoc,
  deleteDoc,
  collection,
  onSnapshot,
  getDocs,
} from "../firestoreExports";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  deleteUser,
  setPersistence,
  auth,
  browserLocalPersistence,
} from "../authExports";

export const configureProfileDefaults = async (
  userUid: string,
  email: string
) => {
  const userConfiguration: UserConfiguration = {
    email: email,
    rol: "user",
    fullName: email.split("@")[0],
    bio: "",
    imageProfile: "",
    phoneNumber: "",
  };
  await setDoc(
    doc(firestore, `${USER_COLLECTION}/${userUid}`),
    userConfiguration
  );
  return userConfiguration;
};

export const getProfileData = async (
  userUid: string,
  email: string
): Promise<UserConfiguration> => {
  const docSnap = await getDoc(doc(firestore, `${USER_COLLECTION}/${userUid}`));

  if (!docSnap.exists()) {
    return configureProfileDefaults(userUid, email);
  }

  return docSnap.data() as UserConfiguration;
};

export const updateProfileData = async (
  userUid: string,
  newConfiguration: {
    fullName: string;
    phoneNumber: string;
    bio: string;
    imageProfile: string | File;
  }
) => {
  try {
    await setDoc(
      doc(firestore, `${USER_COLLECTION}/${userUid}`),
      newConfiguration,
      { merge: true }
    );
    return "Profile updated successfully.";
  } catch (error) {
    return handleFirebaseError((error as FirebaseError).code);
  }
};

export const updatePasswordUser = async (
  values: { currentPassword: string; newPassword: string },
  email: string,
  user: User
): Promise<string> => {
  try {
    const credential = EmailAuthProvider.credential(
      email,
      values.currentPassword
    );
    await reauthenticateWithCredential(user, credential);
    if (values.currentPassword === values.newPassword) {
      throw new Error(
        "The new password cannot be the same as the current one."
      );
    } else {
      await updatePassword(user, values.newPassword);
    }
    return "Password updated successfully";
  } catch (error) {
    if (error instanceof Error) {
      return handleFirebaseError((error as Error).message);
    } else {
      return handleFirebaseError((error as FirebaseError).code);
    }
  }
};

export const deleteUserAndData = async (
  user: User,
  email: string,
  confirmPassword: string
) => {
  try {
    const credential = EmailAuthProvider.credential(email, confirmPassword);
    await reauthenticateWithCredential(user, credential);
    await deleteDoc(doc(firestore, `${USER_COLLECTION}/${user.uid}`));

    const historyRef = collection(firestore, HISTORY_COLLECTION(user.uid));
    const historySnapshot = await getDocs(historyRef);
    for (const docSnap of historySnapshot.docs) {
      await deleteDoc(docSnap.ref);
    }

    await deleteDoc(doc(firestore, `${DASHBOARD_COLLECTION(user.uid)}`));
    await deleteDoc(doc(firestore, `${CART_COLLECTION(user.uid)}`));
    await deleteUser(user);
    return "User deleted successfully.";
  } catch (error) {
    console.log(error);
    return handleFirebaseError((error as FirebaseError).code);
  }
};

export const AuthUser = async (
  isRegistered: boolean,
  email: string,
  password: string,
  setUserConfiguration: (config: UserConfiguration) => void
): Promise<string> => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    let user;
    if (isRegistered) {
      user = (await loginUser(email, password)).user;
    } else {
      user = (await registerUser(email, password)).user;
      await configureProfileDefaults(user.uid, email);
    }

    const config = await getProfileData(user.uid, email);
    setUserConfiguration(config);

    return isRegistered
      ? "User successfully logged in"
      : "User successfully registered";
  } catch (error) {
    return handleFirebaseError((error as FirebaseError).code);
  }
};

export const subscribeToUsers = (
  onUpdate: (data: UserConfiguration[]) => void,
  onError: (error: FirebaseError) => void
) => {
  const unsubscribe = onSnapshot(
    collection(firestore, USER_COLLECTION),
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      onUpdate(data as UserConfiguration[]);
    },
    (error) => {
      if (onError) onError(error);
    }
  );
  return unsubscribe;
};

export const changeUserRol = async (newRol: Rol, uid: string) => {
  try {
    setDoc(
      doc(firestore, `${USER_COLLECTION}/${uid}`),
      { rol: newRol },
      { merge: true }
    );
    return "Role updated successfully.";
  } catch (error) {
    return handleFirebaseError((error as FirebaseError).code);
  }
};
