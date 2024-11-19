import { Slot as SlotModel } from "../../models/slot";
import Slot from "../Slot/Slot";
import styles from "./SlotsList.module.css";

interface SlotListProps {
  slots: SlotModel[];
  onDelete: (id: number, boxType: number, date: string) => void;
}

function SlotsList(props: SlotListProps) {
  const { slots = [], onDelete } = props;
  if (!slots) {
    return <div>Нет слотов вообще</div>;
  }

  return (
    <div>
      <div className={styles.header}>
        <span>Название</span>
        <span>Дата</span>
        <span>Доступность</span>
        <span>Тип поставки</span>
        <span>Время открытия</span>
        <span className={styles.ellapsed}>Период доступности</span>
      </div>
      {slots.map(
        (
          { name, id, boxType, boxTypeId, score, startTime, endTime, date },
          index
        ) => (
          <Slot
            name={name}
            boxType={boxType}
            boxTypeId={boxTypeId}
            key={`${id}-${boxTypeId}-${date}`}
            score={score}
            startTime={startTime}
            endTime={endTime}
            id={id}
            date={date}
            onDelete={onDelete}
            isEven={index % 2 === 0}
          />
        )
      )}
    </div>
  );
}

export default SlotsList;
