import { useCallback, useEffect, useState } from "react";
import { slotsAdapter } from "../../adapters/api-adapter";
import { realTimeSlotsAdapter } from "../../adapters/real-time-adapter";
import SlotsList from "../../components/SlotsList/SlotsList";
import { Slot } from "../../models/slot";
import Filter from "../../components/Filter/Filter";

function SlotsPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<string[]>([]);
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
    []
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

  const onDelete = useCallback((id: number) => {
    setSlots((slots) => {
      const newSlots = slots.filter((slot) => slot.id !== id);
      return newSlots;
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const visibleSlots =
    filter && filter.length
      ? slots.filter((slot) => filter.includes(slot.name))
      : slots;
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
