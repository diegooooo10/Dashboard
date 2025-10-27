import type { User } from "firebase/auth";
export type Rol = "user" | "manager" | "admin";
export type UserConfiguration = {
  rol: Rol;
  fullName: string;
  email: string;
  imageProfile: string | File;
  bio: string;
  phoneNumber: string;
  id?: string;
};
export type AuthState = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  initAuth: () => void;
  userConfiguration: UserConfiguration;
  setUserConfiguration: (config: UserConfiguration) => void;
  logout: () => void;
};
