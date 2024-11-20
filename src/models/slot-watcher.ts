import { Slot } from "./slot";

export type SlotWatcher = Pick<Slot, "boxTypeId" | "boxType" | "name"> & {
  sell: string;
  warehouseId: number;
  id: number;
};
