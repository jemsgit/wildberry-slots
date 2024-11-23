import { Slot, SlotDTO } from "../models/slot";
import { dateToFormat } from "../utils/date-utils";

export const slotMapper = (item: SlotDTO): Slot => ({
  id: item.warehouseID,
  name: item.warehouseName,
  startTime: item.openedAt
    ? new Date(item.openedAt.replace("Z", ""))
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
