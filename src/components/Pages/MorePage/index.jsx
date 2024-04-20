import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import Charts from "../../Charts";
import Loader from "../../Loader";
import { Data } from "../../../App";
import { useContext } from "react";

function MorePage() {
  const { id } = useParams();
  const [coinInfo, setCoinInfo] = useState(null);
  const [Icon, setIcon] = useState("");
  const [Item, setItem] = useContext(Data);

  useEffect(() => {
    if (Item === "USD") {
      setIcon("$");
    } else if (Item === "INR") {
      setIcon("₹");
    } else {
      setIcon("₽");
    }
    console.log(Item);
  }, [Item]);

  useEffect(() => {
    const fetchCoinInfo = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCoinInfo(response.data);
      } catch (error) {
        console.error("Error fetching coin info:", error);
      }
    };

    fetchCoinInfo();
  }, [id, Item]);

  if (!coinInfo)
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  return (
    <div className={styles.MoreWrapper}>
      <div className={styles.container}>
        <img src={coinInfo.image.large} alt={coinInfo.name} />
        <h3>{coinInfo.name}</h3>
        <h5>{ReactHtmlParser(coinInfo.description.en.split(". ")[0])}</h5>
        <p>
          Rank: <span>{coinInfo.market_cap_rank}</span>
        </p>
        <p>
          Current Price:{" "}
          <span>
            {Icon}{" "}
            {Number(
              coinInfo?.market_data.market_cap[Item.toLowerCase()]
            ).toLocaleString()}
          </span>
        </p>
        <p>
          Market Cap:{" "}
          <span>
            {Icon}{" "}
            {Number(
              coinInfo?.market_data.current_price[Item.toLowerCase()]
            ).toLocaleString()}
          </span>
        </p>
      </div>
      <Charts id={coinInfo.id}></Charts>
    </div>
  );
}

export default MorePage;
