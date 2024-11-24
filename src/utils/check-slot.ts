import { wbPage } from "../constants/common";
import { Slot } from "../models/slot";
import { SlotWatcher } from "../models/slot-watcher";

import addSound from "../sounds/added.mp3";
import popSound from "../sounds/pop.mp3";

const audioAdded = new Audio(addSound);
audioAdded.volume = 0.4;
const audioPop = new Audio(popSound);

function processMatchedSlot(
  target: SlotWatcher,
  autoopenLink: boolean,
  playOpenSound: boolean
) {
  let timeoutId = null;
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

const isSlotMatchWatcher = (slot: Slot, watcher: SlotWatcher) =>
  slot.boxTypeId === watcher.boxTypeId &&
  slot.warehouseId === watcher.warehouseId &&
  (!watcher.date || watcher.date.getTime() <= slot.date.getTime()) &&
  !slot.endTime &&
  slot.startTime;

export function checkSlots(
  slots: Slot[],
  target: SlotWatcher | null,
  autoopenLink: boolean,
  playOpenSound: boolean
) {
  if (target) {
    const gotcha = slots.find((item) => isSlotMatchWatcher(item, target));
    if (gotcha) {
      return processMatchedSlot(target, autoopenLink, playOpenSound);
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
    const gotcha = isSlotMatchWatcher(slot, target);

    if (gotcha) {
      return processMatchedSlot(target, autoopenLink, playOpenSound);
    }
    return false;
  }
  return false;
}

const isClosedSlotMatchWatcher = (slot: Slot, watcher: SlotWatcher) =>
  slot.boxTypeId === watcher.boxTypeId &&
  slot.warehouseId === watcher.warehouseId &&
  (!watcher.date || watcher.date.getTime() <= slot.date.getTime()) &&
  slot.endTime;

export function checkClosedSlot(
  slot: Slot,
  target: SlotWatcher,
  timeoutId: number
) {
  if (target) {
    const gotcha = isClosedSlotMatchWatcher(slot, target);

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
    const gotcha = slots.find((item) => isClosedSlotMatchWatcher(item, target));
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
