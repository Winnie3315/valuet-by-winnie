import React, { useEffect, useState, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useHttpRequest } from '../hooks/http.request';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function TotalCard({ display }) {
  const [wallets, setWallets] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const chartRef = useRef(null);

  const { request, loading, error } = useHttpRequest('http://localhost:8080');
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      const data = await request(`/wallets?user_id=${user.user_id}`);
      
      if (data) {
        setWallets(data);

        const total = data.reduce((acc, item) => acc + +item.balance, 0);
        setTotalBalance(total);
      }
    };

    fetchData();
  }, [request, user.user_id]);

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
    labels: wallets.map(wallet => wallet.wallet),
    datasets: [
      {
        label: 'Wallets Distribution',
        data: wallets.map(wallet => wallet.balance),
        backgroundColor: wallets.map((wallet, index) => {
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
    <div className={`total-card bg-[#161245] p-6 rounded-lg shadow-md w-full max-w-[293px] max-h-[148px] ${display} justify-around`}>
      <div className="sec-total flex justify-center items-center">
        <div className="total-width mb-6 w-[105px] h-[105px] relative flex-wrap">
          <Doughnut data={data} options={options} ref={chartRef} />
          <h4 className='balance text-[#0097E8] absolute top-[50%] left-[50%]'>TOTAL</h4>
        </div>
      </div>

      <div className="space-y-4 h-[100px] overflow-auto balance-scroll">
        {wallets.map((wallet, index) => (
          <div className="flex justify-between text-sm text-white" key={index}>
            <p>{wallet.wallet}</p>
            <p>${wallet.balance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TotalCard;
