export type Slot = {
  startTime: string;
  endTime: string;
  score: number;
  location: string;
  name: string;
  id: string;
};

type UpdateType = "initial" | "add" | "update";

export type SlotUpdates = {
  type: UpdateType;
  data: object;
};
