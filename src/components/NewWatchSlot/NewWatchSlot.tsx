import { Box, Button } from "@mui/material";
import { useCallback, useState } from "react";
import { Add } from "@mui/icons-material";

import { Filter as FilterModel } from "../../models/filter";
import { SlotWatcher } from "../../models/slot-watcher";
import { addButtonStyles } from "../WatchSlotForm/WatchSlotForm.styles";
import WatchSlotForm from "../WatchSlotForm/WatchSlotForm";

interface Props {
  warehousesOptions: FilterModel[];
  onSave: (slot: SlotWatcher) => void;
}

function NewWatchSlot(props: Props) {
  const { warehousesOptions, onSave } = props;

  const handleSave = useCallback(
    (slot: SlotWatcher) => {
      setIsEdit(false);
      onSave(slot);
    },
    [onSave]
  );

  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <Box sx={{ textAlign: "left" }}>
        <Button
          startIcon={<Add />}
          onClick={() => setIsEdit(true)}
          sx={addButtonStyles}
        >
          Добавить отслеживание слота
        </Button>
      </Box>
      {isEdit && (
        <WatchSlotForm
          watcher={null}
          warehousesOptions={warehousesOptions}
          onSave={handleSave}
          onCancelSave={() => setIsEdit(false)}
        />
      )}
    </>
  );
}

export default NewWatchSlot;
