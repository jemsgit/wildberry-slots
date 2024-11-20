import { Slot } from "../models/slot";
import { SlotWatcher } from "../models/slot-watcher";

import addSound from "../sounds/added.mp3";

const audioAdded = new Audio(addSound);
audioAdded.volume = 0.4;

const wbPage =
  "https://seller.wildberries.ru/supplies-management/new-supply/choose-date?preorderID=";

export function checkSlots(
  slots: Slot[],
  target: SlotWatcher | null,
  autoopenLink: boolean,
  playOpenSound: boolean
) {
  if (target) {
    const gotcha = slots.find(
      (item) =>
        item.boxTypeId === target.boxTypeId &&
        item.id === target.warehouseId &&
        !item.endTime
    );
    if (gotcha) {
      try {
        playOpenSound && audioAdded.play();
        autoopenLink && window.open(`${wbPage}${target.sell}`, "_blank");
      } catch (e) {
        console.log(e);
      }
      return true;
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
    const gotcha =
      slot.boxTypeId === target.boxTypeId &&
      slot.id === target.warehouseId &&
      !slot.endTime &&
      slot.startTime;

    if (gotcha) {
      try {
        playOpenSound && audioAdded.play();
        autoopenLink && window.open(`${wbPage}${target.sell}`, "_blank");
      } catch (e) {
        console.log(e);
      }
      return true;
    }
    return false;
  }
  return false;
}
