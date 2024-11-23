import { Box, Popover, TextField, TextFieldProps } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ru } from "date-fns/locale/ru";
registerLocale("ru", ru);

const anchorOrigin = {
  vertical: "bottom" as "bottom",
  horizontal: "left" as "left",
};

interface Props {
  locale: string;
  inputProps: TextFieldProps;
  value?: string | null;
  onChange: (val: string) => void;
}

const DateInput: FC<Props> = ({ locale, inputProps, onChange, value }) => {
  const [datepickerOpen, setDatepickerOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    setSelectedValue(value ?? "");
  }, [value]);

  const input = (
    <TextField
      value={value ?? selectedValue}
      onChange={(e) => {
        setSelectedValue(e.target.value);
        onChange?.(e.target.value);
      }}
      onClick={() => {
        setDatepickerOpen(!datepickerOpen);
      }}
      {...inputProps}
    />
  );

  const ref = useRef(null);

  return (
    <Box ref={ref}>
      {input}
      {datepickerOpen && (
        <Popover
          anchorEl={ref.current}
          open={datepickerOpen}
          onClose={() => setDatepickerOpen(false)}
          anchorOrigin={anchorOrigin}
        >
          <Box paddingY={{ desktop: 2 }} display="flex" justifyContent="center">
            <DatePicker
              locale={locale}
              inline
              minDate={new Date()}
              onSelect={(newValue) => {
                if (newValue) {
                  let dateFormatted = newValue.toLocaleDateString();

                  const date = dateFormatted;
                  setSelectedValue(date);
                  onChange?.(date);
                  setDatepickerOpen(false);
                }
              }}
            />
          </Box>
        </Popover>
      )}
    </Box>
  );
};

export default DateInput;
