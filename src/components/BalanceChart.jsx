import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const verticalLinePlugin = {
  id: 'verticalLinePlugin',
  afterDatasetsDraw(chart) {
    const { ctx, chartArea: { top, bottom }, scales: { x } } = chart;

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);

      meta.data.forEach((point, index) => {
        const nextPoint = meta.data[index + 1];
        if (nextPoint && point.y <= nextPoint.y) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(point.x, bottom);
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.stroke();
          ctx.restore();
        }
      });
    });
  }
};

const options = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function(context) {
          return `$ ${context.raw}`;
        }
      },
      backgroundColor: '#333',
      titleFont: { size: 12 },
      bodyFont: { size: 14 },
      displayColors: false,
      caretPadding: 10,
      caretSize: 6,
      cornerRadius: 4
    },
    legend: {
      display: false
    },
    verticalLinePlugin: {}
  },
  scales: {
    x: {
      grid: {
        color: '#11184E',
        lineWidth: 1,
        borderDash: [5, 5],
      },
      ticks: {
        color: '#6A67D1',
        font: {
          size: 14
        }
      }
    },
    y: {
      grid: {
        color: '#11184E',
        lineWidth: 1,
        borderDash: [5, 5],
      },
      ticks: {
        color: '#6A67D1',
        font: {
          size: 14
        },
        callback: function(value) {
          return `$${value}`;
        }
      }
    }
  },
  elements: {
    line: {
      borderColor: '#55ACEE',
      borderWidth: 3,
      tension: 0.4,
      fill: 'start',
      backgroundColor: function(ctx) {
        const { chartArea } = ctx.chart;
        if (!chartArea) {
          return null;
        }

        const gradient = ctx.chart.ctx.createLinearGradient(chartArea.left, 0, chartArea.right, chartArea.bottom);
        gradient.addColorStop(0.071, 'rgba(0, 151, 232, 0.2)');
        gradient.addColorStop(0.6473, 'rgba(1, 143, 255, 0)');

        return gradient;
      }
    },
    point: {
      radius: 5,
      backgroundColor: '#55ACEE'
    }
  }
};

function BalanceChart({ transactions }) {
  const labels = transactions.map(transaction => transaction.category || transaction.created_at);
  const dataValues = transactions.map(transaction => transaction.amount);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
      }
    ]
  };

  return (
    <div className='balance-chart p-[20px] bg-[#161245] h-[399px] flex justify-center items-center'>
      <Line data={data} options={options} plugins={[verticalLinePlugin]} />
    </div>
  );
}

export default BalanceChart;

