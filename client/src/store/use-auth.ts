import { create } from "zustand";
import { IUser } from "../types";
import axiosIntense from "../http/axios-instence";

type AuthType = {
  userInfo: IUser | null;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setUserInfo: (userInfo: IUser) => void;
  getUserInfo: () => void;
};

const useAuth = create<AuthType>((set) => ({
  userInfo: null,
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  setUserInfo: (userInfo) => set({ userInfo }),

  getUserInfo: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axiosIntense.get("/auth/me");
      set({ userInfo: data.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuth;
