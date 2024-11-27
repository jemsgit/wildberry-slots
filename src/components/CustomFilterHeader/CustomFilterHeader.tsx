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

export const typeFilters = [
  "Обычный 1",
  "Обычный 2",
  "Обычный 3",
  "СНГ",
  "СЦ",
  "СГТ",
];

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
    console.log("ter");
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
                <Box>Обычный 1 - это 1</Box>
                <Box>Обычный 2 - это 2</Box>
                <Box>Обычный 3 - это 3</Box>
                <Box>СНГ- это СНГ</Box>
                <Box>СЦ - СЦ</Box>
                <Box>СГТ - СГТ</Box>
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
              isAnyOf && isTypeField && selectedFilter.value.includes(value)
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
