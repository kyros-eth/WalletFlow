import { create } from 'zustand';

interface IndexStore {
  hasSeeded: boolean;
  init: () => void;
}

export const useIndexStore = create<IndexStore>((set) => ({
  hasSeeded: false,
  init: () => set({ hasSeeded: true }),
}));
