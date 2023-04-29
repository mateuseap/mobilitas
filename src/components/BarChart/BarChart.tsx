import React, { useRef, useEffect } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";

interface Props {
  data: number[];
  labels: string[];
}

const BarChart: React.FC<Props> = ({ data, labels }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  let chart: ApexCharts | null = null;

  useEffect(() => {
    if (chartRef.current) {
      chart = new ApexCharts(chartRef.current, getChartOptions(data, labels));
      chart.render();

      return () => {
        if (chart) {
          chart.destroy();
        }
      };
    }
  }, [data, labels]);

  const getChartOptions = (data: number[], labels: string[]): ApexOptions => ({
    chart: {
      type: "bar",
      height: 350,
    },
    series: [
      {
        name: "Data",
        data,
      },
    ],
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: "#ffffff",
        },
        formatter: function (value: string) {
          return `${value}`;
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
  });

  return <div ref={chartRef} />;
};

export default BarChart;
