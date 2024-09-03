import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const MarketChart = () => {
    const data = {
        labels: ['NOV 15', 'NOV 16', 'NOV 17', 'NOV 18', 'NOV 19', 'NOV 20', 'NOV 21', 'NOV 22'],
        datasets: [
            {
                label: 'Market',
                data: [2000, 4000, 6000, 8000, 6000, 9000, 7000, 10000],
                fill: false,
                borderColor: 'rgba(0, 150, 255, 1)',
                borderWidth: 2,
                tension: 0.4,
                borderRadius: 100,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: false,
                },
            },
            x: {
                display: false,
                title: {
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
        <div className="bg-[#161245] p-4 rounded-xl text-white shadow-lg w-[665px] min-w-[600px] h-[232px]">
            <div className="textClass flex gap-[24px]">
            <h2 className="text-xl font-semibold mb-2">Market</h2>
            <h3 className="text-lg mb-4">Bitcoin</h3>
            </div>
            <div className="h-[170px] w-full">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default MarketChart;
