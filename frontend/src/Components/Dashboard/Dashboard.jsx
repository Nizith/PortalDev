import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { IoNotifications } from 'react-icons/io5';
import LineChart from './LineChart';
import BarChart from './BarChart';

const Dashboard = () => {

    const loggeduser = localStorage.getItem("role")

    const navigate = useNavigate();
    const navigateUserMng = () => {
        navigate('/users');
    };
    const navigateNotifications = () => {
        navigate('/notifications');
    };

    return (
        <div className="min-h-screen px-8 py-4 bg-gray-100 ">
            <div className="max-w-7xl mx-auto">
                <div className="mb-3 flex justify-between">
                    <h2 className="font-semibold text-gray-700 text-lg inline-flex mb-auto items-center">
                        <IoIosArrowForward /> Dashboard
                    </h2>
                    <div>
                        {loggeduser === 'Admin' && (
                            <div
                                className="inline-flex space-x-4 border-2 mr-5 border-indigo-600 hover:bg-gray-100 cursor-pointer px-4 py-1 rounded-lg"
                                onClick={navigateUserMng}>
                                <h1 className="font-semibold text-gray-600 text-lg">User Management</h1>
                                <FaUser className="text-indigo-700 size-6" />
                            </div>
                        )}
                        <div
                            className="inline-flex relative space-x-5 border-2 border-indigo-600 hover:bg-gray-100 px-4 py-1 rounded-lg"
                        >
                            <div className="inline-flex space-x-3">
                                <h1 className="font-semibold text-gray-600 text-lg">{loggeduser}</h1>
                                <a className='pt-0.5 cursor-pointer' onClick={navigateNotifications}><IoNotifications size={25} /></a>
                            </div>
                        </div>
                    </div>
                </div>

                <LineChart />

                <div className="mt-6">
                    <BarChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;