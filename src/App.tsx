import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import SlotsPage from "./pages/SlotsPage/SlotsPage";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1>Доступные слоты для отгрузки на склады Wildberries</h1>
      <main className="card">
        <SlotsPage />
      </main>
    </ThemeProvider>
  );
}

export default App;
