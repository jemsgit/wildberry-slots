import { Box } from "@mui/material";
import { cointainer, content } from "./MainLayout.styles";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigaton/Navigation";
import Footer from "../Footer/Footer";

function MainLayout() {
  return (
    <Box sx={cointainer}>
      <Box sx={{ backgroundColor: (theme) => theme.palette.background.paper }}>
        <Navigation />
        <Box sx={content}>
          <Outlet />
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
