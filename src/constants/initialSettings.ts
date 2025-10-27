import type { Settings } from "../types";
import { getDataFromLocalstorage } from "../utils";
import { SETTINGS_KEY, THEME_KEY } from "./keys";

const dataLocalstorage = getDataFromLocalstorage<Settings>(SETTINGS_KEY);
const storedTheme = dataLocalstorage?.theme ?? "system";

const resolvedTheme =
  storedTheme === "system" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : storedTheme;

document.body.setAttribute(THEME_KEY, resolvedTheme);

export const initialSettings: Settings = {
  emailNotifications: dataLocalstorage?.emailNotifications ?? false,
  marketingNotifications: dataLocalstorage?.marketingNotifications ?? false,
  pushNotifications: dataLocalstorage?.pushNotifications ?? false,
  twoFactorAuth: dataLocalstorage?.twoFactorAuth ?? false,
  theme: dataLocalstorage?.theme ?? "system",
};
