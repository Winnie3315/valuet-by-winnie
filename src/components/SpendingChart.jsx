import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const SpendingChart = () => {
    const data = {
        labels: ['2', '4', '6', '8', '10', '12', '14', '16'],
        datasets: [
            {
                label: 'Spending',
                data: [5000, 5200, 5300, 5800, 6000, 5900, 6200, 5743.35],
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
                beginAtZero: false,
                title: {
                    display: false,
                    text: 'Amount ($)',
                },
                ticks: {
                    display: false,
                    max: 6500,
                },
            },
            x: {
                title: {
                    display: false,
                    text: 'Days',
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
        <div className=" bg-[#161245] p-4 rounded-xl text-white shadow-lg w-[239px] h-[310px] first">
            <h2 className="text-2xl font-semibold mb-2">Spending</h2>
            <h3 className="text-xl mb-1">$ 5,743.35</h3>
            <p className="text-sm">total spending</p>
            <div className="h-[220px] w-">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default SpendingChart;
