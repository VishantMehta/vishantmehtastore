import { create } from "zustand";
import { persist } from "zustand/middleware";

type DemoModeStore = {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (enabled: boolean) => void;
};

export const useDemoMode = create<DemoModeStore>()(
  persist(
    (set) => ({
      enabled: false,
      toggle: () => set((state) => ({ enabled: !state.enabled })),
      setEnabled: (enabled) => set({ enabled }),
    }),
    {
      name: "demo-mode-storage",
    }
  )
);
