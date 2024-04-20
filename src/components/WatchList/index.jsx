import React, { useContext, useState } from "react";
import { Drawer } from "@mui/material";
import { Data } from "../../App";
import styles from "./index.module.css";

function Index() {
  const [state, setState] = useState({
    right: false,
  });
  const [item, setItem, watchItem, setWatchItem] = useContext(Data);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const openModal = () => {
    setState({ ...state, right: true });
  };

  const removeItem = (index) => {
    const deleteWatchItem = [...watchItem];
    deleteWatchItem.splice(index, 1);
    localStorage.setItem("watchList", JSON.stringify(deleteWatchItem));
    setWatchItem(deleteWatchItem);
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={styles.container}>
              <h3>WATCHLIST</h3>
              <div className={styles.CardWrapper}>
                {watchItem.length > 0 &&
                  watchItem.map((el, index) => {
                    return (
                      <div key={index} className={styles.CoinWrapper}>
                        <img src={el.image} width={118} height={118} alt="" />
                        <p>₹{el.current_price}</p>
                        <button
                          onClick={() => {
                            removeItem(index);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
      <button onClick={openModal} className={styles.button}>
        WATCH LIST
      </button>
    </div>
  );
}

export default Index;
