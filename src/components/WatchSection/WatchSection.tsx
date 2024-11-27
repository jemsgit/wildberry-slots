import { Box, Paper, Stack } from "@mui/material";
import SectionHeader from "../SectionHeader/SectionHeader";
import NewWatchSlot from "../NewWatchSlot/NewWatchSlot";
import WatcherList from "../WatcherList/WatcherList";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  deleteWatcher,
  saveWatcher,
  updateWatcher,
} from "../../store/watchersSlice";
import { SlotWatcher } from "../../models/slot-watcher";

function WatchSection() {
  const dispatch = useAppDispatch();

  const { filters: availableOptions } = useAppSelector((state) => state.slots);
  const slotWatchers = useAppSelector((state) => state.watchers.slotWatchers);

  const handleSaveWatcher = (watcher: SlotWatcher) => {
    dispatch(saveWatcher(watcher));
  };

  const handleDeleteWatcher = (id: number) => {
    dispatch(deleteWatcher(id));
  };

  const handleUpdateWatcher = (watcher: SlotWatcher) => {
    dispatch(updateWatcher(watcher));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        flex: "3 1 auto",
        borderRadius: 3,
      }}
    >
      <Box>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <SectionHeader text="Отслеживания" />
          <NewWatchSlot
            warehousesOptions={availableOptions}
            onSave={handleSaveWatcher}
          />
        </Stack>
        <Box sx={{ pt: 3, textAlign: "left" }}>
          <WatcherList
            watchers={slotWatchers}
            warehousesOptions={availableOptions}
            onSave={handleUpdateWatcher}
            onDelete={handleDeleteWatcher}
          />
        </Box>
      </Box>
    </Paper>
  );
}

export default WatchSection;
