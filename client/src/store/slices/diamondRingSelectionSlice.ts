import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Diamond {
  id?: string | number;
  certificate_no?: string;
  [key: string]: any;
}

interface Setting {
  id?: string | number;
  title?: string;
  [key: string]: any;
}

interface SelectionState {
  diamond: Diamond | null;
  setting: Setting | null;
}

const initialState: SelectionState = {
  diamond: null,
  setting: null,
};

const diamondRingSelectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    selectDiamond(state, action: PayloadAction<Diamond>) {
      const newDiamond = action.payload;
      if (newDiamond?.id || newDiamond?.certificate_no) {
        state.diamond = newDiamond;
        localStorage.setItem(
          "selectedDiamond",
          JSON.stringify(state.diamond)
        );
      }
    },

    removeDiamond(state) {
      state.diamond = null;
      localStorage.removeItem("selectedDiamond");
    },

    selectSetting(state, action: PayloadAction<Setting>) {
      const newSetting = action.payload;
      if (newSetting?.id) {
        state.setting = newSetting;
        localStorage.setItem("selectedSetting", JSON.stringify(state.setting));
      }
    },

    removeSetting(state) {
      state.setting = null;
      localStorage.removeItem("selectedSetting");
    },

    loadSelections(state) {
      const savedDiamond = localStorage.getItem("selectedDiamond");
      const savedSetting = localStorage.getItem("selectedSetting");

      state.diamond = savedDiamond ? JSON.parse(savedDiamond) : null;
      state.setting = savedSetting ? JSON.parse(savedSetting) : null;
    },

    clearSelections(state) {
      state.diamond = null;
      state.setting = null;
      localStorage.removeItem("selectedDiamond");
      localStorage.removeItem("selectedSetting");
    },
  },
});

export const {
  selectDiamond,
  removeDiamond,
  selectSetting,
  removeSetting,
  loadSelections,
  clearSelections,
} = diamondRingSelectionSlice.actions;

export default diamondRingSelectionSlice.reducer;
