import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function TotalCard({ assets, display }) {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  const data = {
    labels: assets.map(asset => asset.name),
    datasets: [
      {
        label: 'Balance Distribution',
        data: assets.map(asset => (asset.value / totalValue * 100).toFixed(2)), // Percentages
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    cutout: '70%',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          }
        }
      }
    }
  };

  return (
    <div className={`total-card bg-[#161245] p-6 rounded-lg shadow-md w-full max-w-[293px] max-h-[148px] ${display} justify-around`}>
      <div className="sec-total flex justify-center items-center">
        <div className="total-width mb-6 w-[105px] h-[105px] relative flex-wrap">
          <Doughnut data={data} options={options} />
          <h4 className='balance text-[#0097E8] absolute top-[50%] left-[50%]'>TOTAL</h4>
        </div>
      </div>

      <div className="space-y-4 h-[100px] overflow-auto balance-scroll">
        {assets.map((asset, index) => (
          <div className="flex justify-between text-sm text-white" key={index}>
            <p>{asset.name}</p>
            <p>{(asset.value / totalValue * 100).toFixed(2)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TotalCard;
