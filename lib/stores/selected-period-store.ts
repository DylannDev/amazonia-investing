import { create } from "zustand";

interface SelectedPeriodState {
  selectedMonth: number;
  selectedYear: number;
  selectedWeekNumber: number;
}

interface SelectedPeriodActions {
  setPeriod: (period: SelectedPeriodState) => void;
  resetPeriod: () => void;
}

type SelectedPeriodStore = SelectedPeriodState & SelectedPeriodActions;

const initialState: SelectedPeriodState = {
  // 0 signifie "non sélectionné"
  selectedMonth: 0,
  selectedYear: 0,
  selectedWeekNumber: 0,
};

export const useSelectedPeriodStore = create<SelectedPeriodStore>((set) => ({
  ...initialState,
  setPeriod: (period) => set(period),
  resetPeriod: () => set(initialState),
}));
