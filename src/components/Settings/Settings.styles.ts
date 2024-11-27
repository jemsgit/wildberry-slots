import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const buttonStyles = (enabled: boolean): SxProps<Theme> => ({
  color: (theme) => theme.palette.text.primary,
  "& .MuiButton-startIcon": {
    backgroundColor: enabled ? "#039003d4" : "#a20f0fbf",
    borderRadius: "50%",
    padding: "4px",
  },
});
