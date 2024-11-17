import React, { useEffect, useState } from "react";
import { slotsAdapter } from "../../adapters/api-adapter";
import { Filter as FilterModel } from "../../models/filter";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface FilterProps {
  value: string[];
  onChange: (val: string[]) => void;
}

function Filter(props: FilterProps) {
  const { value: filterValue, onChange } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [availableOptions, setAvailableOptions] = useState<FilterModel[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof filterValue>) => {
    const {
      target: { value },
    } = event;
    onChange(value as string[]);
  };
  useEffect(() => {
    slotsAdapter
      .getSlotsFilters()
      ?.then((res) => {
        if (res) {
          setAvailableOptions(res);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  });
  if (isLoading) {
    return <div>Filters are loading...</div>;
  }
  return (
    <div>
      Выбранные склады: {filterValue.map((item) => item)}
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={filterValue}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
        >
          {availableOptions.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Filter;
