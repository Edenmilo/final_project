import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function Graph({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy(); 
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((_, index) => index + 1),
        datasets: [
          {
            label: "Weight",
            data: data,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Entries",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Weight",
            },
            ticks: {
              stepSize: 1, 
              precision: 0
            },
          },
        },
      },
    });
  }, [data]);

  return <canvas ref={chartRef} />;
}

export default Graph;
