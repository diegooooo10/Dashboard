import type { FirebaseError } from "firebase/app";
import type { DashboardModel } from "../../../models";
import { firestore, onSnapshot, doc } from "../firestoreExports";
import { DASHBOARD_COLLECTION } from "../../../constants";

export const subscribeToDashboard = (
  uid: string,
  onUpdate: (dashboard: DashboardModel) => void,
  onError: (error: FirebaseError) => void
) => {
  const unsubscribe = onSnapshot(
    doc(firestore, DASHBOARD_COLLECTION(uid)),
    (snapshot) => {
      if (snapshot.exists()) {
        onUpdate(snapshot.data() as DashboardModel);
      } else {
        onUpdate({
          products: 0,
          salesOverview: [],
          totalRevenue: 0,
          totalSales: 0,
        });
      }
    },
    (error) => {
      if (onError) onError(error);
    }
  );
  return unsubscribe;
};
