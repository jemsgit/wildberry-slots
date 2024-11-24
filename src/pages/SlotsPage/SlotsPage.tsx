import { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { slotsAdapter } from "../../adapters/api-adapter";
import { realTimeSlotsAdapter } from "../../adapters/real-time-adapter";
import SlotsList from "../../components/SlotsList/SlotsList";
import { Slot } from "../../models/slot";

import { Filter as FilterModel } from "../../models/filter";

import sound from "../../sounds/fire.mp3";

import { SlotWatcher } from "../../models/slot-watcher";
import {
  checkClosedSlot,
  checkClosedSlots,
  checkSlot,
  checkSlots,
} from "../../utils/check-slot";
import Settings from "../../components/Settings/Settings";
import WatcherList from "../../components/WatcherList/WatcherList";
import Tabs from "../../components/Tabs/Tabs";
import Description from "../../components/Description/Description";
import NewWatchSlot from "../../components/NewWatchSlot/NewWatchSlot";

const audio = new Audio(sound);

const filterSlots = (filter: FilterModel[], slots: Slot[]): Slot[] => {
  const filteredByClose = slots.filter(
    (slot) => !slot.closed && slot.startTime
  );
  console.log("fi;tered", filteredByClose.length);
  console.log(filter);
  if (!filter || !filter.length) {
    return filteredByClose;
  }

  const filterCodes = filter.map((item) => item.id);

  return filteredByClose.filter((slot) =>
    filterCodes.includes(slot.warehouseId)
  );
};

function SlotsPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [visibleSlots, setVisibleSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filtersIsLoading, setFiltersIsLoading] = useState(false);
  const [availableOptions, setAvailableOptions] = useState<FilterModel[]>([]);
  const [slotWatchers, setSlotWatchers] = useState<SlotWatcher[]>([]);
  const [autoopenLinkOn, setAutoopenLinkOn] = useState(true);
  const [soundCloseOn, setSoundClose] = useState(true);
  const [soundOpenOn, setSoundOpen] = useState(true);
  const delayedList = useRef<Record<string, SlotWatcher>>({});

  const handleDataUpdate = useCallback(
    (type: string, update: Slot[] | Slot) => {
      if (type === "initial") {
        setSlots(update as Slot[]);
        return;
      }
      if (type === "update") {
        setSlots((slots) => {
          const { warehouseId, boxTypeId, dateFormatted } = update as Slot;
          const updatedSlots = slots.slice();
          let currentSlotIndex = updatedSlots.findIndex(
            (slot) =>
              slot.warehouseId === warehouseId &&
              slot.boxTypeId === boxTypeId &&
              slot.dateFormatted === dateFormatted
          );
          if (currentSlotIndex < 0) {
            return [update as Slot, ...slots];
          }
          let addition = {};
          if ((update as Slot).startTime && !(update as Slot).endTime) {
            addition = {
              closed: false,
            };
          }
          updatedSlots[currentSlotIndex] = {
            ...updatedSlots[currentSlotIndex],
            ...update,
            ...addition,
          };
          return updatedSlots;
        });
      }
    },
    []
  );

  useEffect(() => {
    slotsAdapter
      .getSlotsFilters()
      ?.then((res) => {
        if (res) {
          setAvailableOptions(res);
        }
      })
      .finally(() => {
        setFiltersIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    slotsAdapter
      .getSlots()
      ?.then((res) => {
        if (res) {
          setSlots(res);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = realTimeSlotsAdapter.subscribe(handleDataUpdate);
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [handleDataUpdate]);

  const checkWatcher = useCallback(
    (type: string, update: Slot[] | Slot) => {
      if (!slotWatchers) {
        return;
      }
      let slotsToDelay: Record<string, SlotWatcher> = {};
      let slotsToClearDelay: string[] = [];
      let delays = Object.keys(delayedList.current);
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
          const watcher = delayedList.current[timeout];
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
          const watcher = delayedList.current[timeout];
          let found = checkClosedSlot(update as Slot, watcher, +timeout);
          if (found) {
            slotsToClearDelay.push(timeout);
          }
        });
      }

      if (slotsToClearDelay.length) {
        slotsToClearDelay.forEach((del) => {
          delete delayedList.current[del];
        });
      }

      if (foundList.length) {
        console.log("matched watchers");
        delayedList.current = { ...delayedList.current, ...slotsToDelay };
      }
    },
    [slotWatchers, autoopenLinkOn, soundOpenOn]
  );

  useEffect(() => {
    let unsubscribe = null;
    if (slotWatchers.length) {
      unsubscribe = realTimeSlotsAdapter.subscribe(checkWatcher);
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [slotWatchers.length, checkWatcher]);

  useEffect(() => {
    setVisibleSlots(filterSlots([], slots));
  }, [slots]);

  const onDelete = useCallback(
    (warehouseId: number, boxTypeId: number, dateFormatted: string) => {
      try {
        soundCloseOn && audio.play();
      } catch (e) {
        console.log(e);
      }

      setTimeout(() => {
        setSlots((slots) => {
          const slotIndex = slots.findIndex(
            (slot) =>
              slot.warehouseId === warehouseId &&
              slot.boxTypeId === boxTypeId &&
              slot.dateFormatted === dateFormatted
          );
          console.log(slotIndex);
          if (slotIndex < 0) {
            return slots;
          }
          const newSlots = slots.slice();
          newSlots[slotIndex] = {
            ...newSlots[slotIndex],
            closed: true,
          };
          return newSlots;
        });
      }, 1000);
    },
    [soundCloseOn]
  );

  const handleSaveWatcher = (watcher: SlotWatcher) => {
    setSlotWatchers((prev) => {
      const existingIndex = prev.findIndex((w) => w.id === watcher.id);
      if (existingIndex >= 0) {
        const updatedWatchers = [...prev];
        updatedWatchers[existingIndex] = watcher;
        return updatedWatchers;
      }
      return [...prev, watcher];
    });
  };

  const handleDeleteWatcher = (id: number) => {
    setSlotWatchers((prev) => prev.filter((watcher) => watcher.id !== id));
  };

  const updateWatcher = (watcher: SlotWatcher) => {
    setSlotWatchers((watchers) => {
      let index = watchers.findIndex((w) => w.id === watcher.id);
      if (index > -1) {
        const newWatchers = watchers.slice();
        newWatchers[index] = {
          ...newWatchers[index],
          ...watcher,
        };
        return newWatchers;
      }
      return watchers;
    });
  };

  if (isLoading || filtersIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Description />
      <Tabs
        renderWatcherTab={() => (
          <Box>
            <NewWatchSlot
              warehousesOptions={availableOptions}
              onSave={handleSaveWatcher}
            />
            <WatcherList
              watchers={slotWatchers}
              warehousesOptions={availableOptions}
              onSave={(watcher) => updateWatcher(watcher)}
              onDelete={handleDeleteWatcher}
            />
          </Box>
        )}
        renderSettingsTab={() => (
          <Settings
            autoopenLinkOn={autoopenLinkOn}
            soundCloseOn={soundCloseOn}
            soundOpenOn={soundOpenOn}
            setSoundClose={setSoundClose}
            setSoundOpen={setSoundOpen}
            setAutoopenLink={setAutoopenLinkOn}
          />
        )}
        renderFAQTab={() => (
          <Settings
            autoopenLinkOn={autoopenLinkOn}
            soundCloseOn={soundCloseOn}
            soundOpenOn={soundOpenOn}
            setSoundClose={setSoundClose}
            setSoundOpen={setSoundOpen}
            setAutoopenLink={setAutoopenLinkOn}
          />
        )}
      />

      <SlotsList
        slots={visibleSlots}
        filterOptions={availableOptions}
        onDelete={onDelete}
      />
    </div>
  );
}

export default SlotsPage;
