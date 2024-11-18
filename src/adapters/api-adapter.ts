import { AxiosResponse } from "axios";
import fetcher from "../lib/fetcher";
import { Slot } from "../models/slot";
import { slotMapper } from "./slot-mapper";
import { Filter, FilterDTO } from "../models/filter";

export const slotsAdapter = {
  getSlots: async (): Promise<Slot[] | undefined> => {
    try {
      let res = await fetcher.get("/acceptances");
      return res.data.map(slotMapper);
    } catch (e) {
      console.log(e);
    }
  },
  getSlotsFilters: async (): Promise<Filter[] | undefined> => {
    try {
      let res = await fetcher.get("/warehouses");
      return res.data.map((filter: FilterDTO) => ({
        id: filter.id,
        name: filter.name,
      }));
    } catch (e) {
      console.log(e);
    }
  },
};
