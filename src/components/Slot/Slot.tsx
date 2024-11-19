import React, { useEffect, useRef, useState } from "react";
import styles from "./Slot.module.css";

import sound from "./fire.mp3";

const audio = new Audio(sound);

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
  const [clicked, setClicked] = useState(false);

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
      setTimeout(() => onDelete(id, boxTypeId, date), 1000);
      try {
        audio.play();
      } catch (e) {
        console.log(e);
      }
    }
  }, [id, boxTypeId, date, endTime]);

  return (
    <div
      className={`${styles.container} ${isEven ? styles.even : ""} ${
        endTime || clicked ? styles.containerDeleting : ""
      }`}
      onClick={() => {
        // delete onclick
        setTimeout(() => onDelete(id, boxTypeId, date), 1000);
        setClicked(true);
        try {
          audio.play();
        } catch (e) {
          console.log(e);
        }
      }}
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
