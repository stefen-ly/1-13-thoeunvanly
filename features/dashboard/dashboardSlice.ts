import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type DashboardTab =
  | "outline"
  | "past-performance"
  | "key-personnel"
  | "focus-documents";

export interface DashboardState {
  activeTab: DashboardTab;
}

const initialState: DashboardState = {
  activeTab: "outline",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<DashboardTab>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = dashboardSlice.actions;
export default dashboardSlice.reducer;
