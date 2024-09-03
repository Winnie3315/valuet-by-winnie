import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import TotalTransactionsAmount from './TotalTransactionsAmount';
import { useHttpRequest } from '../hooks/http.request';
import moment from 'moment';

Chart.register(...registerables);

const SpendingChart = () => {
    const [spendingData, setSpendingData] = useState([]);
    const { request } = useHttpRequest('http://localhost:8080');
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchSpendingData = async () => {
            try {
                const data = await request('/transactions', 'get');
                if (data) {
                    const groupedData = data.reduce((acc, transaction) => {
                        const date = moment(transaction.created_at, 'YYYY-MM-DD')
                        const day = date.date()
                        console.log("Parsed date:", date.format(), "Day:", day)
        
                        if (!acc[day]) acc[day] = 0
                        acc[day] += transaction.amount
                        return acc
                    }, {})
        
                    const labels = Object.keys(groupedData).map(day => `Day ${day}`)
                    const amounts = Object.values(groupedData);
        
                    setSpendingData({
                        labels,
                        datasets: [
                            {
                                label: 'Spending',
                                data: amounts,
                                fill: false,
                                borderColor: 'rgba(0, 150, 255, 1)',
                                borderWidth: 2,
                                tension: 0.4,
                            },
                        ],
                    });
                }
            } catch (err) {
                console.error("Error fetching spending data:", err);
            }
        };
        
        fetchSpendingData();
    }, [request]);

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
                    max: Math.max(...(spendingData.datasets?.[0]?.data || [0])) * 1.1,
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
        <div className="bg-[#161245] p-4 rounded-xl text-white shadow-lg w-[300px] h-[331px] first">
            <h2 className="text-2xl font-semibold mb-2">Spending</h2>
            <h3 className="text-xl mb-1">Total</h3>
            <TotalTransactionsAmount />
            <div className="h-[220px]">
                {spendingData.labels ? <Line data={spendingData} options={options} /> : <p>Loading...</p>}
            </div>
        </div>
    );
};

export default SpendingChart;
