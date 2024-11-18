import React, { useEffect, useState } from "react";
import { slotsAdapter } from "../../adapters/api-adapter";
import { Filter as FilterModel } from "../../models/filter";
import {
  Autocomplete,
  Chip,
  FormControl,
  IconButton,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface FilterProps {
  value: FilterModel[];
  onChange: (val: FilterModel[]) => void;
}

function Filter(props: FilterProps) {
  const { value: filterValue, onChange } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [availableOptions, setAvailableOptions] = useState<FilterModel[]>([]);
  const handleDelete = (itemToDelete: FilterModel) => {
    onChange(filterValue.filter((item) => item.name !== itemToDelete.name));
  };

  const handleChange = (_: unknown, value: FilterModel[]) => {
    onChange(value);
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
  }, []);
  if (isLoading) {
    return <div>Filters are loading...</div>;
  }
  return (
    <div>
      <FormControl
        sx={{ m: 1, width: "100%", color: "white", margin: 0, mb: 1 }}
      >
        <Autocomplete
          multiple
          id="tags-outlined"
          options={availableOptions}
          getOptionLabel={(option) => option.name}
          filterSelectedOptions
          value={filterValue}
          onChange={handleChange}
          size="small"
          disableCloseOnSelect
          renderTags={(value: FilterModel[]) =>
            value.map((option: FilterModel, index: number) => (
              <Chip
                key={index}
                variant="outlined"
                label={option.name}
                sx={{ background: "white" }}
                onDelete={() => handleDelete(option)} // Delete selected option
                deleteIcon={
                  <IconButton size="small">
                    <ClearIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                }
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Склады"
              placeholder="Имя склада"
              sx={{ color: "white" }}
            />
          )}
          sx={{ backgroundColor: "white", borderRadius: "4px" }}
        />
      </FormControl>
    </div>
  );
}

export default Filter;
