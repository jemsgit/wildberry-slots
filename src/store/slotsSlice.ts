import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { slotsAdapter } from "../adapters/api-adapter";
import { Slot } from "../models/slot";
import { Filter as FilterModel } from "../models/filter";

// Define the state shape
interface SlotsState {
  slots: Slot[];
  visibleSlots: Slot[];
  filters: FilterModel[];
  isLoading: boolean;
  filtersIsLoading: boolean;
}

// Initial state
const initialState: SlotsState = {
  slots: [],
  visibleSlots: [],
  filters: [],
  isLoading: false,
  filtersIsLoading: false,
};

// Async thunks for fetching slots and filters
export const fetchSlots = createAsyncThunk("slots/fetchSlots", async () => {
  const response = await slotsAdapter.getSlots();
  return response || [];
});

export const fetchFilters = createAsyncThunk("slots/fetchFilters", async () => {
  const response = await slotsAdapter.getSlotsFilters();
  return response || [];
});

// Slice
const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    setVisibleSlots(state, action: PayloadAction<Slot[]>) {
      state.visibleSlots = action.payload;
    },
    filterSlots(state) {
      const filteredSlots = state.slots.filter((slot: Slot) => {
        console.log(slot.startTime);
        return !slot.closed && slot.startTime;
      });
      state.visibleSlots = filteredSlots;
    },
    setInitialSlots(state, action: PayloadAction<Slot[]>) {
      state.slots = action.payload;
      const filteredSlots = state.slots.filter(
        (slot: Slot) => !slot.closed && slot.startTime
      );
      state.visibleSlots = filteredSlots;
    },
    updateSlots(state, action: PayloadAction<Slot>) {
      const update = action.payload;
      const { warehouseId, boxTypeId, dateFormatted } = update;

      const index = state.slots.findIndex(
        (slot: Slot) =>
          slot.warehouseId === warehouseId &&
          slot.boxTypeId === boxTypeId &&
          slot.dateFormatted === dateFormatted
      );

      if (index >= 0) {
        state.slots[index] = {
          ...state.slots[index],
          ...update,
          ...(update.startTime && !update.endTime ? { closed: false } : {}),
        };
      } else {
        state.slots.unshift(update);
      }
      const filteredSlots = state.slots.filter(
        (slot: Slot) => !slot.closed && slot.startTime
      );
      state.visibleSlots = filteredSlots;
    },
    deleteSlot(state, action: PayloadAction<Slot>) {
      const update = action.payload;
      const { warehouseId, boxTypeId, dateFormatted } = update;
      const slotIndex = state.slots.findIndex(
        (slot) =>
          slot.warehouseId === warehouseId &&
          slot.boxTypeId === boxTypeId &&
          slot.dateFormatted === dateFormatted &&
          slot.endTime
      );
      if (slotIndex >= 0) {
        state.slots[slotIndex] = {
          ...state.slots[slotIndex],
          closed: true,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlots.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSlots.fulfilled, (state, action) => {
        state.slots = action.payload;
        state.isLoading = false;
        const filteredSlots = state.slots.filter(
          (slot: Slot) => !slot.closed && slot.startTime
        );
        state.visibleSlots = filteredSlots;
      })
      .addCase(fetchFilters.pending, (state) => {
        state.filtersIsLoading = true;
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filters = action.payload;
        state.filtersIsLoading = false;
      });
  },
});

export const {
  setVisibleSlots,
  filterSlots,
  setInitialSlots,
  updateSlots,
  deleteSlot,
} = slotsSlice.actions;
export default slotsSlice.reducer;
