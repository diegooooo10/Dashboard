import { create } from "zustand";
import type { Settings, SettingsState } from "../types";
import { initialSettings, SETTINGS_KEY, THEME_KEY } from "../constants";
import { saveDataToLocalstorage } from "../utils";

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: initialSettings,
  changeStateEmailNotifications: () => {
    const prev = get().settings;
    const newValues = { ...prev, emailNotifications: !prev.emailNotifications };
    saveDataToLocalstorage(SETTINGS_KEY, newValues);
    set({
      settings: newValues,
    });
  },
  changeStatePushNotifications: () => {
    const prev = get().settings;
    const newValues: Settings = {
      ...prev,
      pushNotifications: !prev.pushNotifications,
    };
    saveDataToLocalstorage(SETTINGS_KEY, newValues);
    set({
      settings: newValues,
    });
  },
  changeStateMarketingNotifications() {
    const prev = get().settings;
    const newValues = {
      ...prev,
      marketingNotifications: !prev.marketingNotifications,
    };
    saveDataToLocalstorage(SETTINGS_KEY, newValues);
    set({
      settings: newValues,
    });
  },
  changeStateTwoFactorAuth() {
    const prev = get().settings;
    const newValues = { ...prev, twoFactorAuth: !prev.twoFactorAuth };
    saveDataToLocalstorage(SETTINGS_KEY, newValues);
    set({
      settings: newValues,
    });
  },
  changeTheme(theme) {
    const prev = get().settings;
    const newValues = { ...prev, theme };
    const resolvedTheme =
      theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : theme;
    document.body.setAttribute(THEME_KEY, resolvedTheme);
    saveDataToLocalstorage(SETTINGS_KEY, newValues);
    set({ settings: newValues });
  },
  resetSettings() {
    set({ settings: initialSettings });
    localStorage.removeItem(SETTINGS_KEY);
  },
}));
