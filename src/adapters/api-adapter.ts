import fetcher from "../lib/fetcher";

export const slotsAdapter = {
  getSlots: () => {
    try {
      let data = fetcher.get("/api/slots");
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
