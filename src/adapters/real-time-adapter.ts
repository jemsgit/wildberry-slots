import { Slot, SlotDTO, SlotUpdates } from "../models/slot";
import realTimeUpdater from "../lib/real-time-updater";
import { slotMapper } from "./slot-mapper";

export const realTimeSlotsAdapter = {
  subscribe: (cb: (type: string, data: Slot[] | Slot) => void) => {
    const unsubscribe = realTimeUpdater.subscribe((message: SlotUpdates) => {
      const { type, data } = message;
      if (type === "initial") {
        cb("initial", (data as SlotDTO[]).map(slotMapper));
        return;
      }
      if (type === "add") {
        cb("add", slotMapper(data as SlotDTO));
        return;
      }
      if (type === "update") {
        cb("update", slotMapper(data as SlotDTO));
        return;
      }
    });
    return unsubscribe;
  },
};
