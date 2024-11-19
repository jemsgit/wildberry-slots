import { Filter as FilterModel } from "../../models/filter";
import {
  Autocomplete,
  Chip,
  FormControl,
  IconButton,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  autocompleteStyles,
  containerStyles,
  controlStyles,
  textFieldStyles,
} from "./Filter.styles";

interface FilterProps {
  value: FilterModel[];
  availableOptions: FilterModel[];
  isLoading: boolean;
  onChange: (val: FilterModel[]) => void;
}

function Filter(props: FilterProps) {
  const {
    value: filterValue,
    onChange,
    isLoading,
    availableOptions = [],
  } = props;
  const handleDelete = (itemToDelete: FilterModel) => {
    onChange(filterValue.filter((item) => item.name !== itemToDelete.name));
  };

  const handleChange = (_: unknown, value: FilterModel[]) => {
    onChange(value);
  };

  if (isLoading) {
    return <div>Filters are loading...</div>;
  }
  return (
    <div style={containerStyles}>
      <FormControl sx={controlStyles}>
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
              sx={textFieldStyles}
            />
          )}
          sx={autocompleteStyles}
        />
      </FormControl>
    </div>
  );
}

export default Filter;
