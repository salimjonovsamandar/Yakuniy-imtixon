import React from "react";
import styles from "./index.module.css";
import { Select, MenuItem, createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import WatchList from "../WatchList";
import { useState } from "react";
import { useContext } from "react";
import { Data as DataContext } from "../../App";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Index() {
  const [showModal, setShowModal] = useState(false);
  const [Item, setItem] = useContext(DataContext);

  const handleCurrencyChange = (event) => {
    setItem(event.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link to={"/"}>CRYPTOFOLIO</Link>
          </div>
          <div className={styles.navigate}>
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className={styles.select}
              style={{ border: "none" }}
              onChange={handleCurrencyChange}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"RUB"}>RUB</MenuItem>
            </Select>
            <WatchList onClose={closeModal} />
          </div>
        </div>
      </header>
    </ThemeProvider>
  );
}

export default Index;
