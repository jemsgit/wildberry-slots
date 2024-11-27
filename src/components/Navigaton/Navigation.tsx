import {
  AppBar,
  Box,
  Button,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();

  console.log(location.pathname);

  return (
    <AppBar position="static" enableColorOnDark>
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div" sx={{ mr: 2 }}>
          Angry Slots
        </Typography>
        <Box sx={{ flexGrow: 1, flexDirection: "row", display: "flex" }}>
          {pages.map((page) => (
            <MenuItem
              key={page.link}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
                borderRadius: "5px",
              }}
              onClick={() => navigate(page.link)}
              selected={location.pathname === page.link}
            >
              {page.title}
            </MenuItem>
          ))}
        </Box>
        <Button
          onClick={redirectTg}
          endIcon={<TelegramIcon />}
          sx={{ color: (theme) => theme.palette.common.black }}
        >
          Наш Telegram
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
