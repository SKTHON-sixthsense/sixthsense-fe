import { create } from "zustand";

export interface HeaderStore {
  title: string;
  alignTitle: "left" | "center";
  showBackButton: boolean;
  secondaryButton: React.ReactNode | null;
  progress: number | null;
  update: (state: Partial<HeaderStore>) => void;
}

const useHeaderStore = create<HeaderStore>((set) => ({
  title: "",
  alignTitle: "left",
  showBackButton: false,
  secondaryButton: null,
  progress: null,
  update: (state) => set((prev) => ({ ...prev, ...state })),
}));

export default useHeaderStore;
