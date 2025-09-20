import { create } from "zustand";

interface OnboardingStore {
  step: number;
  data: {
    jobField: string;
    job: string[];
    region: string;
    health: string;
  };
  goNext: () => void;
  goPrevious: () => void;
  setData: (data: Partial<OnboardingStore["data"]>) => void;
}

const useOnboardingStore = create<OnboardingStore>((set) => ({
  step: 1,
  data: {
    jobField: "",
    job: [],
    region: "서울 전체",
    health: "",
  },
  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  goNext: () => set((state) => ({ step: state.step + 1 })),
  goPrevious: () => set((state) => ({ step: state.step - 1 })),
}));

export default useOnboardingStore;
