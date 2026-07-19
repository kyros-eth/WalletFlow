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

interface DashboardStore {
  stats: {
    totalRouted: string;
    paymentsAutomated: string;
    successfulExecutions: string;
    activeFlows: string;
    executionRate: string;
  };
  history: HistoryItem[];
  hasSeeded: boolean;
  init: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: {
    totalRouted: "0",
    paymentsAutomated: "0",
    successfulExecutions: "0",
    activeFlows: "0",
    executionRate: "0%"
  },
  history: [],
  hasSeeded: false,
  init: () => set((state) => {
    if (state.hasSeeded) return state;
    const data = window.App?.store;
    return {
      ...state,
      stats: data?.stats || state.stats,
      history: data?.history || state.history,
      hasSeeded: true
    };
  }),
}));
