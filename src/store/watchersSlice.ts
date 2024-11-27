import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SlotWatcher } from "../models/slot-watcher";

interface WatchersState {
  slotWatchers: SlotWatcher[];
  showNew: boolean;
}

const initialState: WatchersState = {
  slotWatchers: [],
  showNew: false,
};

const watchersSlice = createSlice({
  name: "watchers",
  initialState,
  reducers: {
    saveWatcher(state, action: PayloadAction<SlotWatcher>) {
      const watcher = action.payload;
      const existingIndex = state.slotWatchers.findIndex(
        (w) => w.id === watcher.id
      );
      if (existingIndex >= 0) {
        state.slotWatchers[existingIndex] = watcher;
      } else {
        state.slotWatchers.push(watcher);
      }
    },
    deleteWatcher(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.slotWatchers = state.slotWatchers.filter(
        (watcher) => watcher.id !== id
      );
    },
    updateWatcher(state, action: PayloadAction<SlotWatcher>) {
      const updatedWatcher = action.payload;
      const index = state.slotWatchers.findIndex(
        (w) => w.id === updatedWatcher.id
      );
      if (index >= 0) {
        state.slotWatchers[index] = {
          ...state.slotWatchers[index],
          ...updatedWatcher,
        };
      }
    },
    showNewForm(state, action: PayloadAction<boolean>) {
      state.showNew = action.payload;
    },
  },
});

export const { saveWatcher, deleteWatcher, updateWatcher, showNewForm } =
  watchersSlice.actions;
export default watchersSlice.reducer;
