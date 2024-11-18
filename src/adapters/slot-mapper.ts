import { Slot, SlotDTO } from "../models/slot";

export const slotMapper = (item: SlotDTO): Slot => ({
  id: item.warehouseID,
  name: item.warehouseName,
  startTime: item.openedAt ? new Date(item.openedAt) : undefined,
  endTime: item.closedAt ? new Date(item.closedAt) : undefined,
  boxType: item.boxTypeName,
  boxTypeId: item.boxTypeID,
  score: item.coefficient,
  closed: !!item.closedAt,
  date: item.date,
});
