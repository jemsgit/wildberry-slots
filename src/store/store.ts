import { configureStore } from "@reduxjs/toolkit";
import slotsReducer from "./slotsSlice";
import settingsReducer from "./settingsSlice";
import watchersReducer from "./watchersSlice";
import filtersReducer from "./filtersSlice";

import slotListenerMiddleware from "./middlewares/slotUpdate";

const store = configureStore({
  reducer: {
    slots: slotsReducer,
    watchers: watchersReducer,
    settings: settingsReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(slotListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
