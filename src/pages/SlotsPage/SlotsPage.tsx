import { useCallback, useEffect, useState } from "react";
import { slotsAdapter } from "../../adapters/api-adapter";
import { realTimeSlotsAdapter } from "../../adapters/real-time-adapter";
import SlotsList from "../../components/SlotsList/SlotsList";
import { Slot } from "../../models/slot";
import Filter from "../../components/Filter/Filter";
import { Filter as FilterModel } from "../../models/filter";

const filterSlots = (filter: FilterModel[], slots: Slot[]): Slot[] => {
  const filteredByClose = slots.filter((slot) => !slot.closed);
  if (!filter || !filter.length) {
    return filteredByClose;
  }

  const filterNames = filter.map((item) => item.name);

  return filteredByClose.filter((slot) => filterNames.includes(slot.name));
};

function SlotsPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [visibleSlots, setVisibleSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<FilterModel[]>([]);

  const handleDataUpdate = useCallback(
    (type: string, update: Slot[] | Slot) => {
      if (type === "initial") {
        setSlots(update as Slot[]);
        return;
      }
      if (type === "add") {
        setSlots((slots) => [...slots, update as Slot]);
      }
      if (type === "update") {
        setSlots((slots) => {
          const { id } = update as Slot;
          const updatedSlots = slots.slice();
          let currentSlotIndex = updatedSlots.findIndex(
            (slot) => slot.id === id
          );
          if (currentSlotIndex < 0) {
            return slots;
          }
          updatedSlots[currentSlotIndex] = {
            ...updatedSlots[currentSlotIndex],
            ...update,
          };
          return updatedSlots;
        });
      }
    },
    [filter]
  );

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
    const unsubscribe = realTimeSlotsAdapter.subscribe(handleDataUpdate);
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  useEffect(() => {
    setVisibleSlots(filterSlots(filter, slots));
  }, [slots, filter]);

  const onDelete = useCallback((id: number) => {
    setSlots((slots) => {
      const slotIndex = slots.findIndex((slot) => slot.id === id);
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
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Filter value={filter} onChange={setFilter} />
      </div>
      <SlotsList slots={visibleSlots} onDelete={onDelete} />
    </div>
  );
}

export default SlotsPage;
