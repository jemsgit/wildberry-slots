import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SlotsPage from "./pages/SlotsPage/SlotsPage";

function App() {
  return (
    <>
      <h1>Доступные слоты для отгрузки на склады Wildberries</h1>
      <main className="card">
        <SlotsPage />
      </main>
    </>
  );
}

export default App;
