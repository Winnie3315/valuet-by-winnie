import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function BalanceCard() {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Balance Distribution',
        data: [12, 19, 3, 5, 2, 3],
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
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-[#161245] p-6 rounded-lg shadow-md w-full max-w-[225px]">
      <h4 className="text-lg font-semibold mb-4 text-white">Balance</h4>
      <div className="mb-6 w-[145px] h-[145px]">
        <Doughnut data={data} options={options} />
      </div>
      <div className="space-y-4 h-[70px] overflow-auto balance-scroll">
        <div className="flex justify-between text-sm text-white">
          <p>Red</p>
          <p>12%</p>
        </div>
        <div className="flex justify-between text-sm text-white">
          <p>Blue</p>
          <p>19%</p>
        </div>
        <div className="flex justify-between text-sm text-white">
          <p>Yellow</p>
          <p>3%</p>
        </div>
        <div className="flex justify-between text-sm text-white">
          <p>Green</p>
          <p>5%</p>
        </div>
        <div className="flex justify-between text-sm text-white">
          <p>Purple</p>
          <p>2%</p>
        </div>
        <div className="flex justify-between text-sm text-white">
          <p>Orange</p>
          <p>3%</p>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
