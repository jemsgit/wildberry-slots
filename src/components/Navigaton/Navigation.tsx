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
        mb: 2,
        background: "rgba(255, 211, 105, 0.6)",
      }}
    >
      <Toolbar variant="dense">
        <Typography
          variant="h6"
          color="inherit"
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
          }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.link}
              onClick={() => navigate(page.link)}
              sx={{ color: "#fff" }}
            >
              {page.title}
            </MenuItem>
          ))}
        </Box>
        <IconButton
          onClick={redirectTg}
          sx={{
            background: "#ddb606f7",
            width: 32,
            height: 32,
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
