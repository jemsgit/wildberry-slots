import React, { useEffect, useRef, useState } from "react";
import styles from "./Slot.module.css";
import { msToHuman } from "../../utils/date-utils";

interface SlotProps {
  name: string;
  score: number;
  boxType: string;
  boxTypeId: number;
  startTime?: Date;
  endTime?: Date;
  id: number;
  date: string;
  isEven: boolean;
  onDelete: (id: number, boxType: number, date: string) => void;
}

function getTime(date?: Date) {
  if (!date) {
    return "";
  }
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function Slot(props: SlotProps) {
  const {
    name,
    score,
    boxType,
    boxTypeId,
    startTime,
    endTime,
    id,
    date,
    isEven,
    onDelete,
  } = props;
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const [elapsedTime, setElapsedTime] = useState("0");
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!endTime && startTime) {
      const start = startTime.getTime();
      timeOutRef.current = setInterval(() => {
        setElapsedTime(msToHuman(Date.now() - start));
      }, 100);
    }

    return () => {
      if (timeOutRef.current) {
        clearInterval(timeOutRef.current);
      }
    };
  }, [startTime, endTime]);

  useEffect(() => {
    if (endTime) {
      onDelete(id, boxTypeId, date);
    }
  }, [id, boxTypeId, date, endTime]);

  useEffect(() => {
    if (startTime) {
      const start = startTime.getTime();
      if ((Date.now() - start) / 1000 < 10) {
        setIsNew(true);
        setTimeout(() => setIsNew(false), 2000);
      }
    }
  }, [startTime]);

  return (
    <div
      className={`${styles.container} ${isEven ? styles.even : ""} ${
        endTime ? styles.containerDeleting : ""
      } ${isNew ? styles.new : ""}`}
    >
      <span>{name}</span>
      <span>{date}</span>
      <span>{score}</span>
      <span>{boxType}</span>
      <span>{getTime(startTime)}</span>
      <span className={styles.ellapsed}>{elapsedTime}</span>
    </div>
  );
}

export default React.memo(Slot);
