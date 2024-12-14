import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { ArcElement, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Chart } from 'chart.js/auto';
import axios from 'axios';

Chart.register(ArcElement, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement);

export default function Dashboard() {
    const [totalContracts, setTotalContracts] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalSuppliers, setTotalSuppliers] = useState(0);

    const [barData, setBarData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Sales',
                backgroundColor: '', // Will be set in useEffect
                borderWidth: 0,
                hoverBackgroundColor: 'rgba(75, 92, 192, 0.9)',
                data: [12, 19, 3, 5, 2, 3, 8, 12, 9, 7, 10, 15], // Sample data for testing
                borderRadius: 10,
                barThickness: 40
            },
        ],
    });

    const [newContractsData, setNewContractsData] = useState({
        labels: [],
        datasets: [{
            label: 'Active Contracts',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1
        }]
    });

    const [customerData, setCustomerData] = useState({
        labels: [],
        datasets: [{
            label: 'Active Customers',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
    });

    const [supplierData, setSupplierData] = useState({
        labels: [],
        datasets: [{
            label: 'Active Suppliers',
            data: [],
            borderColor: 'rgba(192, 75, 75, 1)',
            backgroundColor: 'rgba(192, 75, 75, 0.2)',
        }]
    });

    const fetchActiveContracts = async () => {
        try {
            const response = await axios.get("http://localhost:4500/portaldev/activecontracts");
            const activeContracts = response.data?.data || [];
            const contractLabels = activeContracts.map(contract => contract.year);
            const contractData = activeContracts.map(contract => contract.count);

            setTotalContracts(activeContracts.length);
            setNewContractsData({
                labels: contractLabels,
                datasets: [{
                    ...newContractsData.datasets[0],
                    data: contractData
                }]
            });
        } catch (error) {
            console.error("Error fetching active contracts:", error);
        }
    };

    const fetchActiveCustomers = async () => {
        try {
            const response = await axios.get("http://localhost:4500/portaldev/activecustomers");
            const activeCustomers = response.data?.data || [];
            const customerLabels = activeCustomers.map(customer => customer.year);
            const customerCounts = activeCustomers.map(customer => customer.count);

            setTotalCustomers(activeCustomers.length);
            setCustomerData(prevData => ({
                labels: customerLabels,
                datasets: [{
                    ...prevData.datasets[0],
                    data: customerCounts
                }]
            }));
        } catch (error) {
            console.error("Error fetching active customers:", error);
        }
    };

    const fetchActiveSuppliers = async () => {
        try {
            const response = await axios.get("http://localhost:4500/portaldev/activesuppliers");
            const activeSuppliers = response.data?.data || [];
            const supplierLabels = activeSuppliers.map(supplier => supplier.year);
            const supplierCounts = activeSuppliers.map(supplier => supplier.count);

            setTotalSuppliers(activeSuppliers.length);
            setSupplierData(prevData => ({
                labels: supplierLabels,
                datasets: [{
                    ...prevData.datasets[0],
                    data: supplierCounts
                }]
            }));
        } catch (error) {
            console.error("Error fetching active suppliers:", error);
        }
    };

    useEffect(() => {
        fetchActiveContracts();
        fetchActiveCustomers();
        fetchActiveSuppliers();
    }, []);

    useEffect(() => {
        const gradient = (ctx) => {
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(75, 52, 192, 1)');
            gradient.addColorStop(1, '#FFFFFF');
            return gradient;
        };

        setBarData((prevData) => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    backgroundColor: gradient(document.createElement('canvas').getContext('2d')),
                },
            ],
        }));
    }, []);

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    const trendOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { display: false },
            y: { display: false },
        },
        elements: {
            line: { borderWidth: 2 },
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
    };

    return (
        <div className="bg-gray-100 px-8 py-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Cards for contracts, suppliers, customers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white px-4 py-2 rounded-lg border">
                        <h2 className="text-lg font-semibold">
                            Active Contracts ({totalContracts})
                        </h2>
                        <div className="h-20">
                            <Line data={newContractsData} options={trendOptions} />
                        </div>
                    </div>

                    <div className="bg-white px-4 py-2 rounded-lg border">
                        <h2 className="text-lg font-semibold">
                            Active Suppliers ({totalSuppliers})
                        </h2>
                        <div className="h-20">
                            <Line data={supplierData} options={trendOptions} />
                        </div>
                    </div>

                    <div className="bg-white px-4 py-2 rounded-lg border">
                        <h2 className="text-lg font-semibold">
                            Active Customers ({totalCustomers})
                        </h2>
                        <div className="h-20">
                            <Line data={customerData} options={trendOptions} />
                        </div>
                    </div>
                </div>

                {/* Chart section */}
                <div className="bg-white h-96 border my-10 rounded-xl p-3 relative">
                    <Bar data={barData} options={barOptions} />
                </div>
            </div>
        </div>
    );
}
