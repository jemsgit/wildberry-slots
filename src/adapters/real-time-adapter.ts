import { SlotUpdates } from "../models/slot";
import realTimeUpdater from "../lib/real-time-updater";

export const realTimeSlotsAdapter = {
  subscribe: (cb: (type: string, data: SlotUpdates["data"]) => void) => {
    const unsubscribe = realTimeUpdater.subscribe((message: SlotUpdates) => {
      const { type, data } = message;
      if (type === "initial") {
        cb("initial", data);
        return;
      }
      if (type === "add") {
        cb("add", data);
        return;
      }
      if (type === "update") {
        cb("update", data);
        return;
      }
    });
    return unsubscribe;
  },
};
