import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
// Styles
import "./App.css";
// Components
import Header from "./components/Header";
// Pages
import MorePage from "../src/components/Pages/MorePage";
import HomePages from "../src/components/Pages/HomePages";

export const Data = createContext();

function App() {
  const [Item, setItem] = useState("USD");
  const [watchItem, setWatchItem] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );

  return (
    <Data.Provider value={[Item, setItem, watchItem, setWatchItem]}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/coins/:id" element={<MorePage />} />
        </Routes>
      </BrowserRouter>
    </Data.Provider>
  );
}

export default App;
