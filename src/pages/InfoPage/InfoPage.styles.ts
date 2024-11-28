import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const container: SxProps<Theme> = { textAlign: "left" };
export const plate: SxProps<Theme> = { p: 2, borderRadius: 3 };
export const header: SxProps<Theme> = {
  color: (theme) => theme.palette.text.secondary,
  mb: 2,
};
