import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { colors, Pagination } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { useContext } from "react";
import { Data } from "../../App";
import Loader from "../Loader";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "skyblue",
    },
  },
}));

function Index() {
  const [statistics, setStatistics] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [Icon, setIcon] = useState("");
  const [loader, setLoader] = useState(false);

  const [Item, setItem, watchItem, setWatchItem] = useContext(Data);

  useEffect(() => {
    if (Item === "USD") {
      setIcon("$");
    } else if (Item === "INR") {
      setIcon("₹");
    } else {
      setIcon("₽");
    }
  }, [Item]);

  const fetchStatisticsCoin = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Item}&order=market_cap_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
      );
      setStatistics(response.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const handleSearch = () => {
    return statistics.filter(
      (statistic) =>
        statistic.name.toLowerCase().includes(search) ||
        statistic.symbol.toLowerCase().includes(search)
    );
  };

  useEffect(() => {
    fetchStatisticsCoin();
  }, [page, Item]);
  const classes = useStyles();

  function navitageFunction(el) {
    let exsist = watchItem.some((item) => item.id == el.id);
    if (!exsist) {
      const update = [...watchItem, el];
      localStorage.setItem("watchlist", JSON.stringify(update));
      setWatchItem(update);
    }
    navigate(`/coins/${el.id}`);
  }
  return (
    <div className={styles.container}>
      <h2>Cryptocurrency Prices by Market Cap</h2>
      <input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search For a Crypto Currency.."
        type="search"
      />
      <table className={styles.cryptoTable}>
        {loader ? (
          <Loader />
        ) : (
          <>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>Market Cap</th>
              </tr>
            </thead>

            <tbody>
              {handleSearch().map((el, index) => {
                const profit = el.price_change_percentage_24h > 0;
                return (
                  <tr
                    onClick={() => {
                      navitageFunction(el);
                    }}
                    key={index}
                  >
                    <td className={styles.tableCion}>
                      <img src={el.image} width="50" height="50" alt="" />
                      <div className={styles.tableCionTitle}>
                        <span style={{ textTransform: "uppercase" }}>
                          {el.symbol}
                        </span>
                        <span>{el.name}</span>
                      </div>
                    </td>

                    <td>
                      {Icon} {numberWithCommas(el.current_price.toFixed(2))}
                    </td>
                    <td
                      style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {profit && "+"}
                      {el.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td>
                      {Icon}
                      {numberWithCommas(el.market_cap.toString().slice(0, -6))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </>
        )}
      </table>
      <Pagination
        count={10}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ ul: classes.ul }}
        onChange={(_, value) => {
          setPage(value);
          window.scrollTo(0, 450);
        }}
        color="primary"
      />
    </div>
  );
}

export default Index;
