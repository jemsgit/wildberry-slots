import { useEffect } from "react";
import { Stack } from "@mui/material";

import SlotsList from "../../components/SlotsList/SlotsList";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchFilters, fetchSlots, filterSlots } from "../../store/slotsSlice";

import { realTimeSlotsService } from "../../service/realtimeSlotService";
import WatchSection from "../../components/WatchSection/WatchSection";
import SettingsSection from "../../components/SettingsSection/SettingsSection";

function SlotsPage() {
  const dispatch = useAppDispatch();

  const {
    slots,
    visibleSlots,
    filters: availableOptions,
    isLoading,
    filtersIsLoading,
  } = useAppSelector((state) => state.slots);

  useEffect(() => {
    dispatch(fetchSlots());
    dispatch(fetchFilters());
  }, [dispatch]);

  useEffect(() => {
    realTimeSlotsService.subscribe();
  }, []);

  useEffect(() => {
    dispatch(filterSlots());
  }, [slots, dispatch]);

  if ((isLoading || filtersIsLoading) && !availableOptions?.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Stack gap={3}>
        <Stack direction="row" gap={3}>
          <WatchSection />

          <SettingsSection />
        </Stack>

        <SlotsList slots={visibleSlots} filterOptions={availableOptions} />
      </Stack>
    </div>
  );
}

export default SlotsPage;
