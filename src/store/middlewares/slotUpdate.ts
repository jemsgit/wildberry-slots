import { createListenerMiddleware } from "@reduxjs/toolkit";
import { deleteSlot, updateSlots } from "../slotsSlice";
import { Slot } from "../../models/slot";
import { RootState } from "../store";

import sound from "../../sounds/fire.mp3";

const audio = new Audio(sound);
audio.volume = 0.4;
const slotListenerMiddleware = createListenerMiddleware();

slotListenerMiddleware.startListening({
  actionCreator: updateSlots,
  effect: async (action, listenerApi) => {
    const payload = action.payload;

    // Check if it's an update with an `endTime` field
    if (payload.endTime) {
      const { warehouseId, boxTypeId, dateFormatted } = payload;
      const soundCloseOn = (listenerApi.getState() as RootState).settings
        .soundCloseOn;

      setTimeout(() => {
        if (soundCloseOn) {
          try {
            audio.play();
          } catch (e) {
            console.error("Error playing sound:", e);
          }
        }

        listenerApi.dispatch(
          deleteSlot({ warehouseId, boxTypeId, dateFormatted } as Slot)
        );
      }, 1000);
    }
  },
});

export default slotListenerMiddleware;
