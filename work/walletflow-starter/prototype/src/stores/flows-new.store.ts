import { create } from 'zustand';

interface FlowsNewStore {
  step: number;
  name: string;
  sender: string;
  token: string;
  amountCondition: string;
  setStep: (step: number) => void;
  setName: (name: string) => void;
  setSender: (sender: string) => void;
  setToken: (token: string) => void;
  setAmountCondition: (cond: string) => void;
  reset: () => void;
}

export const useFlowsNewStore = create<FlowsNewStore>((set) => ({
  step: 1,
  name: '',
  sender: '',
  token: 'USDC',
  amountCondition: 'Any Amount',
  setStep: (step) => set({ step }),
  setName: (name) => set({ name }),
  setSender: (sender) => set({ sender }),
  setToken: (token) => set({ token }),
  setAmountCondition: (amountCondition) => set({ amountCondition }),
  reset: () => set({ step: 1, name: '', sender: '', token: 'USDC', amountCondition: 'Any Amount' }),
}));
