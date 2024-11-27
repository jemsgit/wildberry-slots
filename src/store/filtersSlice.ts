// redux/slices/filterSlice.ts
import { GridFilterModel } from "@mui/x-data-grid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  filter: GridFilterModel;
}

const initialState: FilterState = {
  filter: {
    items: [],
    quickFilterValues: [], // Store selected age filter value
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<GridFilterModel>) {
      state.filter = action.payload;
    },
    setWhTypeFilter(state, action: PayloadAction<string>) {
      let filter = state.filter.items[0];
      if (filter && filter.field === "storeType") {
        filter.operator = "isAnyOf";
        if (filter.value.includes(action.payload)) {
          state.filter.items[0].value = filter.value.filter(
            (it: string) => it !== action.payload
          );
        } else {
          state.filter.items[0].value.push(action.payload);
        }
      } else {
        state.filter.items[0] = {
          field: "storeType",
          operator: "isAnyOf",
          value: [action.payload],
        };
      }
    },
  },
});

export const { setWhTypeFilter, setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
