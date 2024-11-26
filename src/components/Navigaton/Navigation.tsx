import { AppBar, Link, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface Props {}

interface PageInfo {
  title: string;
  link: string;
}

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

function Navigation(props: Props) {
  const {} = props;

  return (
    <AppBar position="static" enableColorOnDark>
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div" sx={{ mr: 2 }}>
          Angry Slots
        </Typography>
        {pages.map((page) => (
          <MenuItem key={page.link}>
            <Link
              component={RouterLink}
              to={page.link}
              sx={{
                marginRight: 2,
                color: (theme) => theme.palette.common.black,
                textDecoration: "none",
              }}
            >
              {page.title}
            </Link>
          </MenuItem>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
