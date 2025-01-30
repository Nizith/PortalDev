import React, { useRef, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
    const chartRef = useRef(null);
    const [totalContractCount, setTotalContractCount] = useState(0);
    const [barData, setBarData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Contracts',
            backgroundColor: 'rgba(75, 52, 192, 0.5)', // Default background color
            borderWidth: 0,
            hoverBackgroundColor: 'rgba(75, 92, 192, 0.9)',
            data: [],
            borderRadius: 10,
            barThickness: 40
        }]
    });

    const fetchContracts = async () => {
        try {
            const response = await axios.get("http://localhost:4500/portaldev/allcontracts");
            const contracts = response.data.data;

            const monthlyCounts = new Array(12).fill(0);
            contracts.forEach(contract => {
                const date = new Date(contract.customerContStartDate);
                const month = date.getMonth();
                monthlyCounts[month]++;
            });

            setTotalContractCount(contracts.length);
            setBarData(prevData => ({
                ...prevData,
                datasets: [{
                    ...prevData.datasets[0],
                    data: monthlyCounts,
                }],
            }));
        } catch (error) {
            console.error("Error fetching contracts:", error);
        }
    };

    useEffect(() => {
        fetchContracts();
    }, []);

    useEffect(() => {
        const chart = chartRef.current;
        if (chart && chart.ctx) {
            const gradient = chart.ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(75, 52, 192)');
            gradient.addColorStop(1, 'rgba(75, 52, 192, 0.4)');
            
            setBarData(prevData => ({
                ...prevData,
                datasets: [{
                    ...prevData.datasets[0],
                    backgroundColor: gradient,
                }],
            }));
        }
    }, [chartRef.current]);

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { 
                grid: {
                    display: false
                }
            },
            y: { 
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleColor: 'white',
                bodyColor: 'white',
                cornerRadius: 6,
                displayColors: false
            }
        },
    };

    return (
        <div className="bg-white col-span-3 p-6 rounded-lg border">
            <h2 className="text-lg font-bold">Contracts made in each month</h2>
            <p className="text-xs mb-2">This year</p>
            <div className="inline-flex space-x-5 items-center">
                <p className="text-3xl font-bold mb-2">{totalContractCount}</p>
                <div className="bg-blue-200 px-2 rounded-full">
                    <p className="text-blue-700 font-semibold">Total Contracts</p>
                </div>
            </div>
            <div className="mb-4 flex justify-center h-[300px]">
                {barData && <Bar data={barData} options={barOptions} ref={chartRef} />}
            </div>
        </div>
    );
}