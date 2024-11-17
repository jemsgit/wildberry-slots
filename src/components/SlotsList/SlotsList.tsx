import { Slot as SlotModel } from "../../models/slot";
import Slot from "../Slot/Slot";
import styles from "./SlotsList.module.css";

interface SlotListProps {
  slots: SlotModel[];
  onDelete: (id: string) => void;
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
        <span>Доступность</span>
        <span>Локация</span>
        <span>Времяо открытия</span>
        <span className={styles.ellapsed}>Период доступности</span>
      </div>
      {slots.map(({ name, id, location, score, startTime, endTime }) => (
        <Slot
          name={name}
          location={location}
          key={id}
          score={score}
          startTime={startTime}
          endTime={endTime}
          id={id}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default SlotsList;
