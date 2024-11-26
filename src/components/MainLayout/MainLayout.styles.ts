import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const cointainer: SxProps<Theme> = {
  minHeight: "100vh",
  width: "100%",
  margin: 0,
  padding: 0,
  backgroundColor: (theme) => theme.palette.background.paper,
};

export const content = {
  maxWidth: "1280px",
  width: "100%",
  margin: "0 auto",
  padding: "2em",
  boxSizing: "border-box",
  textAlign: "center",
};
