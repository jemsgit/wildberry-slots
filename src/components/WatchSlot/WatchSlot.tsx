import { Box, Button, Link, Paper, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Icon from "@mui/material/Icon";

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

  const date = useMemo(() => {
    if (watcher?.date) {
      return watcher?.date.toLocaleString().split(",")[0];
    }
    return null;
  }, [watcher?.date]);

  if (watcher && !isEdit) {
    return (
      <div className={styles.container}>
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Box>
              <div>
                <Icon component={PlaceIcon} fontSize="small" /> {watcher.name}
              </div>
              <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Icon component={LocalShippingIcon} fontSize="small" />
                {watcher.boxType}
              </Box>
            </Box>
            <Box>
              <Link
                href={`${wbPage}${watcher.sell}`}
                target="_blank"
                sx={{ color: "#17c8c7" }}
              >
                Поставка {watcher.sell}
              </Link>
              <div>{date ? `c ${date}` : ""}</div>
            </Box>
            <div>
              <Button onClick={handleEditForm}> Редактировать</Button>
              <Button onClick={() => onDelete(watcher.id)}>Удалить</Button>
            </div>
          </Stack>
        </Paper>
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
