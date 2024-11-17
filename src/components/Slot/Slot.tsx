import React, { useEffect, useRef, useState } from "react";
import styles from "./Slot.module.css";

interface SlotProps {
  name: string;
  score: number;
  boxType: string;
  startTime?: Date;
  endTime?: Date;
  id: number;
  onDelete: (id: number) => void;
}

function getTime(date?: Date) {
  if (!date) {
    return "";
  }
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function Slot(props: SlotProps) {
  const { name, score, boxType, startTime, endTime, id, onDelete } = props;
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const [elapsedTime, setElapsedTime] = useState("0");

  useEffect(() => {
    if (!endTime && startTime) {
      const start = startTime.getTime();
      timeOutRef.current = setInterval(() => {
        setElapsedTime(((Date.now() - start) / 1000).toFixed(2));
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
      setTimeout(() => onDelete(id), 2000);
    }
  }, [id, endTime]);

  return (
    <div
      className={`${styles.container} ${
        endTime ? styles.containerDeleting : ""
      }`}
    >
      <span>{name}</span>
      <span>{score}</span>
      <span>{boxType}</span>
      <span>{getTime(startTime)}</span>
      <span className={styles.ellapsed}>{elapsedTime}</span>
    </div>
  );
}

export default React.memo(Slot);
