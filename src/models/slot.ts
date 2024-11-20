export type Slot = {
  startTime?: Date;
  endTime?: Date;
  score: number;
  boxType: string;
  boxTypeId: number;
  name: string;
  id: number;
  closed?: boolean;
  date: string;
};

export type SlotDTO = {
  date: string;
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
