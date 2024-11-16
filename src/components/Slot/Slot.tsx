import React, { useEffect, useRef, useState } from "react";
import styles from "./Slot.module.css";

interface SlotProps {
  name: string;
  score: number;
  location: string;
  startTime: string;
  endTime: string;
  id: string;
  onDelete: (id: string) => void;
}

function Slot(props: SlotProps) {
  const { name, score, location, startTime, endTime, id, onDelete } = props;
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const [elapsedTime, setElapsedTime] = useState("0");

  useEffect(() => {
    if (!endTime) {
      const start = new Date(startTime).getTime();
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
      <span>{location}</span>
      <span>{startTime}</span>
      <span className={styles.ellapsed}>{elapsedTime}</span>
    </div>
  );
}

export default React.memo(Slot);
