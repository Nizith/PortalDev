import React, { useRef, useEffect, useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { ArcElement, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Chart } from 'chart.js/auto';
import { FaCaretDown, FaCaretUp, FaUser } from 'react-icons/fa';
import { IoDocument, IoNotifications } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import { MdNavigateNext } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

Chart.register(ArcElement, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement);

export default function Dashboard() {
    const chartRef = useRef(null);
    const [barData, setBarData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Sales',
                backgroundColor: '', // Will be set in useEffect
                borderWidth: 0,
                hoverBackgroundColor: 'rgba(75, 92, 192, 0.9)',
                data: [],
                borderRadius: 10,
                barThickness: 40
            },
        ],
    });

    const [totalContractCount, setTotalContractCount] = useState(0);

    const [newContractsData, setNewContractsData] = useState({
        labels: [],
        datasets: [{
            label: 'New Contracts',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1
        }]
    });

    const [newContractsCount, setNewContractsCount] = useState(0);




    const fetchContractss = async () => {
        try {
            const response = await axios.get("http://localhost:4500/portaldev/allcontracts");
            const contracts = response.data.data;

            const monthlyCounts = new Array(12).fill(0);
            const today = new Date();
            const startDate = new Date();
            startDate.setDate(today.getDate() - 30);

            const dailyCounts = {};
            for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
                const dateString = d.toISOString().split('T')[0];
                dailyCounts[dateString] = 0;
            }

            let newContractsCount = 0;
            contracts.forEach(contract => {
                const date = new Date(contract.customerContStartDate);
                const month = date.getMonth();
                monthlyCounts[month]++;
                if (date >= startDate && date <= today) {
                    const dateString = date.toISOString().split('T')[0];
                    dailyCounts[dateString]++;
                    newContractsCount++;
                }
            });

            setTotalContractCount(contracts.length);

            setBarData((prevData) => ({
                ...prevData,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: monthlyCounts,
                    },
                ],
            }));

            const labels = Object.keys(dailyCounts);
            const values = Object.values(dailyCounts);
            setNewContractsDatas({
                labels,
                datasets: [{
                    label: 'New Contracts',
                    data: values,
                    borderColor: 'rgba(34, 197, 94, 1)', // Solid green line
                    backgroundColor: (ctx) => {
                        const chart = ctx.chart;
                        const { ctx: chartCtx } = chart;
                        const gradient = chartCtx.createLinearGradient(0, 0, 0, chart.height);
                        gradient.addColorStop(0, 'rgba(34, 197, 94, 0.6)'); // Green near the line
                        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // White fading out
                        return gradient;
                    },
                    tension: 0.1,
                    fill: true, // Enables the gradient fill
                    borderWidth: 2, // Solid line width
                    pointBackgroundColor: 'rgba(34, 197, 94, 1)',
                    pointBorderColor: 'rgba(34, 197, 94, 1)',
                    pointBorderWidth: 1,
                    pointRadius: 3,
                }]
            });


            setNewContractsCount(newContractsCount);

        } catch (error) {
            console.error("Error fetching contracts:", error);
        }
    };

    const [customerData, setCustomerData] = useState({
        labels: [],
        datasets: [{
            label: 'Customers Added per Day',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
    });

    const [supplierData, setSupplierData] = useState({

        labels: [],
        datasets: [{
            label: 'Suppliers Added per Day',
            data: [],
            borderColor: 'rgba(192, 75, 75, 1)',
            backgroundColor: 'rgba(192, 75, 75, 0.2)',
        }]
    });

    // Ensure supplierCount is properly defined and used
    const [supplierCount, setSupplierCount] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);

    const fetchContracts = async () => {
        try {
            const response = await axios.get("http://localhost:4500/portaldev/allcontracts");
            const contracts = response.data.data;

            const today = new Date();
            const currentYear = today.getFullYear();
            const years = Array.from({ length: 5 }, (_, i) => currentYear - 1 + i);

            const yearCounts = years.reduce((acc, year) => ({ ...acc, [year]: 0 }), {});

            contracts.forEach(contract => {
                const startYear = new Date(contract.customerContStartDate).getFullYear();
                const endYear = new Date(contract.customerContEndDate).getFullYear();
                for (let year = startYear; year <= endYear && year <= currentYear + 3; year++) {
                    if (year in yearCounts) {
                        yearCounts[year]++;
                    }
                }
            });

            const labels = years;
            const values = years.map(year => yearCounts[year] || 0);

            setNewContractsData({
                labels,
                datasets: [{
                    label: 'Active Contracts',
                    data: values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1
                }]
            });
            setNewContractsCount(contracts.length); // Correctly set supplierCount

        } catch (error) {
            console.error("Error fetching contracts:", error);
        }
    };


    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('http://localhost:4500/portaldev/readsupplier');
            const suppliers = response.data.data;

            const today = new Date();
            const currentYear = today.getFullYear();
            const years = Array.from({ length: 5 }, (_, i) => currentYear - 1 + i);

            const supplierSet = new Set();
            const yearCounts = years.reduce((acc, year) => ({ ...acc, [year]: 0 }), {});

            suppliers.forEach(supplier => {
                const startYear = new Date(supplier.createdAt).getFullYear();
                const endYear = currentYear + 3;
                if (!supplierSet.has(supplier.name)) {
                    for (let year = startYear; year <= endYear && year <= currentYear + 3; year++) {
                        if (year in yearCounts) {
                            yearCounts[year]++;
                        }
                    }
                    supplierSet.add(supplier.name);
                }
            });

            const labels = years;
            const values = years.map(year => yearCounts[year] || 0);

            setSupplierData({
                labels,
                datasets: [{
                    label: 'Active Suppliers',
                    data: values,
                    borderColor: 'rgba(192, 75, 75, 1)',
                    backgroundColor: 'rgba(192, 75, 75, 0.2)'
                }]
            });

            setSupplierCount(suppliers.length); // Correctly set supplierCount

        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:4500/portaldev/readcustomer');
            const customers = response.data.data;

            const today = new Date();
            const currentYear = today.getFullYear();
            const years = Array.from({ length: 5 }, (_, i) => currentYear - 1 + i);

            const customerSet = new Set();
            const yearCounts = years.reduce((acc, year) => ({ ...acc, [year]: 0 }), {});

            customers.forEach(customer => {
                const startYear = new Date(customer.createdAt).getFullYear();
                const endYear = currentYear + 3;
                if (!customerSet.has(customer.name)) {
                    for (let year = startYear; year <= endYear && year <= currentYear + 3; year++) {
                        if (year in yearCounts) {
                            yearCounts[year]++;
                        }
                    }
                    customerSet.add(customer.name);
                }
            });

            const labels = years;
            const values = years.map(year => yearCounts[year] || 0);

            setCustomerData({
                labels,
                datasets: [{
                    label: 'Active Customers',
                    data: values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)'
                }]
            });

            setCustomerCount(customers.length); // Correctly set customerCount

        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };



    useEffect(() => {
        fetchContracts();
        fetchCustomers();
        fetchSuppliers();
        fetchContractss();

    }, []);


    useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
            const ctx = chart.ctx;
            const gradient = ctx.createLinearGradient(0, 50, 0, 800);
            gradient.addColorStop(0, 'rgba(75, 52, 192)');
            gradient.addColorStop(1, '#FFFF');
            setBarData((prevData) => ({
                ...prevData,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        backgroundColor: gradient,
                    },
                ],
            }));
        }
    }, [chartRef]);

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
            y: {
                title: {
                    display: true,
                    text: 'Active Count',
                },
                beginAtZero: true,
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
                enabled: true
            }
        }
    };

    const pieOptions = {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 10,
                    },
                },
            },
        },
    };

    const [isOpen, setIsOpen] = useState(false);
    const openProfile = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate();
    const navigateUserMng = () => {
        navigate('/users');
    };

    return (
        <>
            <div className="bg-gray-100 px-8 py-4 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-3 flex justify-between">
                        <h2 className="font-semibold text-gray-700 text-lg inline-flex mb-auto items-center"><IoIosArrowForward /> Dashboard</h2>
                        <div>
                            <div
                                className="inline-flex space-x-4 border-2 mr-5 border-indigo-600 hover:bg-gray-100 cursor-pointer px-4 py-1 rounded-lg"
                                onClick={navigateUserMng}>
                                <h1 className="font-semibold text-gray-600 text-lg">User Management</h1>
                                <FaUser className="text-gray-800 size-6" />
                            </div>
                            <div
                                className="inline-flex relative space-x-5 border-2 border-indigo-600 hover:bg-gray-100 cursor-pointer px-4 py-1 rounded-lg"
                                onClick={openProfile}>
                                <div className="inline-flex space-x-5">
                                    <h1 className="font-semibold text-gray-600 text-lg">Admin</h1>
                                </div>
                                {isOpen ? <FaCaretUp className="-ml-3 my-auto" /> : <FaCaretDown className="-ml-3 my-auto" />}
                                {isOpen && (
                                    <div className='w-full bg-white border absolute -left-5 top-10 rounded-lg p-1'>
                                        <p className='hover:bg-gray-100 px-2 py-1.5 rounded-lg'>Name</p>
                                        <p className='hover:bg-gray-100 px-2 py-1.5 rounded-lg'>Department</p>
                                        <p className='hover:bg-gray-100 px-2 py-1.5 rounded-lg'>Email</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Users Card */}
                        <div className="bg-white px-4 py-2 rounded-lg border">

                            <div className='flex justify-between items-center'>
                                <h2 className="text-lg font-semibold">Active Contracts</h2>
                                <p className="text-3xl font-bold">{newContractsCount}</p>
                            </div>

                            <div>
                                <div className='bg-blue-200 px-2 rounded-full'><p className="text-blue-700 font-semibold"></p></div>
                            </div>
                            <div className="h-24 mt-2">
                                <Line data={newContractsData} options={trendOptions} />
                            </div>
                        </div>

                        {/* Conversions Card */}
                        <div className="bg-white px-4 py-2 rounded-lg border">

                            <div className='flex justify-between items-center'>
                                <h2 className="text-lg font-semibold">Active Suppliers</h2>
                                <p className="text-3xl font-bold">{supplierCount}</p>
                            </div>

                            <div className=''>
                                <div className='bg-red-200 px-2 rounded-full'><p className="text-red-700 font-semibold"></p></div>
                            </div>
                            <div className="h-24 mt-2">
                                <Line data={supplierData} options={trendOptions} />
                            </div>
                        </div>

                        {/* Event Count Card */}
                        <div className="bg-white px-4 py-2 rounded-lg border">

                            <div className='flex justify-between items-center'>
                                <h2 className="text-lg font-semibold">Active Customers</h2>
                                <p className="text-3xl font-bold">{customerCount}</p>
                            </div>

                            <div>
                                <div className='bg-green-200 px-2 rounded-full'><p className="text-green-700 font-semibold"></p></div>
                            </div>
                            <div className="h-24 mt-2">
                                <Line data={customerData} options={trendOptions} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-6">
                        <div className="bg-white col-span-3 p-6 rounded-lg border">
                            <h2 className="text-lg font-bold">Contracts made in each month</h2>
                            <p className='text-xs mb-2'>This year</p>
                            <div className='inline-flex space-x-5 items-center'>
                                <p className="text-3xl font-bold mb-2">{totalContractCount}</p>
                                <div className='bg-blue-200 px-2 rounded-full'><p className="text-blue-700 font-semibold"></p></div>
                            </div>
                            <div className="mb-4 flex justify-center">
                                {barData && <Bar data={barData} options={barOptions} height={300} ref={chartRef} />}
                            </div>
                        </div>
                        <div className="col-span-1 space-y-5">
                            <div className="bg-white inline-flex items-center w-full rounded-lg border bg-gradient-to-r from-white from-75% to-green-400 cursor-pointer">
                                <div className='w-3/4 p-3 rounded-l-md bg-white cursor-default'>
                                    <h2 className="text-lg font-bold">Documents</h2>
                                    <p className='text-xs'>View all the documents uploaded</p>
                                    <div className="my-2 ml-10 p-2">
                                        <IoDocument className='size-20 text-indigo-600' />
                                    </div>
                                    <p className="text-2xl inline-flex font-bold mb-2">11 <span className='text-xs my-auto ml-2'>of total documents</span></p>
                                </div>
                                <MdNavigateNext className='size-20' />
                            </div>
                            <div className="bg-white inline-flex items-center w-full rounded-lg border bg-gradient-to-r from-white from-75% to-green-400 cursor-pointer">
                                <div className='w-3/4 p-3 rounded-l-md bg-white cursor-default'>
                                    <h2 className="text-lg font-bold mb-">Notifications</h2>
                                    <p className='text-xs'>View all the notifications</p>
                                    <div className="my-2 ml-10 p-2">
                                        <IoNotifications className='size-20 text-indigo-600' />
                                    </div>
                                    <p className="text-2xl inline-flex font-bold mb-2">5 <span className='text-xs my-auto ml-2'>New Notifications</span></p>
                                </div>
                                <MdNavigateNext className='size-20' />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
