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
  padding: "0.5em 2em 2em",
  boxSizing: "border-box",
  textAlign: "center",
};

export const mobileContent = {
  maxWidth: "1280px",
  width: "100%",
  margin: "0 auto",
  padding: "0.5em",
  boxSizing: "border-box",
  textAlign: "center",
};
