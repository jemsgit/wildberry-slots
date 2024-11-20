import { Autocomplete, Button, FormControl, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

import { Filter as FilterModel } from "../../models/filter";
import { SlotWatcher } from "../../models/slot-watcher";
import { boxTypes } from "../../constants/slots";
import styles from "./WatchSlotForm.module.css";
import { fieldStyles } from "./WatchSlotForm.styles";

interface Props {
  warehousesOptions: FilterModel[];
  watcher: SlotWatcher | null;
  onSave: (slot: SlotWatcher) => void;
  onCancelSave?: () => void;
}

function WatchSlotForm(props: Props) {
  const { warehousesOptions, onSave, onCancelSave, watcher } = props;
  const [formData, setFormData] = useState<{
    warehouse: { id: number; name: string } | null;
    boxType: { id: number; boxType: string } | null;
    sell: string;
    id?: number;
  }>({
    warehouse: null,
    boxType: null,
    sell: "",
  });

  const handleCancelSeve = () => {
    if (onCancelSave) {
      onCancelSave();
    }
    setFormData({
      warehouse: null,
      boxType: null,
      sell: "",
    });
  };

  const handleUpdateFormData = (field: string, value: unknown) => {
    setFormData((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  useEffect(() => {
    if (!watcher) {
      setFormData({
        warehouse: null,
        boxType: null,
        sell: "",
      });
    } else {
      const { sell, boxType, boxTypeId, name, warehouseId, id } =
        watcher as SlotWatcher;
      setFormData({
        warehouse: { id: warehouseId, name },
        boxType: { id: boxTypeId, boxType },
        sell: sell,
        id,
      });
    }
  }, [watcher]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { boxType, warehouse, sell } = formData;
    if (boxType && warehouse && sell) {
      onSave({
        boxTypeId: boxType.id,
        boxType: boxType.boxType,
        warehouseId: warehouse.id,
        name: warehouse.name,
        id: Math.random(),
        sell,
      });
      setFormData({
        warehouse: null,
        boxType: null,
        sell: "",
      });
    }
  };

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
