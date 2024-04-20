import React from "react";
import styles from "./index.module.css";
import Slider from "../Slider";

function index() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <h1>CRYPTOFOLIO WATCH LIST</h1>
        <p>Get all the Info regarding your favorite Crypto Currency</p>
      </div>
      <Slider></Slider>
    </nav>
  );
}

export default index;
