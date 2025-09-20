import { create } from "zustand";

interface OnboardingStore {
  step: number;
  goNext: () => void;
  goPrevious: () => void;
}

const useOnboardingStore = create<OnboardingStore>((set) => ({
  step: 1,
  goNext: () => set((state) => ({ step: state.step + 1 })),
  goPrevious: () => set((state) => ({ step: state.step - 1 })),
}));

export default useOnboardingStore;
