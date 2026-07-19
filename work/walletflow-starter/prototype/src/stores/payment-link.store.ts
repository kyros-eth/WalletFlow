import { create } from 'zustand';

interface PaymentLinkStore {
  step: 'IDLE' | 'PAYING' | 'EXECUTING' | 'SUCCESS';
  copied: boolean;
  setStep: (step: 'IDLE' | 'PAYING' | 'EXECUTING' | 'SUCCESS') => void;
  setCopied: (copied: boolean) => void;
}

export const usePaymentLinkStore = create<PaymentLinkStore>((set) => ({
  step: 'IDLE',
  copied: false,
  setStep: (step) => set({ step }),
  setCopied: (copied) => set({ copied }),
}));
