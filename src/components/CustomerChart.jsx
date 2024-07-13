import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import ClipLoader from "react-spinners/ClipLoader";

function CustomerChart({ transactions }) {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay or handle actual data fetching logic here
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust the delay as needed
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [transactions]);

  useEffect(() => {
    return () => {
      // Cleanup the chart instance on component unmount
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader size={50} color="#000" />
      </div>
    );
  }

  if (!transactions.length) {
    return <div>No transactions available for this customer.</div>;
  }

  const data = {
    labels: transactions.map((t) => t.date),
    datasets: [
      {
        label: "Transaction Amount",
        data: transactions.map((t) => t.amount),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-4 p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      <div className="h-96">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}

export default CustomerChart;
