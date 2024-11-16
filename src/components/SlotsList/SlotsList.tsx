import React from "react";
import { Slot as SlotModel } from "../../models/slot";
import Slot from "../Slot/Slot";

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
