import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridSingleSelectColDef } from "@mui/x-data-grid";

import { Filter as FilterModel } from "../../models/filter";
import { Slot as SlotModel } from "../../models/slot";
import { getTimeDiff, msToHuman } from "../../utils/date-utils";
import Slot from "../Slot/Slot";
import CustomToolbar from "../CustomToolbar/CustomToolbar";
import { Paper } from "@mui/material";
import SectionHeader from "../SectionHeader/SectionHeader";
import { useDesktopMode } from "../../hooks/useDesktop";
import CustomFilterHeader, {
  typeFilters,
} from "../CustomFilterHeader/CustomFilterHeader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setFilter } from "../../store/filtersSlice";

interface SlotListProps {
  slots: SlotModel[];
  filterOptions: FilterModel[];
}

const columns: GridColDef[] = [
  {
    field: "storeType",
    headerName: "Тип склада",
    type: "singleSelect",
    minWidth: 150,
    flex: 1.5,
    hideable: false,
    valueOptions: typeFilters,
  },
  {
    field: "name",
    headerName: "Склад",
    type: "singleSelect",
    minWidth: 150,
    flex: 1.5,
    hideable: false,
    valueOptions: [],
  },
  {
    field: "date",
    headerName: "Дата",
    minWidth: 120,
    flex: 0.8,
    hideable: false,
    type: "date",
  },
  {
    field: "score",
    headerName: "Коэффициент",
    minWidth: 100,
    hideable: false,
  },
  {
    field: "boxType",
    headerName: "Тип поставки",
    minWidth: 150,
    flex: 1,
    hideable: false,
  },
  {
    field: "startTime",
    headerName: "Время открытия",
    minWidth: 150,
    flex: 1,
    type: "dateTime",
    hideable: false,
  },
  {
    field: "elapsedTime",
    headerName: "Период доступности",
    minWidth: 150,
    flex: 1,
    hideable: false,
  },
];

function SlotsList(props: SlotListProps) {
  const { slots = [], filterOptions } = props;
  const [colDef, setColDef] = useState(columns);
  const isDesktop = useDesktopMode();
  const dispatch = useAppDispatch();
  const gridFilter = useAppSelector((state) => state.filters.filter);

  useEffect(() => {
    setColDef((prev) => {
      let newDefs = prev.slice();
      let nameDef = newDefs.find((item) => item.field === "name");

      if (nameDef) {
        (nameDef as GridSingleSelectColDef).valueOptions = filterOptions.map(
          (f) => f.name
        );
      }
      return newDefs;
    });
  }, [filterOptions]);

  const [rows, setRows] = useState(slots);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSlots = slots.map((row) => {
        if (!row.endTime && row.startTime) {
          const elapsedTime = msToHuman(getTimeDiff(row.startTime));
          return { ...row, elapsedTime };
        }
        return row;
      });
      setRows(newSlots);
    }, 200);
    return () => clearInterval(interval);
  }, [slots]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: isDesktop ? 3 : 0.5,
        borderRadius: 3,
        border: (theme) => `1px ${theme.palette.text.secondary} solid`,
      }}
    >
      <SectionHeader center text="Доступные слоты" />
      <CustomFilterHeader />
      <DataGrid
        rows={rows}
        columns={colDef}
        slots={{
          row: Slot,
          toolbar: CustomToolbar,
        }}
        filterModel={gridFilter}
        disableColumnSelector
        sx={{
          ".MuiDataGrid-columnHeaders > div": {
            borderRadius: "15px 15px 0 0",
          },
          "& .MuiDataGrid-row.odd": {
            backgroundColor: (theme) => theme.palette.background.paper,
          },
          "& .MuiDataGrid-row.even": {
            backgroundColor: (theme) => theme.palette.background.default,
          },
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        onFilterModelChange={(newFilterModel) => {
          dispatch(setFilter(newFilterModel));
        }}
        localeText={{
          columnMenuSortAsc: "Сортировать по возрастанию",
          columnMenuSortDesc: "Сортировать по возрастанию",
          filterPanelColumns: "Колонка",
          filterPanelOperator: "Оператор",
          filterPanelInputLabel: "Значение",
          filterPanelInputPlaceholder: "Значение",
          columnMenuFilter: "Фильтровать",
          toolbarFiltersLabel: "Фильтровать",
          toolbarFilters: "Фильтровать",
          columnMenuManageColumns: "Управлять колонками",
          columnMenuUnsort: "Очистить сортировку",
          filterOperatorContains: "содержит",
          filterOperatorDoesNotContain: "не содержит",
          filterOperatorEquals: "равно",
          filterOperatorDoesNotEqual: "не равно",
          filterOperatorStartsWith: "начинается с",
          filterOperatorEndsWith: "заканчивается на",
          filterOperatorIs: "является",
          filterOperatorNot: "не является",
          filterOperatorAfter: "после",
          filterOperatorOnOrAfter: "включительно после",
          filterOperatorBefore: "до",
          filterOperatorOnOrBefore: "включительно до",
          filterOperatorIsEmpty: "пусто",
          filterOperatorIsNotEmpty: "не пусто",
          filterOperatorIsAnyOf: "любой из",
          noRowsLabel: "Нет данных",
          noResultsOverlayLabel: "По выбранным фильтрам ничего не найдено",
        }}
      />
    </Paper>
  );
}

export default SlotsList;
