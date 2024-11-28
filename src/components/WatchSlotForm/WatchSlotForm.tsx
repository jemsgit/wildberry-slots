import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { FormEvent, useEffect, useState } from "react";

import { Filter as FilterModel } from "../../models/filter";
import { SlotWatcher } from "../../models/slot-watcher";
import { boxTypes } from "../../constants/slots";
import { fieldStyles } from "./WatchSlotForm.styles";
import DateInput from "../DateInput/DateInput";
import { dateToFormat, parseDateFromString } from "../../utils/date-utils";
import { useDesktopMode } from "../../hooks/useDesktop";

const tgLink = "https://t.me/AngrySlots";
interface Props {
  warehousesOptions: FilterModel[];
  watcher: SlotWatcher | null;
  onSave: (slot: SlotWatcher) => void;
  onCancelSave?: () => void;
}

const defaultDelay = 10;
const minDelay = 0;
const maxDelay = 100;

function WatchSlotForm(props: Props) {
  const { warehousesOptions, onSave, onCancelSave, watcher } = props;
  const isDesktop = useDesktopMode();

  const [formData, setFormData] = useState<{
    warehouse: { id: number; name: string } | null;
    boxType: { id: number; boxType: string } | null;
    delay: string;
    date?: string | null;
    sell: string;
    id?: number;
  }>({
    warehouse: null,
    boxType: null,
    sell: "",
    delay: String(defaultDelay),
  });

  const handleCancelSeve = () => {
    if (onCancelSave) {
      onCancelSave();
    }
    setFormData({
      warehouse: null,
      boxType: null,
      sell: "",
      delay: String(defaultDelay),
      date: undefined,
    });
  };

  const handleClose = () => {
    handleCancelSeve();
  };

  const handleUpdateFormData = (field: string, value: unknown) => {
    setFormData((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleNoDelay = (e: React.MouseEvent) => {
    e.preventDefault();
    handleUpdateFormData("delay", 0);
  };

  const handleUpdateDelay = (val: string) => {
    if (!val) {
      handleUpdateFormData("delay", val);
      return;
    }
    let delay = Number(val);
    if (delay > maxDelay) {
      delay = maxDelay;
    } else if (delay < minDelay) {
      delay = minDelay;
    }
    handleUpdateFormData("delay", String(delay));
  };

  useEffect(() => {
    if (!watcher) {
      setFormData({
        warehouse: null,
        boxType: null,
        sell: "",
        delay: String(defaultDelay),
        date: undefined,
      });
    } else {
      const {
        sell,
        boxType,
        boxTypeId,
        name,
        warehouseId,
        id,
        delay = defaultDelay,
        date,
      } = watcher as SlotWatcher;
      setFormData({
        warehouse: { id: warehouseId, name },
        boxType: { id: boxTypeId, boxType },
        sell: sell,
        delay: String(delay),
        date: date ? dateToFormat(date) : null,
        id,
      });
    }
  }, [watcher]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { boxType, warehouse, sell, delay, date, id } = formData;
    if (boxType && warehouse && sell) {
      onSave({
        boxTypeId: boxType.id,
        boxType: boxType.boxType,
        warehouseId: warehouse.id,
        name: warehouse.name,
        id: id || Math.random(),
        delay: Number(delay),
        date: date ? parseDateFromString(date) : undefined,
        sell,
      });
      setFormData({
        warehouse: null,
        boxType: null,
        sell: "",
        date: undefined,
        delay: String(defaultDelay),
      });
    }
  };

  return (
    <Dialog
      open
      fullWidth
      maxWidth="desktop"
      sx={{ padding: 2 }}
      onClose={(_, reason) => {
        if (reason === "escapeKeyDown") {
          handleCancelSeve();
        }
      }}
    >
      <DialogTitle>
        {watcher ? "Изменение отслеживания" : "Добавление отслеживания"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <form onSubmit={handleFormSubmit} style={{ padding: "16px" }}>
        <Stack gap={2}>
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              mb: 3,
            }}
          >
            <TextField
              onChange={(e) => handleUpdateFormData("sell", e.target.value)}
              value={formData.sell}
              label="Поставка"
              placeholder="Номер поставки"
              size="small"
            />
            <FormHelperText>
              По этому номеру откроется ссылка на бронирование
            </FormHelperText>
          </Box>
          <Stack direction={isDesktop ? "row" : "column"} gap={3}>
            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <TextField
                onChange={(e) => handleUpdateDelay(e.target.value)}
                value={formData.delay}
                label="Задержка (сек)"
                placeholder="Задержка"
                size="small"
                type="number"
                slotProps={{
                  htmlInput: { min: 0, max: 100 },
                }}
              />
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <FormHelperText>Необязательно</FormHelperText>
                <Link
                  onClick={handleNoDelay}
                  fontSize={14}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: (theme) => theme.palette.text.secondary,
                    },
                  }}
                >
                  Без задержки
                </Link>
              </Stack>
            </Box>

            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <DateInput
                locale="ru"
                value={formData.date}
                onChange={(val) => {
                  handleUpdateFormData("date", val);
                }}
                inputProps={{
                  placeholder: "Дата от",
                  label: "Дата отслеживания",
                  size: "small",
                }}
              />
              <FormHelperText>
                От какой даты отслеживается слот. Необязательно
              </FormHelperText>
            </Box>
          </Stack>
          <Stack direction="row" gap={2} sx={{ justifyContent: "center" }}>
            <Button type="submit" variant="contained" sx={{ width: "200px" }}>
              Сохранить
            </Button>
            <Button
              type="reset"
              variant="outlined"
              sx={{ width: "200px" }}
              onClick={handleCancelSeve}
            >
              Отмена
            </Button>
          </Stack>
        </Stack>
        <Typography sx={{ fontSize: "13px", lineHeight: 1, mt: 2 }}>
          Сервис предоставляется бесплатно.
        </Typography>
        <Typography sx={{ fontSize: "13px", lineHeight: 1 }}>
          Будем рады, если Вы подпишетесь на наш{" "}
          <Link
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: (theme) => theme.palette.text.secondary,
              },
            }}
            href={tgLink}
          >
            канал в Telegram
          </Link>
        </Typography>
      </form>
    </Dialog>
  );
}

export default WatchSlotForm;
