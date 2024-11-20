import { useCallback, useEffect, useState } from "react";
import { slotsAdapter } from "../../adapters/api-adapter";
import { realTimeSlotsAdapter } from "../../adapters/real-time-adapter";
import SlotsList from "../../components/SlotsList/SlotsList";
import { Slot } from "../../models/slot";
import Filter from "../../components/Filter/Filter";
import { Filter as FilterModel } from "../../models/filter";

import sound from "../../sounds/fire.mp3";
import WatchSlotForm from "../../components/WatchSlotForm/WatchSlotForm";
import { SlotWatcher } from "../../models/slot-watcher";
import { checkSlot, checkSlots } from "../../utils/check-slot";
import Settings from "../../components/Settings/Settings";
import WatcherList from "../../components/WatcherList/WatcherList";

const audio = new Audio(sound);

const filterSlots = (filter: FilterModel[], slots: Slot[]): Slot[] => {
  const filteredByClose = slots.filter(
    (slot) => !slot.closed && slot.startTime
  );
  if (!filter || !filter.length) {
    return filteredByClose;
  }

  const filterCodes = filter.map((item) => item.id);

  return filteredByClose.filter((slot) => filterCodes.includes(slot.id));
};

function SlotsPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [visibleSlots, setVisibleSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filtersIsLoading, setFiltersIsLoading] = useState(false);
  const [availableOptions, setAvailableOptions] = useState<FilterModel[]>([]);
  const [filter, setFilter] = useState<FilterModel[]>([]);
  const [slotWatchers, setSlotWatchers] = useState<SlotWatcher[]>([]);
  const [autoopenLinkOn, setAutoopenLinkOn] = useState(true);
  const [soundCloseOn, setSoundClose] = useState(true);
  const [soundOpenOn, setSoundOpen] = useState(true);

  const handleDataUpdate = useCallback(
    (type: string, update: Slot[] | Slot) => {
      if (type === "initial") {
        setSlots(update as Slot[]);
        return;
      }
      if (type === "update") {
        setSlots((slots) => {
          const { id } = update as Slot;
          const updatedSlots = slots.slice();
          let currentSlotIndex = updatedSlots.findIndex(
            (slot) => slot.id === id
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
      console.log(slotWatchers);
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
          }
        });
      }
      if (foundList.length) {
        console.log("ЗАматчились вотчеры");
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
    setVisibleSlots(filterSlots(filter, slots));
  }, [slots, filter]);

  const onDelete = useCallback(
    (id: number, boxTypeId: number, date: string) => {
      try {
        soundCloseOn && audio.play();
      } catch (e) {
        console.log(e);
      }
      setTimeout(() => {
        setSlots((slots) => {
          const slotIndex = slots.findIndex(
            (slot) =>
              slot.id === id &&
              slot.boxTypeId === boxTypeId &&
              slot.date === date
          );
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
      if (index != 0) {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Settings
        autoopenLinkOn={autoopenLinkOn}
        soundCloseOn={soundCloseOn}
        soundOpenOn={soundOpenOn}
        setSoundClose={setSoundClose}
        setSoundOpen={setSoundOpen}
        setAutoopenLink={setAutoopenLinkOn}
      />
      <WatchSlotForm
        warehousesOptions={availableOptions}
        onSave={handleSaveWatcher}
        watcher={null}
      />
      <WatcherList
        watchers={slotWatchers}
        warehousesOptions={availableOptions}
        onSave={(watcher) => updateWatcher(watcher)}
        onDelete={handleDeleteWatcher}
      />
      <div>
        <Filter
          value={filter}
          onChange={setFilter}
          availableOptions={availableOptions}
          isLoading={filtersIsLoading}
        />
      </div>
      <SlotsList slots={visibleSlots} onDelete={onDelete} />
    </div>
  );
}

export default SlotsPage;
