export type TypeThemes = "system" | "dark" | "light";
export type Settings = {
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingNotifications: boolean;
  twoFactorAuth: boolean;
  theme: TypeThemes;
};
export type SettingsState = {
  settings: Settings;
  changeStateEmailNotifications: () => void;
  changeStatePushNotifications: () => void;
  changeStateMarketingNotifications: () => void;
  changeStateTwoFactorAuth: () => void;
  changeTheme: (theme: TypeThemes) => void;
  resetSettings: () => void;
};
