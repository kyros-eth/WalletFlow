import { create } from 'zustand';

interface Distribution {
  to: string;
  amount: number;
}

interface HistoryItem {
  id: string;
  sender: string;
  amount: number;
  token: string;
  flow: string;
  hash: string;
  timestamp: string;
  status: string;
  distributions: Distribution[];
}

interface HistoryStore {
  history: HistoryItem[];
  searchQuery: string;
  hasSeeded: boolean;
  init: () => void;
  setSearchQuery: (q: string) => void;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  history: [],
  searchQuery: '',
  hasSeeded: false,
  init: () => set((state) => {
    if (state.hasSeeded) return state;
    const data = window.App?.store;
    return {
      ...state,
      history: data?.history || state.history,
      hasSeeded: true
    };
  }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
