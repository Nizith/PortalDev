import React, { useRef, useEffect, useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { ArcElement, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Chart } from 'chart.js/auto';
import { FaCaretDown, FaCaretUp, FaUser } from 'react-icons/fa';
import { IoDocument, IoNotifications } from 'react-icons/io5';
import { MdNavigateNext } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

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
                data: [65, 59, 80, 81, 56, 95, 40, 70, 75, 62, 65, 89],
                borderRadius: 10,
                barThickness: 40
            },
        ],
    });

    useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
            const ctx = chart.ctx; // Use chart.ctx to ensure correct reference
            const gradient = ctx.createLinearGradient(0, 50, 0, 800); // Adjust the height for gradient visibility
            gradient.addColorStop(0, 'rgba(75, 52, 192)'); // Start color (aqua)
            gradient.addColorStop(1, '#FFFF'); // End color (purple)

            setBarData((prevData) => ({
                ...prevData,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        backgroundColor: gradient, // Apply gradient here
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

    const trendData = {
        labels: Array.from({ length: 10 }, (_, i) => i + 1), // Sample labels for the trend line
        datasets: [
            {
                data: [10, 12, 15, 14, 23, 17, 20, 29, 33, 27], // Sample trend data
                fill: true, // Fill the area under the line
                backgroundColor: (ctx) => {
                    const chart = ctx.chart;
                    const { ctx: chartCtx } = chart;
                    const gradient = chartCtx.createLinearGradient(0, 0, 0, chart.height); // Create gradient for the fill area
                    gradient.addColorStop(0, 'rgba(34, 197, 94, 0.4)'); // Light green at the top
                    gradient.addColorStop(1, 'rgba(34, 197, 94, 0)'); // Transparent at the bottom
                    return gradient;
                },
                borderColor: 'rgba(34, 197, 94, 0.6)', // Line color
                tension: 0, // Smooth curve
                borderWidth: 3,
                pointBackgroundColor: 'rgba(34, 197, 94, 1)', // Solid fill for the circle points
                pointBorderColor: 'rgba(34, 197, 94, 1)', // Border color for points
                pointBorderWidth: 1, // Border width for the points
                pointRadius: 3, // Size of the points
            },
        ],
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

    const pieData = {
        datasets: [
            {
                label: 'Colors',
                data: [300, 50, 100],
                backgroundColor: ['#dc2626', '#2563eb', '#facc15'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
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

    const [isOpen, isOpenprofile] = useState(false);
    const openProfile = () => {
        isOpenprofile(!isOpen);
    }

    const navigate = useNavigate();
    const navigateUserMng = () => {
        navigate('/usemanagement')
    }

    return (
        <>
            <div className="bg-gray-100 p-6 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-3 flex justify-between">
                        <h1 className="font-semibold text-gray-700 text-lg">Dashboard</h1>
                        <div>
                            <div
                                className="inline-flex space-x-5 border-2 mr-5 border-indigo-600 hover:bg-gray-100 cursor-pointer px-4 py-1 rounded-lg"
                                onClick={navigateUserMng}>
                                <h1 className="font-semibold text-gray-600 text-lg">User Management</h1>
                                <FaUser className="text-gray-800 size-6" />
                            </div>
                            <div
                                className="inline-flex relative space-x-5 border-2 border-indigo-600 hover:bg-gray-100 cursor-pointer px-4 py-1 rounded-lg"
                                onClick={openProfile}>
                                <div className="inline-flex space-x-5 ">
                                    <h1 className="font-semibold text-gray-600 text-lg">Admin</h1>
                                </div>
                                {isOpen ? <FaCaretUp className="-ml-3 my-auto" /> : <FaCaretDown className="-ml-3 my-auto" />}
                                {isOpen && (
                                    <>
                                        <div className='w-full bg-white border absolute -left-5 top-10 rounded-lg p-1'>
                                            <p className='hover:bg-gray-100 px-2 py-1.5 rounded-lg'>Name</p>
                                            <p className='hover:bg-gray-100 px-2 py-1.5 rounded-lg'>Department</p>
                                            <p className='hover:bg-gray-100 px-2 py-1.5 rounded-lg'>Email</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Users Card */}
                        <div className="bg-white px-4 py-2 rounded-lg border">
                            <h2 className="text-lg font-semibold">New Contracts</h2>
                            <p className='text-xs mb-2'>Last 30 days</p>
                            <div className='flex justify-between items-center'>
                                <p className="text-3xl font-bold">14k</p>
                                <div className='bg-blue-200 px-2 rounded-full'><p className="text-blue-700 font-semibold">+25%</p></div>
                            </div>
                            <div className="h-20">
                                <Line data={trendData} options={trendOptions} />
                            </div>
                        </div>

                        {/* Conversions Card */}
                        <div className="bg-white px-4 py-2 rounded-lg border">
                            <h2 className="text-lg font-semibold">Suppliers</h2>
                            <p className='text-xs mb-2'>Last 30 days</p>
                            <div className='flex justify-between items-center'>
                                <p className="text-3xl font-bold">325</p>
                                <div className='bg-red-200 px-2 rounded-full'><p className="text-red-700 font-semibold">-25%</p></div>
                            </div>
                            <div className="h-20">
                                <Line data={trendData} options={trendOptions} />
                            </div>
                        </div>

                        {/* Event Count Card */}
                        <div className="bg-white px-4 py-2 rounded-lg border">
                            <h2 className="text-lg font-semibold">Customers</h2>
                            <p className='text-xs mb-2'>Last 30 days</p>
                            <div className='flex justify-between items-center'>
                                <p className="text-3xl font-bold">200k</p>
                                <div className='bg-green-200 px-2 rounded-full'><p className="text-green-700 font-semibold">+25%</p></div>
                            </div>
                            <div className="h-20">
                                <Line data={trendData} options={trendOptions} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-6">
                        <div className="bg-white col-span-3 p-6 rounded-lg border">
                            <h2 className="text-lg font-bold">Contracts made in each month</h2>
                            <p className='text-xs mb-2  '>This year</p>
                            <div className='inline-flex space-x-5 items-center'>
                                <p className="text-3xl font-bold mb-2">11k</p>
                                <div className='bg-blue-200 px-2 rounded-full'><p className="text-blue-700 font-semibold">+25%</p></div>
                            </div>
                            <div className="mb-4 flex justify-center">
                                {barData && <Bar data={barData} options={barOptions} height={300} ref={chartRef} />}
                            </div>
                        </div>
                        <div className="col-span-1 space-y-5">
                            <div className="bg-hite inline-flex items-center w-full rounded-lg border bg-gradient-to-r from-white from-75% to-green-400 cursor-pointer">
                                <div className='w-3/4 p-3 rounded-l-md  bg-white cursor-default'>
                                    <h2 className="text-lg font-bold">Documents</h2>
                                    <p className='text-xs'>View all the documents uploaded</p>
                                    <div className="my-2 ml-10 p-2">
                                        <IoDocument className='size-20 text-indigo-600' />
                                    </div>
                                    <p className="text-2xl inline-flex font-bold mb-2">11 <p className='text-xs my-auto ml-2'>of total documents</p></p>
                                </div>
                                <MdNavigateNext className='size-20' />
                            </div>
                            <div className="bg-hite inline-flex items-center w-full rounded-lg border  bg-gradient-to-r from-white from-75% to-green-400 cursor-pointer">
                                <div className='w-3/4 p-3 rounded-l-md  bg-white cursor-default'>
                                    <h2 className="text-lg font-bold mb-">Notifications</h2>
                                    <p className='text-xs'>View all the documents uploaded</p>
                                    <div className="my-2 ml-10 p-2">
                                        <IoNotifications className='size-20 text-indigo-600' />
                                    </div>
                                    <p className="text-2xl inline-flex font-bold mb-2">5 <p className='text-xs my-auto ml-2'>New Notifications</p></p>
                                </div>
                                <MdNavigateNext className='size-20' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
