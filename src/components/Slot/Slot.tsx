import React, { useEffect, useState } from "react";
import styles from "./Slot.module.css";
import { GridRow, GridRowProps } from "@mui/x-data-grid";

const moscowTimezoneDif = -180;
const currentTimezoneDifMs =
  (new Date().getTimezoneOffset() - moscowTimezoneDif) * 60 * 1000;

function Slot(props: GridRowProps) {
  const {
    row: { startTime, endTime },
  } = props;

  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (startTime) {
      const start = startTime.getTime();
      if ((Date.now() - start + currentTimezoneDifMs) / 1000 < 10) {
        setIsNew(true);
        setTimeout(() => setIsNew(false), 2000);
      }
    }
  }, [startTime]);

  return (
    <div
      className={`${styles.container} ${
        endTime ? styles.containerDeleting : ""
      } ${isNew ? styles.new : ""}`}
    >
      <GridRow {...props} />
    </div>
  );
}

export default React.memo(Slot);
