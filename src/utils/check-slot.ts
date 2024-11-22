import { wbPage } from "../constants/common";
import { Slot } from "../models/slot";
import { SlotWatcher } from "../models/slot-watcher";

import addSound from "../sounds/added.mp3";
import popSound from "../sounds/pop.mp3";

const audioAdded = new Audio(addSound);
audioAdded.volume = 0.4;
const audioPop = new Audio(popSound);

export function checkSlots(
  slots: Slot[],
  target: SlotWatcher | null,
  autoopenLink: boolean,
  playOpenSound: boolean
) {
  if (target) {
    let timeoutId = null;
    const gotcha = slots.find(
      (item) =>
        item.boxTypeId === target.boxTypeId &&
        item.id === target.warehouseId &&
        (!target.date || target.date === item.date) &&
        !item.endTime &&
        item.startTime
    );
    if (gotcha) {
      try {
        playOpenSound && audioAdded.play();
      } catch (e) {
        console.log(e);
      }
      if (autoopenLink) {
        if (!target.delay) {
          window.open(`${wbPage}${target.sell}`, "_blank");
        } else {
          timeoutId = setTimeout(() => {
            try {
              playOpenSound && audioPop.play();
            } catch (e) {
              console.log(e);
            }
            window.open(`${wbPage}${target.sell}`, "_blank");
          }, target.delay * 1000);
        }
      }

      return timeoutId || true;
    }
    return false;
  }
  return false;
}

export function checkSlot(
  slot: Slot,
  target: SlotWatcher | null,
  autoopenLink: boolean,
  playOpenSound: boolean
) {
  if (target) {
    let timeoutId = null;
    const gotcha =
      slot.boxTypeId === target.boxTypeId &&
      slot.id === target.warehouseId &&
      (!target.date || target.date === slot.date) &&
      !slot.endTime &&
      slot.startTime;

    if (gotcha) {
      try {
        playOpenSound && audioAdded.play();
      } catch (e) {
        console.log(e);
      }
      if (autoopenLink) {
        if (!target.delay) {
          window.open(`${wbPage}${target.sell}`, "_blank");
        } else {
          timeoutId = setTimeout(() => {
            try {
              playOpenSound && audioPop.play();
            } catch (e) {
              console.log(e);
            }
            window.open(`${wbPage}${target.sell}`, "_blank");
          }, target.delay * 1000);
        }
      }

      return timeoutId || true;
    }
    return false;
  }
  return false;
}

export function checkClosedSlot(
  slot: Slot,
  target: SlotWatcher,
  timeoutId: number
) {
  if (target) {
    const gotcha =
      slot.boxTypeId === target.boxTypeId &&
      slot.id === target.warehouseId &&
      (!target.date || target.date === slot.date) &&
      slot.endTime;

    if (gotcha) {
      try {
        clearTimeout(+timeoutId);
      } catch (e) {
        console.log(e);
      }
      return true;
    }
    return false;
  }
  return false;
}

export function checkClosedSlots(
  slots: Slot[],
  target: SlotWatcher,
  timeoutId: string
) {
  if (target) {
    const gotcha = slots.find(
      (item) =>
        item.boxTypeId === target.boxTypeId &&
        item.id === target.warehouseId &&
        (!target.date || target.date === item.date) &&
        item.endTime
    );
    if (gotcha) {
      try {
        clearTimeout(+timeoutId);
      } catch (e) {
        console.log(e);
      }
      return true;
    }
    return false;
  }
  return false;
}
