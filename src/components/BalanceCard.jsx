import { useHttpRequest } from '../hooks/http.request';
import React, { useEffect, useState, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function BalanceCard({ display }) {
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const chartRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const { request, loading, error } = useHttpRequest('http://localhost:8080'); 

  useEffect(() => {
    const fetchData = async () => {
      const data = await request(`/wallets?user_id=${user.user_id}`);
      
      if (data) {
        setTransactions(data);

        const total = data.reduce((acc, item) => acc + +item.balance, 0);
        setTotalBalance(total);
      }
    };

    fetchData();
  }, [request, user.id]);

  const createGradient = (ctx, index) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    const colors = [
      ['#FF5733', '#FFBD33'],
      ['#33FF57', '#33FFBD'],
      ['#5733FF', '#BD33FF'],
      ['#FF33BD', '#FF5733'] 
    ];

    const colorSet = colors[index % colors.length];

    gradient.addColorStop(0, colorSet[0]);
    gradient.addColorStop(1, colorSet[1]);

    return gradient;
  };

  const data = {
    labels: transactions.map(transaction => transaction.wallet),
    datasets: [
      {
        label: 'Wallet Balance Distribution',
        data: transactions.map(transaction => transaction.balance),
        backgroundColor: transactions.map((transaction, index) => {
          const chart = chartRef.current;
          if (chart) {
            const ctx = chart.ctx;
            return createGradient(ctx, index);
          }
          return '#000';
        }),
        borderWidth: 1,
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
  };

  return (
    <div className={`balance-card bg-[#161245] p-6 rounded-lg shadow-md w-full max-h-[331px] ${display}`}>
      <h4 className="text-lg font-semibold mb-4 text-white">Overview</h4>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <>
          <div className="sec flex justify-center items-center">
            <div className="mb-6 w-[145px] h-[145px] relative">
              <Doughnut data={data} options={options} ref={chartRef} />
              <h4 className='balance text-[#0097E8] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                ${totalBalance.toFixed(2)}
              </h4>
            </div>
          </div>

          <div className="space-y-4 h-[70px] overflow-auto balance-scroll">
            {transactions.map((transaction, index) => (
              <div className="flex justify-between text-sm text-white" key={index}>
                <p>{transaction.wallet}</p>
                <p>${transaction.balance}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BalanceCard;
