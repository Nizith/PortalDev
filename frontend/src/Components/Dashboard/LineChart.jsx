import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import axios from 'axios';
import { api } from '../../api';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function LineChart() {


    const userName = localStorage.getItem('username');
    const userRole = localStorage.getItem('role');


    const [metricsData, setMetricsData] = useState({
        contracts: { count: 0, data: null },
        suppliers: { count: 0, data: null },
        customers: { count: 0, data: null }
    });

    const baseDataset = {
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBorderWidth: 2,
    };

    const chartConfigs = {
        contracts: {
            ...baseDataset,
            borderColor: 'rgba(59, 130, 246, 1)', // Blue
            backgroundColor: (ctx) => {
                if (!ctx.chart.ctx) return 'rgba(59, 130, 246, 0.2)';
                const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
                gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
                gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
                return gradient;
            },
            pointBackgroundColor: 'rgba(59, 130, 246, 1)',
            pointBorderColor: '#fff'
        },
        suppliers: {
            ...baseDataset,
            borderColor: 'rgba(239, 68, 68, 1)', // Red
            backgroundColor: (ctx) => {
                if (!ctx.chart.ctx) return 'rgba(239, 68, 68, 0.2)';
                const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
                gradient.addColorStop(0, 'rgba(239, 68, 68, 0.5)');
                gradient.addColorStop(1, 'rgba(239, 68, 68, 0.0)');
                return gradient;
            },
            pointBackgroundColor: 'rgba(239, 68, 68, 1)',
            pointBorderColor: '#fff'
        },
        customers: {
            ...baseDataset,
            borderColor: 'rgba(34, 197, 94, 1)', // Green
            backgroundColor: (ctx) => {
                if (!ctx.chart.ctx) return 'rgba(34, 197, 94, 0.2)';
                const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
                gradient.addColorStop(0, 'rgba(34, 197, 94, 0.5)');
                gradient.addColorStop(1, 'rgba(34, 197, 94, 0.0)');
                return gradient;
            },
            pointBackgroundColor: 'rgba(34, 197, 94, 1)',
            pointBorderColor: '#fff'
        }
    };

    const trendOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Active Count',
                },
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        elements: {
            line: {
                borderWidth: 2
            }
        },
        plugins: {
            legend: {
                display: false
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
        }
    };

    // Function to get the token from local storage or any other storage
    const getToken = () => localStorage.getItem('token');

    const fetchMetricsData = async () => {
        try {
            const [contractsRes, suppliersRes, customersRes] = await Promise.all([
                axios.get(`${api}/allcontracts`, {
                    headers: { Authorization: `Bearer ${getToken()}` }
                }),
                axios.get(`${api}/readsupplier`, {
                    headers: { Authorization: `Bearer ${getToken()}` }
                }),
                axios.get(`${api}/readcustomer`, {
                    headers: { Authorization: `Bearer ${getToken()}` }
                })
                ]);

            let filteredContracts = contractsRes.data.data;
            let filteredSuppliers = suppliersRes.data.data;
            let filteredCustomers = customersRes.data.data;
            if (userRole === 'SalesTeam') {
                filteredContracts = filteredContracts.filter(contract => contract.manager === userName);

                filteredSuppliers = filteredContracts.filter(contract => contract.supplier);

                filteredCustomers = filteredContracts.filter(contract => contract.customer);
            }

            const processYearlyData = (data, dateField = 'createdAt', chartConfig) => {
                const today = new Date();
                const currentYear = today.getFullYear();
                const years = Array.from({ length: 5 }, (_, i) => currentYear - 1 + i);
                const yearCounts = years.reduce((acc, year) => ({ ...acc, [year]: 0 }), {});

                data.forEach(item => {
                    const startYear = new Date(item[dateField]).getFullYear();
                    const endYear = currentYear + 3;
                    for (let year = startYear; year <= endYear && year <= currentYear + 3; year++) {
                        if (year in yearCounts) {
                            yearCounts[year]++;
                        }
                    }
                });

                return {
                    labels: years,
                    datasets: [{
                        ...chartConfig,
                        data: years.map(year => yearCounts[year] || 0)
                    }]
                };
            };

            setMetricsData({
                contracts: {
                    count: filteredContracts.length,
                    data: processYearlyData(filteredContracts, 'customerContStartDate', chartConfigs.contracts)
                },
                suppliers: {
                    count: filteredSuppliers.length,
                    data: processYearlyData(filteredSuppliers, 'createdAt', chartConfigs.suppliers)
                },
                customers: {
                    count: filteredCustomers.length,
                    data: processYearlyData(filteredCustomers, 'createdAt', chartConfigs.customers)
                }
            });
        } catch (error) {
            console.error('Error fetching metrics:', error);
        }
    };

    useEffect(() => {
        fetchMetricsData();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
                title={userRole === 'SalesTeam' ? 'My Active Contracts' : 'Active Contracts'}
                count={metricsData.contracts.count}
                data={metricsData.contracts.data}
                options={trendOptions}
                color="blue"
            />
            <MetricCard
                title="Active Suppliers"
                count={metricsData.suppliers.count}
                data={metricsData.suppliers.data}
                options={trendOptions}
                color="red"
            />
            <MetricCard
                title="Active Customers"
                count={metricsData.customers.count}
                data={metricsData.customers.data}
                options={trendOptions}
                color="green"
            />
        </div>
    );
}

const MetricCard = ({ title, count, data, options, color }) => (
    <div className="bg-white px-4 py-2 rounded-lg border">
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className={`text-lg font-bold rounded-full bg-${color}-200 text-${color}-800 px-4 border`}>{count}</p>
        </div>
        <div className={`bg-${color}-200 px-2 rounded-full`}>
            <p className={`text-${color}-700 font-semibold`}></p>
        </div>
        <div className="h-24 mt-2">
            {data && <Line data={data} options={options} />}
        </div>
    </div>
);