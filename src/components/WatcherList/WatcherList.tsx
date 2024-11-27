import { SlotWatcher } from "../../models/slot-watcher";
import WatchSlot from "../WatchSlot/WatchSlot";
import { Filter as FilterModel } from "../../models/filter";
import { Box, Link } from "@mui/material";
import { showNewForm } from "../../store/watchersSlice";
import { useAppDispatch } from "../../hooks/redux";

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
  const dispatch = useAppDispatch();
  const handleAddNew = (e: React.MouseEvent) => {
    e.preventDefault;
    dispatch(showNewForm(true));
  };
  return (
    <Box>
      {!watchers.length && (
        <>
          <Box>У вас пока нет отслеживаний.</Box>
          <Box>
            <Link
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: (theme) => theme.palette.text.primary,
                },
              }}
              onClick={handleAddNew}
            >
              Добавьте свое первое отслеживание
            </Link>
          </Box>
        </>
      )}
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
