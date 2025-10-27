import type { HistoryModel } from "../models";

export type HistoryState = {
  currentHistory: HistoryModel[];
  setCurrentHistory: (history: HistoryModel[]) => void;
};
