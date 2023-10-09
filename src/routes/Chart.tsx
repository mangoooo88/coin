import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from 'react-apexcharts'
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
  coinId: string
}

interface IHitorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface IRouterProps {
}

function Chart() {
  const {coinId} = useOutletContext<ChartProps>()
  const {isLoading, data} = useQuery<IHitorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {
    cacheTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
  })
  const isDark = useRecoilValue(isDarkAtom)

  return (
    <div>
      {
        isLoading ?
          "로딩중..." :
          <ApexChart type="line" series={
            [
              {
                name: 'price',
                data: data?.map(price => price.close) as number[]
              }
            ]
          } options={
            {
              theme: {
                mode: isDark ? "dark" : 'light'
              },
              chart: {
                height: 500,
                width: 500,
                toolbar: {
                  show: false
                },
                background: 'transparent'
              },
              grid: {
                show: false
              },
              stroke: {
                curve: 'smooth',
                width: 5
              },
              yaxis: {
                show: false
              },
              xaxis: {
                axisTicks: {show: false},
                axisBorder: {show: false},
                labels: {show: false},
                type: 'datetime',
                categories: data?.map((price) => new Date(price.time_close * 1000).toISOString())
              },
              fill: {
                type: 'gradient',
                gradient: {
                  gradientToColors: ["blue"],
                  stops: [0, 100]
                }
              },
              colors: ['red'],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`
                }
              },
            }
          }/>}
    </div>
  );
}

export default Chart;