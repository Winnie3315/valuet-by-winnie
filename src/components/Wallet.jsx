// EthereumCard.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function Wallet() {
    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [
            {
                label: 'Ethereum Price',
                data: [5000, 5200, 4900, 5500, 5300, 5700, 6000, 5800, 6000, 5248],
                fill: false,
                borderColor: 'rgba(0, 150, 255, 1)',
                borderWidth: 2, 
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Убираем аспектное соотношение
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    display: false, // Убираем метки на оси Y
                },
            },
            x: {
                grid: {
                    display: false, // Убираем сетку по оси X
                },
                ticks: {
                    display: false, // Убираем метки на оси X
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
    };

    return (
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-4 rounded-xl text-white shadow-lg w-[300px] h-[148px]">
            <h2 className="text-xl font-semibold">Ethereum</h2>
            <h3 className="text-2xl font-bold mt-1">5 248 USD</h3>
            <p className="text-sm text-gray-300">+2,59%</p>
            <div className="wallet-chart-container h-[75px] w-full mt-2">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default Wallet;
