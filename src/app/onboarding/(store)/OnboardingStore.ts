import { create } from "zustand";

interface OnboardingStore {
  step: number;
  data: {
    jobField: string;
    job: string[];
    region: string;
    health: string[];
  };
  goNext: () => void;
  goPrevious: () => void;
  setData: (data: Partial<OnboardingStore["data"]>) => void;
}

const useOnboardingStore = create<OnboardingStore>((set) => ({
  step: 1,
  data: {
    // 순서 중요
    region: "서울 전체",
    jobField: "",
    job: [],
    health: [],
  },
  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  goNext: () => set((state) => ({ step: state.step + 1 })),
  goPrevious: () => set((state) => ({ step: state.step - 1 })),
}));

export default useOnboardingStore;
