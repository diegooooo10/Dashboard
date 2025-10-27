import { useEffect, useState } from "react";
import { subscribeToHistory } from "../../services";
import type { HistoryModel } from "../../models";
import { useAuthStore } from "../../store";
import { handleFirebaseError } from "../../utils";
import { CircleLoader } from "../Loaders";
import { IconHistory } from "../Icons";
import { HistoryCard } from "./HistoryCard";

export const History = () => {
  const [history, setHistory] = useState<HistoryModel[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    if (!user?.uid) return;
    subscribeToHistory(
      user.uid,
      (historyData) => {
        setHistory(historyData);
        setIsLoading(false);
      },
      (error) => {
        setError(handleFirebaseError(error.code));
        setIsLoading(false);
      }
    );
  }, [user?.uid]);

  return (
    <article className="mt-[5.05rem] px-6 py-3 text-text dark:text-text-dark h-[calc(100dvh-5.05rem)]">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">History</h2>
        <p className="text-text-secondary dark:text-text-secondary-dark md:text-base text-sm">
          Review your past orders and purchases.
        </p>
      </header>
      {isLoading && <CircleLoader />}
      {!isLoading && error !== "" && (
        <p className="text-lg text-error dark:text-error-dark font-semibold text-center">
          {error}
        </p>
      )}
      {!isLoading && error === "" && history.length < 1 && (
        <div className="text-text-secondary dark:text-text-secondary-dark grid grid-rows-[1fr_auto_auto_1fr] gap-2 lg:h-[calc(100%-5.05rem)] md:h-[calc(100%-14rem)] h-[calc(100%-12.05rem)] place-items-center">
          <IconHistory size={60} className="row-start-2" />
          <span className="font-semibold text-lg text-center text-pretty row-start-3">
            No purchase history available.
          </span>
        </div>
      )}
      {history.length > 0 && !isLoading && error === "" && (
        <section className="grid gap-4 mx-auto max-w-7xl">
          {history.map((historyItem, idx) => (
            <HistoryCard historyItem={historyItem} key={idx} />
          ))}
        </section>
      )}
    </article>
  );
};
