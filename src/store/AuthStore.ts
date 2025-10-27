import { create } from "zustand";
import { getProfileData } from "../services";
import type { AuthState } from "../types";
import { initialConfiguration } from "../constants";
import { initiAuthValues } from "../services";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  userConfiguration: initialConfiguration,
  setUserConfiguration: (userConfiguration) => set({ userConfiguration }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  initAuth: () => {
    initiAuthValues(async (currentUser) => {
      set({ user: currentUser, loading: false });
      if (currentUser && currentUser.uid && currentUser.email) {
        const userConfiguration = await getProfileData(
          currentUser.uid,
          currentUser.email
        );
        set({
          userConfiguration: userConfiguration,
        });
      }
    });
  },
  logout() {
    set({
      user: null,
      userConfiguration: initialConfiguration,
      loading: true,
    });
  },
}));
