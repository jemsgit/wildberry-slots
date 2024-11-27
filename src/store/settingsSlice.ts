import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  autoopenLinkOn: boolean;
  soundCloseOn: boolean;
  soundOpenOn: boolean;
}

const initialState: SettingsState = {
  autoopenLinkOn: true,
  soundCloseOn: true,
  soundOpenOn: true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleAutoopenLink(state) {
      state.autoopenLinkOn = !state.autoopenLinkOn;
    },
    setAutoopenLink(state, action: PayloadAction<boolean>) {
      state.autoopenLinkOn = action.payload;
    },
    toggleSoundClose(state) {
      state.soundCloseOn = !state.soundCloseOn;
    },
    setSoundClose(state, action: PayloadAction<boolean>) {
      state.soundCloseOn = action.payload;
    },
    toggleSoundOpen(state) {
      state.soundOpenOn = !state.soundOpenOn;
    },
    setSoundOpen(state, action: PayloadAction<boolean>) {
      state.soundOpenOn = action.payload;
    },
  },
});

export const {
  toggleAutoopenLink,
  setAutoopenLink,
  toggleSoundClose,
  setSoundClose,
  toggleSoundOpen,
  setSoundOpen,
} = settingsSlice.actions;

export default settingsSlice.reducer;
