import React, { useEffect, useState } from "react";
import styles from "./Slot.module.css";
import { GridRow, GridRowProps } from "@mui/x-data-grid";

interface SlotProps extends GridRowProps {
  onDelete: (id: number, boxType: number, date: string) => void;
}

function Slot(props: SlotProps) {
  const {
    row: { startTime, warehouseId, boxTypeId, dateFormatted, endTime },
  } = props;

  const { onDelete, ...rest } = props;
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (startTime) {
      const start = startTime.getTime();
      if ((Date.now() - start) / 1000 < 10) {
        setIsNew(true);
        setTimeout(() => setIsNew(false), 2000);
      }
    }
  }, [startTime]);

  useEffect(() => {
    if (endTime) {
      onDelete(warehouseId, boxTypeId, dateFormatted);
    }
  }, [warehouseId, boxTypeId, dateFormatted, endTime, onDelete]);

  return (
    <div
      className={`${styles.container} ${
        props.row.endTime ? styles.containerDeleting : ""
      } ${isNew ? styles.new : ""}`}
    >
      <GridRow {...rest} />
    </div>
  );
}

export default React.memo(Slot);
