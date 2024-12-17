import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/PopulationChart.css'; // Asegúrate de que la ruta sea correcta

// Registramos los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PopulationChart = ({ data }) => {
  // Preparamos los datos para el gráfico
  const chartData = {
    labels: data.map(item => item.year), // Extraemos los años
    datasets: [
      {
        label: 'Población',
        data: data.map(item => item.value), // Extraemos los valores de población
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1, // Suaviza la línea
        pointRadius: 0, // Elimina los puntos en la línea
        borderWidth: 3, // Establece el grosor de la línea
      }
    ]
  };

  const options = {
    responsive: true, // Asegura que el gráfico sea responsivo
    maintainAspectRatio: false, // Asegura que el gráfico mantenga su aspecto sin restricciones
    plugins: {
      legend: {
        position: 'top', // Posición de la leyenda
      }
    },
    animation: {
      duration: 0, // Desactiva las animaciones para evitar el "vibrado"
    },
    interaction: {
      mode: 'nearest', // Mejor comportamiento de hover
      intersect: false, // Desactiva el efecto de intersección
      axis: 'x', // Establece que la interacción solo se de sobre el eje X (evita que el cursor se mueva verticalmente)
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Años',
        },
        grid: {
          display: false, // Desactiva las líneas de la cuadrícula en el eje X
        },
      },
      y: {
        title: {
          display: true,
          text: 'Población',
        },
        grid: {
          display: false, // Desactiva las líneas de la cuadrícula en el eje Y
        },
      },
    },
    elements: {
      line: {
        tension: 0.1, // Suaviza la línea
        borderWidth: 3, // Ancho de la línea
        fill: false, // Evita que el área debajo de la línea se llene
      },
      point: {
        radius: 0, // Elimina los puntos en la línea
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
