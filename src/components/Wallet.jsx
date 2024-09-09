import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useHttpRequest } from '../hooks/http.request';

Chart.register(...registerables);

function Wallet({ currency, balance, name, walletId, background }) {
    const [dataPoints, setDataPoints] = useState([]);
    const { request, loading, error } = useHttpRequest('http://localhost:8080');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactionsData = await request(`/transactions?wallet_id=${walletId}`, 'get');

                if (transactionsData && transactionsData.length) {
                    const formattedData = transactionsData.map(transaction => ({
                        x: new Date(transaction.created_at).toLocaleDateString(),
                        y: transaction.amount,
                    }));

                    setDataPoints(formattedData);
                } else {
                    setDataPoints([]);
                }
            } catch (err) {
                console.error('Error fetching transactions:', err);
            }
        };

        if (walletId) {
            fetchData();
        }
    }, [request, walletId]);

    const data = {
        labels: dataPoints.length ? dataPoints.map(point => point.x) : ['No Data'],
        datasets: [
            {
                label: 'Transaction Amount',
                data: dataPoints.length ? dataPoints.map(point => point.y) : [0],
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
                    display: true,
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    display: true,
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
        <div
            className="wallet-card p-4 rounded-xl text-white shadow-lg !w-[300px] h-[148px]"
            style={{ background }}
        >
            <h2 className="text-xl font-semibold">{name}</h2>
            <h3 className="text-[16px] text-right font-bold mt-1">
                {balance.toLocaleString()} {currency}
            </h3>
            <div className="wallet-chart-container h-[70px] w-full mt-2">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : dataPoints.length > 0 ? (
                    <Line data={data} options={options} />
                ) : (
                    <p>No transactions to display</p>
                )}
            </div>
        </div>
    );
}

export default Wallet;
