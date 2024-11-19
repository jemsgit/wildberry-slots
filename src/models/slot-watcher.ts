import { Slot } from "./slot";

export type SlotWatcher = Pick<
  Slot,
  "boxTypeId" | "boxType" | "id" | "name"
> & {
  sell: string;
};
