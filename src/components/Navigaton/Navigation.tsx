import {
  AppBar,
  Box,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TelegramIcon from "@mui/icons-material/Telegram";

interface PageInfo {
  title: string;
  link: string;
}

const tgLink = "https://t.me/AngrySlots";

const pages: PageInfo[] = [
  {
    title: "Доступные слоты",
    link: "/",
  },
  {
    title: "О проекте",
    link: "/info",
  },
  {
    title: "Инструкция",
    link: "/tutorial",
  },
];

const redirectTg = () => {
  window.open(tgLink, "_blank");
};

function Navigation() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      enableColorOnDark
      sx={{
        borderRadius: "10px",
        minHeight: "82px",
        mb: 2,
        background: (theme) => theme.palette.background.default,
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: "82px", alignItems: "center" }}>
        <Typography
          variant="h6"
          color="white"
          component="div"
          sx={{ mr: 2, flexGrow: 1.5, textAlign: "left" }}
        >
          Angry Slots
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            flexDirection: "row",
            display: "flex",
            alignItems: "baseline",
            gap: 2,
          }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.link}
              onClick={() => navigate(page.link)}
              sx={{
                backgroundColor: (theme) => theme.palette.common.black,
                color: "#fff",
                borderRadius: 2,
              }}
            >
              {page.title}
            </MenuItem>
          ))}
        </Box>
        <IconButton
          onClick={redirectTg}
          sx={{
            background: "#ddb606f7",
            width: 48,
            height: 48,
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#ddb606f7",
            },
          }}
        >
          <TelegramIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
