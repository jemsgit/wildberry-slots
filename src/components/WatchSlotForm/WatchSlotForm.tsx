import { Autocomplete, Button, FormControl, TextField } from "@mui/material";
import { FormEvent, useState } from "react";

import { Filter as FilterModel } from "../../models/filter";
import { SlotWatcher } from "../../models/slot-watcher";
import { boxTypes } from "../../constants/slots";
import styles from "./WatchSlotForm.module.css";
import { addButtonStyles, fieldStyles } from "./WatchSlotForm.styles";
import { Add } from "@mui/icons-material";

interface Props {
  warehousesOptions: FilterModel[];
  watcher: SlotWatcher | null;
  onSubscibe: (slot: SlotWatcher | null) => void;
}

function WatchSlotForm(props: Props) {
  const { warehousesOptions, onSubscibe, watcher } = props;
  const [formData, setFormData] = useState<{
    warehouse: { id: number; name: string } | null;
    boxType: { id: number; boxType: string } | null;
    sell: string;
  }>({
    warehouse: null,
    boxType: null,
    sell: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleCancelSeve = () => {
    setIsEdit(false);
  };
  const handleUpdateFormData = (field: string, value: unknown) => {
    setFormData((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { boxType, warehouse, sell } = formData;
    if (boxType && warehouse && sell) {
      setIsEdit(false);
      onSubscibe({
        boxTypeId: boxType.id,
        boxType: boxType.boxType,
        id: warehouse.id,
        name: warehouse.name,
        sell,
      });
      setFormData({
        warehouse: null,
        boxType: null,
        sell: "",
      });
    }
  };

  const handleEditForm = () => {
    const { sell, boxType, boxTypeId, name, id } = watcher as SlotWatcher;
    setFormData({
      warehouse: { id, name },
      boxType: { id: boxTypeId, boxType },
      sell: sell,
    });
    setIsEdit(true);
  };

  if (!watcher && !isEdit) {
    return (
      <div className={styles.container}>
        <Button
          startIcon={<Add />}
          onClick={() => setIsEdit(true)}
          sx={addButtonStyles}
        >
          Добавить отслеживание слота
        </Button>
      </div>
    );
  }

  if (watcher && !isEdit) {
    return (
      <div className={styles.container}>
        Отслеживаем cлот: {watcher.name} - {watcher.boxType}
        <Button onClick={handleEditForm}> Редактировать</Button>
        <Button
          onClick={() => {
            onSubscibe(null);
            setFormData({
              warehouse: null,
              boxType: null,
              sell: "",
            });
            setIsEdit(false);
          }}
        >
          Удалить
        </Button>
      </div>
    );
  }
  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <FormControl sx={fieldStyles}>
          <Autocomplete
            id="tags-outlined"
            options={warehousesOptions}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            value={formData.warehouse}
            onChange={(_, val) => handleUpdateFormData("warehouse", val)}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Склады" placeholder="Склад" />
            )}
          />
        </FormControl>
        <FormControl sx={fieldStyles}>
          <Autocomplete
            id="tags-outlined"
            options={boxTypes}
            getOptionLabel={(option) => option.boxType}
            filterSelectedOptions
            value={formData.boxType}
            onChange={(_, val) => handleUpdateFormData("boxType", val)}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Тип поставки"
                placeholder="Тип поставки"
              />
            )}
          />
        </FormControl>
        <TextField
          onChange={(e) => handleUpdateFormData("sell", e.target.value)}
          value={formData.sell}
          label="Поставка"
          placeholder="Номер поставки"
          size="small"
        />
      </div>
      <Button type="submit">Сохранить</Button>
      <Button type="reset" onClick={handleCancelSeve}>
        Отмена
      </Button>
    </form>
  );
}

export default WatchSlotForm;
