import { Slot, SlotUpdates } from "../models/slot";
import realTimeUpdater from "../lib/real-time-updater";

export const realTimeSlotsAdapter = {
  subscribe: (cb: (type: string, data: Slot[] | Slot) => void) => {
    const unsubscribe = realTimeUpdater.subscribe((message: SlotUpdates) => {
      const { type, data } = message;
      if (type === "initial") {
        cb("initial", data as Slot[]);
        return;
      }
      if (type === "add") {
        cb("add", data as Slot);
        return;
      }
      if (type === "update") {
        cb("update", data as Slot);
        return;
      }
    });
    return unsubscribe;
  },
};
