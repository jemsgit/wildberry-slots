import { Slot, SlotDTO, SlotUpdates } from "../models/slot";
import realTimeUpdater from "../lib/real-time-updater";
import { slotMapper } from "./slot-mapper";

export const realTimeSlotsAdapter = {
  subscribe: (cb: (type: string, data: Slot[] | Slot) => void) => {
    const unsubscribe = realTimeUpdater.subscribe((message: SlotUpdates) => {
      const { type, data } = message;

      if (type === "initial") {
        cb("initial", (data as SlotDTO[]).map(slotMapper));
        console.log("initial update");
        console.log(new Date());
        console.log(data);
        return;
      }
      if (type === "add") {
        cb("add", slotMapper(data as SlotDTO));
        return;
      }
      if (type === "update") {
        cb("update", slotMapper(data as SlotDTO));
        console.log("update");
        console.log(new Date());
        let { warehouseID, boxTypeID, date } = data as SlotDTO;
        console.log(`${warehouseID} ${boxTypeID} ${date}`);
        console.log(data);
        return;
      }
    });
    return unsubscribe;
  },
};
