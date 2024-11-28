import {
  Chip,
  Stack,
  Box,
  Typography,
  Tooltip,
  ClickAwayListener,
  Paper,
  IconButton,
} from "@mui/material";
import { setWhTypeFilter } from "../../store/filtersSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import HelpIcon from "@mui/icons-material/Help";
import { useState } from "react";

export const typeFilters = ["Обычный", "СНГ", "СЦ", "СГТ"];

const CustomFilterHeader = () => {
  const dispatch = useAppDispatch();
  const selectedFilter = useAppSelector(
    (state) => state.filters.filter.items[0]
  );

  const isAnyOf = selectedFilter?.operator === "isAnyOf";
  const isTypeField = selectedFilter?.field === "storeType";

  const handleChipClick = (value: string) => {
    dispatch(setWhTypeFilter(value));
  };

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 / 2 }}>
        <Typography variant="subtitle1" sx={{ textAlign: "left" }}>
          Быстрые фильтры
        </Typography>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            title={
              <Stack sx={{ fontSize: "14px", p: 1 }}>
                <Box>
                  Обычные: Невинномысск, Подольск, Тула, Коледино, Электросталь,
                  Казань, Екатеринбург - Испытателей 14г, Белые Столбы,
                  Екатеринбург - Перспективный 12/2, Подольск 4, Обухово,
                  Новосемейкино, "Чехов 2, Новоселки вл 11 стр 7", Краснодар
                  (Тихорецкая), Рязань (Тюшевское), Сц Брянск 2, Санкт-Петербург
                  (Уткина Заводь), Котовск, Волгоград, Владимир, Чашниково,
                  Подольск 3, Новосибирск, "Чехов 1, Новоселки вл 11 стр 2".
                </Box>
                <Box>СНГ: Астана 2, Алматы Атакент, Минск, Астана.</Box>
                <Box>
                  СГТ: Голицыно СГТ, Шушары СГТ, Радумля СГТ, Обухово СГТ,
                  Внуково СГТ.
                </Box>
                <Box>СЦ: Все СЦ.</Box>
              </Stack>
            }
            sx={{ cursor: "pointer" }}
          >
            <IconButton onClick={handleTooltipOpen}>
              <HelpIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </ClickAwayListener>
      </Box>
      <Stack
        direction="row"
        gap={1}
        sx={{ flexWrap: "wrap", alignItems: "center" }}
      >
        {typeFilters.map((value) => (
          <Chip
            key={value}
            label={value}
            clickable
            color={
              isAnyOf &&
              isTypeField &&
              Array.isArray(selectedFilter.value) &&
              selectedFilter.value.includes(value)
                ? "primary"
                : "default"
            }
            // sx={{ flex: "1 1 45%" }}
            onClick={() => handleChipClick(value)}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default CustomFilterHeader;
