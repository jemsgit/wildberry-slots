import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useDesktopMode } from "../../hooks/useDesktop";
import React, { useState } from "react";

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
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const isDesktop = useDesktopMode();

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
          sx={{
            mr: isDesktop ? 2 : 0.5,
            flexGrow: isDesktop ? 1.5 : 0.2,
            textAlign: "left",
          }}
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
          {!isDesktop ? (
            <>
              <IconButton
                edge="start"
                color="secondary"
                aria-label="menu"
                sx={{
                  backgroundColor: (theme) => theme.palette.common.black,
                  color: "#fff",
                }}
                onClick={handleMenuOpen}
              >
                <MenuIcon
                  fontSize="medium"
                  sx={{
                    color: "#fff",
                  }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {pages.map((page) => (
                  <MenuItem
                    onClick={() => {
                      navigate(page.link);
                      handleMenuClose();
                    }}
                  >
                    {page.title}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
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
            </>
          )}
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
