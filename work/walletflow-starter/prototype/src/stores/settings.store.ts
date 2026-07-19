import { create } from 'zustand';

interface SettingsStore {
  isExecutionEnabled: boolean;
  gasStrategy: string;
  notifications: {
    paymentReceived: boolean;
    flowExecuted: boolean;
    executionFailed: boolean;
  };
  themeMode: 'Dark' | 'Light';
  textureOverlay: boolean;
  setExecutionEnabled: (val: boolean) => void;
  setGasStrategy: (val: string) => void;
  setNotification: (key: 'paymentReceived' | 'flowExecuted' | 'executionFailed', val: boolean) => void;
  setThemeMode: (mode: 'Dark' | 'Light') => void;
  setTextureOverlay: (val: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  isExecutionEnabled: true,
  gasStrategy: 'Balanced (Priority)',
  notifications: {
    paymentReceived: true,
    flowExecuted: true,
    executionFailed: true,
  },
  themeMode: 'Dark',
  textureOverlay: true,
  setExecutionEnabled: (isExecutionEnabled) => set({ isExecutionEnabled }),
  setGasStrategy: (gasStrategy) => set({ gasStrategy }),
  setNotification: (key, val) => set((state) => ({
    notifications: { ...state.notifications, [key]: val }
  })),
  setThemeMode: (themeMode) => set({ themeMode }),
  setTextureOverlay: (textureOverlay) => set({ textureOverlay }),
}));
