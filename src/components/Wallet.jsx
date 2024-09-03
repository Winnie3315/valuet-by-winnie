import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useHttpRequest } from '../hooks/http.request';

Chart.register(...registerables);

function Wallet({currency, balance, name}) {
    const [dataPoints, setDataPoints] = useState([]);
    const { request, loading, error } = useHttpRequest('http://localhost:8080');
    useEffect(() => {
        const fetchData = async () => {
            const transactionsData = await request('/transactions?wallet_id=your_wallet_id'); // Adjust path as needed

            if (transactionsData) {
                const formattedData = transactionsData.map(transaction => ({
                    x: new Date(transaction.date).toLocaleDateString(),
                    y: transaction.amount,
                }));

                setDataPoints(formattedData);
            }
        };

        fetchData();
    }, [request]);

    const data = {
        labels: dataPoints.map(point => point.x),
        datasets: [
            {
                label: 'Ethereum Price',
                data: dataPoints.map(point => point.y),
                fill: false,
                borderColor: 'rgba(0, 150, 255, 1)',
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
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
        <div className="wallet-card bg-gradient-to-r from-purple-900 to-blue-900 p-4 rounded-xl text-white shadow-lg !w-[300px] h-[148px]">
            <h2 className="text-xl font-semibold">{name}</h2>
            <h3 className="text-[16px] text-right font-bold mt-1">{balance} {currency}</h3>
            <div className="wallet-chart-container h-[70px] w-full mt-2">
                {loading ? <p>Loading...</p> : error ? <p>Error: {error}</p> : <Line data={data} options={options} />}
            </div>
        </div>
    );
}

export default Wallet;
