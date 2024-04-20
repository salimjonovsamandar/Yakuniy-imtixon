import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./index.module.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Data } from "../../App";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Index() {
  const [cryptoData, setCryptoData] = useState([]);
  const [items, setItems] = useState([]);
  const [Icon, setIcon] = useState("");
  const [Item, setItem, watchItem, setWatchItem] = useContext(Data);
  const navigate = useNavigate()
  const fetchStatisticsCoin = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Item}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      );
      setCryptoData(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  function navitageFunction(el){
    let exsist = watchItem.some(item => item.id == el.id)
    if (!exsist) {
      const update = [...watchItem, el];
      localStorage.setItem("watchlist", JSON.stringify(update));
      setWatchItem(update);
    }
    navigate(`/coins/${el.id}`);
  }

  useEffect(() => {
    if (Item === "USD") {
      setIcon("$");
    } else if (Item === "INR") {
      setIcon("₹");
    } else {
      setIcon("₽");
    }
  }, [Item]);

  useEffect(() => {
    fetchStatisticsCoin();
  }, [Item]);

  useEffect(() => {
    const items = cryptoData.map((crypto) => {
      let change = crypto?.price_change_percentage_24h >= 0;
      return (
        <Link
          onClick={() => {
            navitageFunction(crypto)
          }}
          key={crypto.id}
          to={`/coins/${crypto.id}`}
          className={styles.wrapper}
        >
          <div className={styles.slide}>
            <img src={crypto.image} alt={crypto.name} />
            <div className={styles.caruselItem}>
              <span>
                {crypto.symbol}
                &nbsp;
                <span
                  style={{
                    color: change > 0 ? "rgb(14, 203, 129)" : "red",
                    fontWeight: 500,
                    fontFamily: "Roboto",
                  }}
                >
                  {change && "+"}
                  {crypto?.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </span>
              <p>
                {Icon} {numberWithCommas(crypto?.current_price.toFixed(2))}
              </p>
            </div>
          </div>
        </Link>
      );
    });
    setItems(items);
  }, [cryptoData]);

  return (
    <header className={styles.CaruselWrapper}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        items={items}
        autoPlay
        startIndex={0}
        responsive={{ 0: { items: 1 }, 1024: { items: 4 } }}
      ></AliceCarousel>
    </header>
  );
}

export default Index;
