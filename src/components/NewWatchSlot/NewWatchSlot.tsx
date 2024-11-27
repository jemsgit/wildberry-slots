import { Box, IconButton } from "@mui/material";
import { useCallback, useState } from "react";
import { Add } from "@mui/icons-material";

import { Filter as FilterModel } from "../../models/filter";
import { SlotWatcher } from "../../models/slot-watcher";
import WatchSlotForm from "../WatchSlotForm/WatchSlotForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { showNewForm } from "../../store/watchersSlice";

interface Props {
  warehousesOptions: FilterModel[];
  onSave: (slot: SlotWatcher) => void;
}

function NewWatchSlot(props: Props) {
  const { warehousesOptions, onSave } = props;

  const showNew = useAppSelector((state) => state.watchers.showNew);
  const dispatch = useAppDispatch();

  const handleSave = useCallback(
    (slot: SlotWatcher) => {
      setIsEdit(false);
      onSave(slot);
      dispatch(showNewForm(false));
    },
    [onSave]
  );

  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <Box sx={{ textAlign: "left" }}>
        <IconButton onClick={() => setIsEdit(true)}>
          <Add />
        </IconButton>
      </Box>
      {(isEdit || showNew) && (
        <WatchSlotForm
          watcher={null}
          warehousesOptions={warehousesOptions}
          onSave={handleSave}
          onCancelSave={() => {
            setIsEdit(false);
            dispatch(showNewForm(false));
          }}
        />
      )}
    </>
  );
}

export default NewWatchSlot;
