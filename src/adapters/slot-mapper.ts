import { Slot, SlotDTO } from "../models/slot";
import { dateToFormat } from "../utils/date-utils";

export const slotMapper = (item: SlotDTO): Slot => ({
  warehouseId: item.warehouseID,
  id: `${item.warehouseID}-${item.boxTypeID}-${dateToFormat(
    new Date(item.date.replace("Z", "")),
    "DD.MM.YYYY"
  )}`,
  name: item.warehouseName,
  storeType: item.storeType,
  startTime: item.openedAt
    ? new Date(item.openedAt.replace("Z", ""))
    : undefined,
  startTimeFormatted: item.openedAt
    ? dateToFormat(new Date(item.openedAt.replace("Z", "")), "DD.MM.YYYY HH:mm")
    : undefined,
  endTime: item.closedAt ? new Date(item.closedAt.replace("Z", "")) : undefined,
  boxType: item.boxTypeName,
  boxTypeId: item.boxTypeID,
  score: item.coefficient ?? -1,
  date: new Date(item.date.replace("Z", "")),
  dateFormatted: dateToFormat(
    new Date(item.date.replace("Z", "")),
    "DD.MM.YYYY"
  ),
});
