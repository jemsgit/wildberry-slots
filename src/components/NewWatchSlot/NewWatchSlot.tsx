import { Button } from "@mui/material";
import { useState } from "react";

import { Filter as FilterModel } from "../../models/filter";
import { SlotWatcher } from "../../models/slot-watcher";
import styles from "../WatchSlotForm/WatchSlotForm.module.css";
import { addButtonStyles } from "../WatchSlotForm/WatchSlotForm.styles";
import { Add } from "@mui/icons-material";
import WatchSlotForm from "../WatchSlotForm/WatchSlotForm";

interface Props {
  warehousesOptions: FilterModel[];
  watcher: SlotWatcher | null;
  onSubscibe: (slot: SlotWatcher | null) => void;
}

function NewWatchSlot(props: Props) {
  const { warehousesOptions, onSubscibe } = props;

  const [isEdit, setIsEdit] = useState(false);

  if (!isEdit) {
    return (
      <div className={styles.container}>
        <Button
          startIcon={<Add />}
          onClick={() => setIsEdit(true)}
          sx={addButtonStyles}
        >
          Добавить отслеживание слота
        </Button>
      </div>
    );
  }

  return (
    <WatchSlotForm
      watcher={null}
      warehousesOptions={warehousesOptions}
      onSave={onSubscibe}
      onCancelSave={() => setIsEdit(false)}
    />
  );
}

export default NewWatchSlot;
