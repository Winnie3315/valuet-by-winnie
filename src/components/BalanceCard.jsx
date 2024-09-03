import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function BalanceCard({ display, transactions }) {
  const labels = transactions.map(transaction => transaction.sender_wallet.name || transaction.category);
  const dataValues = transactions.map(transaction => transaction.amount);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Transaction Distribution',
        data: dataValues,
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
          label: function(tooltipItem) {
            return `${tooltipItem.label}: $${tooltipItem.raw}`;
          }
        }
      }
    }
  }

  return (
    <div className={`balance-card bg-[#161245] p-6 rounded-lg shadow-md w-full max-h-[331px] ${display}`}>
      <h4 className="text-lg font-semibold mb-4 text-white">Overview</h4>
      <div className="sec flex justify-center items-center">
        <div className="mb-6 w-[145px] h-[145px] relative">
          <Doughnut data={data} options={options} />
          <h4 className='balance text-[#0097E8] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>BALANCE</h4>
        </div>
      </div>

      <div className="space-y-4 h-[70px] overflow-auto balance-scroll">
        {transactions.map((transaction, index) => (
          <div className="flex justify-between text-sm text-white" key={index}>
            <p>{transaction.sender_wallet.name || transaction.category}</p>
            <p>${transaction.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BalanceCard;
