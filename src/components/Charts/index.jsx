import React, { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import { createTheme, ThemeProvider } from "@mui/material";
import "chart.js/auto";
import axios from "axios";
import styles from "./index.module.css";
import { Data } from "../../App";
import Loader from "../Loader";

const Chart = ({ id }) => {
  const [Item] = useContext(Data);
  const [chartInfoData, setchartInfoData] = useState();
  const [times, setTimes] = useState(24);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    ItemsData();
  }, [times, Item]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const HandleTimes = () => {
    ItemsData();
  };

  const ItemsData = async () => {
    setLoader(true);
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=USD&days=${times}`
      );
      setchartInfoData(data.prices);
      setLoader(false);
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.ChartWrapper}>
        {" "}
        {!chartInfoData?.length || loader ? (
          <Loader></Loader>
        ) : (
          <>
            <Line
              data={{
                labels: chartInfoData?.map((coin) => {
                  const date = new Date(coin[0]);
                  const time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return times === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: chartInfoData.map((coin) => coin[1]),
                    label: `Price ( Past ${times} Days ) in ${Item}`,
                    borderColor: "skyblue",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div className={styles.buttonWrapper}>
              <button
                onClick={() => {
                  setTimes(24);
                  HandleTimes();
                }}
              >
                24 Hours
              </button>
              <button
                onClick={() => {
                  setTimes(30);
                  HandleTimes();
                }}
              >
                30 Days
              </button>
              <button
                onClick={() => {
                  setTimes(3);
                  HandleTimes();
                }}
              >
                3 Months
              </button>
              <button
                onClick={() => {
                  setTimes(1);
                  HandleTimes();
                }}
              >
                1 Year
              </button>
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Chart;
