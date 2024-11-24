import { SlotWatcher } from "../../models/slot-watcher";
import WatchSlot from "../WatchSlot/WatchSlot";
import { Filter as FilterModel } from "../../models/filter";
import { Box, Typography } from "@mui/material";

interface WatcherListProps {
  watchers: SlotWatcher[];
  warehousesOptions: FilterModel[];
  onSave: (watcher: SlotWatcher) => void;
  onDelete: (id: number) => void;
}

function WatcherList({
  watchers,
  warehousesOptions,
  onSave,
  onDelete,
}: WatcherListProps) {
  return (
    <Box>
      <Typography>Ваши отслеживания</Typography>
      {!watchers.length && "У вас пока нет отслеживаний"}
      {watchers.map((watcher) => (
        <div key={watcher.id}>
          <WatchSlot
            watcher={watcher}
            warehousesOptions={warehousesOptions}
            onSave={onSave}
            onDelete={onDelete}
          />
        </div>
      ))}
    </Box>
  );
}
export default WatcherList;
