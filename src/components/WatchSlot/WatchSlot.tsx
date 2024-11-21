import { Button, Link } from "@mui/material";
import { useState } from "react";

import { Filter as FilterModel } from "../../models/filter";
import { SlotWatcher } from "../../models/slot-watcher";
import styles from "../WatchSlotForm/WatchSlotForm.module.css";
import WatchSlotForm from "../WatchSlotForm/WatchSlotForm";
import { wbPage } from "../../constants/common";

interface Props {
  warehousesOptions: FilterModel[];
  watcher: SlotWatcher | null;
  onSave: (slot: SlotWatcher) => void;
  onDelete: (slotId: number) => void;
}

function WatchSlot(props: Props) {
  const { warehousesOptions, onSave, onDelete, watcher } = props;
  const [isEdit, setIsEdit] = useState(false);

  const handleEditForm = () => {
    setIsEdit(true);
  };

  if (watcher && !isEdit) {
    return (
      <div className={styles.container}>
        Отслеживаем cлот: {watcher.name} / {watcher.boxType} /{" "}
        <Link
          href={`${wbPage}${watcher.sell}`}
          target="_blank"
          sx={{ color: "#17c8c7" }}
        >
          Поставка {watcher.sell}
        </Link>
        <Button onClick={handleEditForm}> Редактировать</Button>
        <Button onClick={() => onDelete(watcher.id)}>Удалить</Button>
      </div>
    );
  }
  return (
    <WatchSlotForm
      warehousesOptions={warehousesOptions}
      watcher={watcher}
      onCancelSave={() => setIsEdit(false)}
      onSave={(watcher) => {
        setIsEdit(false);
        onSave(watcher);
      }}
    />
  );
}

export default WatchSlot;
