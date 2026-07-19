import { create } from 'zustand';

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

interface FlowsStore {
  flows: Flow[];
  hasSeeded: boolean;
  init: () => void;
  deleteFlow: (id: string) => void;
  updateFlow: (id: string, updates: Partial<Flow>) => void;
}

export const useFlowsStore = create<FlowsStore>((set) => ({
  flows: [],
  hasSeeded: false,
  init: () => set((state) => {
    if (state.hasSeeded) return state;
    const data = window.App?.store;
    return {
      ...state,
      flows: data?.flows || state.flows,
      hasSeeded: true
    };
  }),
  deleteFlow: (id) => set((state) => ({
    flows: state.flows.filter((f) => f.id !== id)
  })),
  updateFlow: (id, updates) => set((state) => ({
    flows: state.flows.map((f) => f.id === id ? { ...f, ...updates } : f)
  })),
}));
