import store from "../store/store"; // Your Redux store
import { updateSlots, setInitialSlots } from "../store/slotsSlice"; // Redux actions
import { Slot } from "../models/slot";
import { realTimeSlotsAdapter } from "../adapters/real-time-adapter";
import { SlotWatcher } from "../models/slot-watcher";
import {
  checkClosedSlot,
  checkClosedSlots,
  checkSlot,
  checkSlots,
} from "../utils/check-slot";

class RealTimeSlotsService {
  private static instance: RealTimeSlotsService;
  private unsubscribeFn: (() => void) | undefined = undefined;
  private unsubscribeWatcherFn: (() => void) | undefined = undefined;
  private delayedList: Record<string, SlotWatcher> = {};

  private constructor() {}

  static getInstance() {
    if (!RealTimeSlotsService.instance) {
      RealTimeSlotsService.instance = new RealTimeSlotsService();
    }
    return RealTimeSlotsService.instance;
  }

  subscribe() {
    if (!this.unsubscribeFn) {
      this.unsubscribeFn = realTimeSlotsAdapter.subscribe(this.handleUpdate);
      this.unsubscribeWatcherFn = realTimeSlotsAdapter.subscribe(
        this.handleWatcherUpdate
      );
    }
  }

  unsubscribe() {
    if (this.unsubscribeFn) {
      this.unsubscribeFn();
      this.unsubscribeFn = undefined;
    }
    if (this.unsubscribeWatcherFn) {
      this.unsubscribeWatcherFn();
      this.unsubscribeWatcherFn = undefined;
    }
  }

  private handleUpdate = (type: string, update: Slot[] | Slot) => {
    if (type === "initial") {
      store.dispatch(setInitialSlots(update as Slot[]));
    } else if (type === "update") {
      store.dispatch(updateSlots(update as Slot));
    }
  };

  private handleWatcherUpdate = (type: string, update: Slot[] | Slot) => {
    const state = store.getState();
    const slotWatchers = state.watchers.slotWatchers;
    const { autoopenLinkOn, soundOpenOn } = state.settings;
    if (!slotWatchers) {
      return;
    }
    let slotsToDelay: Record<string, SlotWatcher> = {};
    let slotsToClearDelay: string[] = [];
    let delays = Object.keys(this.delayedList);
    let foundList: number[] = [];
    if (type === "initial") {
      slotWatchers.forEach((slotWatcher) => {
        let found = checkSlots(
          update as Slot[],
          slotWatcher,
          autoopenLinkOn,
          soundOpenOn
        );
        if (found) {
          foundList.push(slotWatcher.id);
          if (found !== true) {
            slotsToDelay[found.toString()] = slotWatcher;
          }
        }
      });
      delays.forEach((timeout) => {
        const watcher = this.delayedList[timeout];
        let found = checkClosedSlots(update as Slot[], watcher, timeout);
        if (found) {
          slotsToClearDelay.push(timeout);
        }
      });
    } else if (type === "update") {
      slotWatchers.forEach((slotWatcher) => {
        let found = checkSlot(
          update as Slot,
          slotWatcher,
          autoopenLinkOn,
          soundOpenOn
        );
        if (found) {
          foundList.push(slotWatcher.id);
          if (found !== true) {
            slotsToDelay[found.toString()] = slotWatcher;
          }
        }
      });
      delays.forEach((timeout) => {
        const watcher = this.delayedList[timeout];
        let found = checkClosedSlot(update as Slot, watcher, +timeout);
        if (found) {
          slotsToClearDelay.push(timeout);
        }
      });
    }

    if (slotsToClearDelay.length) {
      slotsToClearDelay.forEach((del) => {
        delete this.delayedList[del];
      });
    }

    if (foundList.length) {
      console.log("matched watchers");
      this.delayedList = { ...this.delayedList, ...slotsToDelay };
    }
  };
}

export const realTimeSlotsService = RealTimeSlotsService.getInstance();
