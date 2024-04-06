"user client";

import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import React from "react";

const ResultChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [songData, setSongData] = useState([]);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      //가져오기 콘텍스트, 2D로 할당
      const context = chartRef.current.getContext("2d");

      const label = chartData.map((items) => items.result);
      console.log("label", label);
      const data = chartData.map((items) => items.result);
      //새 차트 생성
      const newChart = new Chart(context, {
        type: "radar",
        data: {
          labels: ["hiphop", "dance", "ballad", "rnb", "rock"],
          datasets: [
            {
              label: "장르별 음악 선호도",
              data: [32, 72, 48, 62, 57],
              backgroundColor: ["rgb(255,99,132,0.2)"],
              borderColor: "blue",
              borderWidth: 1,
            },
            {
              label: "장르별 음악 비선호도",
              data: [68, 28, 52, 38, 43],
              backgroundColor: ["rgb(255,159,64,0.2)"],
              borderColor: "red",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "퍼스널 뮤직 진단 결과",
            },
          },
        },
      });
      chartRef.current.chart = newChart;
    }
  }, []);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ResultChart;
