import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/PopulationChart.css'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PopulationChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.year),
    datasets: [
      {
        label: 'Población',
        data: data.map(item => item.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1, 
        pointRadius: 0, 
        borderWidth: 3, 
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    animation: {
      duration: 0,
    },
    interaction: {
      mode: 'nearest', 
      intersect: false, 
      axis: 'x',
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Años',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Población',
        },
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.1,
        borderWidth: 3, 
        fill: false,
      },
      point: {
        radius: 0, 
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PopulationChart;
