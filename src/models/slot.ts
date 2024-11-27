export type Slot = {
  startTime?: Date;
  startTimeFormatted?: string;
  endTime?: Date;
  score: number;
  boxType: string;
  boxTypeId: number;
  name: string;
  storeType: string;
  warehouseId: number;
  closed?: boolean;
  date: Date;
  dateFormatted: string;
  id: string;
};

export type SlotDTO = {
  date: string;
  storeType: string;
  coefficient: number;
  warehouseID: number;
  warehouseName: string;
  boxTypeName: string;
  boxTypeID: number;
  openedAt?: string;
  closedAt?: string;
};

type UpdateType = "initial" | "add" | "update";

export type SlotUpdates = {
  type: UpdateType;
  data: object;
};
