import { Slot, SlotDTO } from "../models/slot";

export const slotMapper = (item: SlotDTO): Slot => ({
  id: item.warehouseID,
  name: item.warehouseName,
  startTime: item.openedAt ? new Date(item.openedAt) : undefined,
  endTime: item.closedAt ? new Date(item.closedAt) : undefined,
  boxType: item.boxTypeName,
  score: item.coefficient,
  closed: !!item.closedAt,
});
