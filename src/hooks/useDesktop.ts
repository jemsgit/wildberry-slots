import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const useDesktopMode = () =>
  useMediaQuery(useTheme().breakpoints.up("desktop"));
