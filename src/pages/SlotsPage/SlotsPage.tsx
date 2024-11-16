import React, { useCallback, useEffect, useState } from "react";
import { slotsAdapter } from "../../adapters/api-adapter";
import { realTimeSlotsAdapter } from "../../adapters/real-time-adapter";
import SlotsList from "../../components/SlotsList/SlotsList";
import { Slot } from "../../models/slot";

function SlotsPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleDataUpdate = useCallback(
    (type: string, update: any[] | object) => {
      if (type === "initial") {
        setSlots(update as any[]);
        return;
      }
      if (type === "add") {
        setSlots((slots) => [...slots, update]);
      }
      if (type === "update") {
        setSlots((slots) => {
          const { id } = update;
          const updatedSlots = slots.slice();
          let currentSlot = updatedSlots.find((slot) => slot.id === id);
          if (!currentSlot) {
            return slots;
          }
          currentSlot = {
            ...currentSlot,
            update,
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
        setSlots(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
    const unsubscribe = realTimeSlotsAdapter.subscribe(handleDataUpdate);
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  const onDelete = useCallback((id: string) => {
    setSlots((slots) => {
      const newSlots = slots.filter((slot) => slot.id !== id);
      return newSlots;
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <SlotsList slots={slots} onDelete={onDelete} />;
}

export default SlotsPage;
