import { create } from 'zustand';

interface Wallet {
  id: string;
  type: string;
  name: string;
  address: string;
  color: string;
  allocation: number;
}

interface WalletsStore {
  wallets: Wallet[];
  hasSeeded: boolean;
  init: () => void;
}

export const useWalletsStore = create<WalletsStore>((set) => ({
  wallets: [],
  hasSeeded: false,
  init: () => set((state) => {
    if (state.hasSeeded) return state;
    const data = window.App?.store;
    return {
      ...state,
      wallets: data?.wallets || state.wallets,
      hasSeeded: true
    };
  }),
}));
