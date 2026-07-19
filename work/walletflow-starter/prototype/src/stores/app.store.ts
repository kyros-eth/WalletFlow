import { create } from 'zustand';

interface Wallet {
  id: string;
  type: string;
  name: string;
  address: string;
  color: string;
  allocation: number;
}

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

interface Split {
  walletId: string;
  percentage: number;
}

interface Flow {
  id: string;
  name: string;
  sender: string;
  senderAddress: string;
  token: string;
  condition: string;
  status: 'Active' | 'Paused';
  splits: Split[];
}

interface AppStore {
  wallets: Wallet[];
  flows: Flow[];
  history: HistoryItem[];
  stats: {
    totalRouted: string;
    paymentsAutomated: string;
    successfulExecutions: string;
    activeFlows: string;
    executionRate: string;
  };
  addFlow: (flow: Flow) => void;
  updateFlow: (id: string, updates: Partial<Flow>) => void;
  deleteFlow: (id: string) => void;
  init: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  wallets: [],
  flows: [],
  history: [],
  stats: {
    totalRouted: "0",
    paymentsAutomated: "0",
    successfulExecutions: "0",
    activeFlows: "0",
    executionRate: "0%"
  },
  addFlow: (flow) => set((state) => ({ flows: [flow, ...state.flows] })),
  updateFlow: (id, updates) => set((state) => ({
    flows: state.flows.map((f) => f.id === id ? { ...f, ...updates } : f)
  })),
  deleteFlow: (id) => set((state) => ({
    flows: state.flows.filter((f) => f.id !== id)
  })),
  init: () => {
    const data = window.App?.store;
    if (data) {
      set({
        wallets: data.wallets || [],
        flows: data.flows || [],
        history: data.history || [],
        stats: data.stats || {
          totalRouted: "0",
          paymentsAutomated: "0",
          successfulExecutions: "0",
          activeFlows: "0",
          executionRate: "0%"
        }
      });
    }
  }
}));
