import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridSingleSelectColDef } from "@mui/x-data-grid";

import { Filter as FilterModel } from "../../models/filter";
import { Slot as SlotModel } from "../../models/slot";
import { msToHuman } from "../../utils/date-utils";
import Slot from "../Slot/Slot";
import CustomToolbar from "../CustomToolbar/CustomToolbar";
import { Paper } from "@mui/material";
import SectionHeader from "../SectionHeader/SectionHeader";

interface SlotListProps {
  slots: SlotModel[];
  filterOptions: FilterModel[];
}

const columns: GridColDef[] = [
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
    width: 150,
    flex: 1,
    hideable: false,
    type: "date",
  },
  {
    field: "score",
    headerName: "Коэффициент",
    width: 100,
    hideable: false,
  },
  {
    field: "boxType",
    headerName: "Тип поставки",
    width: 150,
    flex: 1,
    hideable: false,
  },
  {
    field: "startTime",
    headerName: "Время открытия",
    width: 150,
    flex: 1,
    type: "dateTime",
    hideable: false,
  },
  {
    field: "elapsedTime",
    headerName: "Период доступности",
    width: 150,
    flex: 1,
    hideable: false,
  },
];

function SlotsList(props: SlotListProps) {
  const { slots = [], filterOptions } = props;
  const [colDef, setColDef] = useState(columns);

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
          const elapsedTime = msToHuman(Date.now() - row.startTime.getTime());
          return { ...row, elapsedTime };
        }
        return row;
      });
      setRows(newSlots);
    }, 100);

    return () => clearInterval(interval);
  }, [slots]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        border: (theme) => `1px ${theme.palette.text.secondary} solid`,
      }}
    >
      <SectionHeader center text="Доступные слоты" />

      <DataGrid
        rows={rows}
        columns={colDef}
        slots={{
          row: Slot,
          toolbar: CustomToolbar,
        }}
        sx={{
          ".MuiDataGrid-columnHeaders > div": {
            borderRadius: "15px",
          },
        }}
        localeText={{
          columnMenuSortAsc: "Сортировать по возрастанию",
          columnMenuSortDesc: "Сортировать по возрастанию",
          filterPanelColumns: "Колонка",
          filterPanelOperator: "Оператор",
          filterPanelInputLabel: "Значение",
          filterPanelInputPlaceholder: "Занчение",
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
        }}
      />
    </Paper>
  );
}

export default SlotsList;
