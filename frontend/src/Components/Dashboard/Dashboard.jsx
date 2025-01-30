import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCaretDown, FaCaretUp, FaUser } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import LineChart from './LineChart';
import BarChart from './BarChart';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const openProfile = () => {
        setIsOpen(!isOpen);
    };

    const navigateUserMng = () => {
        navigate('/users');
    };

    return (
        <div className="bg-gray-100 px-8 py-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-3 flex justify-between">
                    <h2 className="font-semibold text-gray-700 text-lg inline-flex mb-auto items-center">
                        <IoIosArrowForward /> Dashboard
                    </h2>
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
                                <div className="w-full bg-white border absolute -left-5 top-10 rounded-lg p-1">
                                    <p className="hover:bg-gray-100 px-2 py-1.5 rounded-lg">Name</p>
                                    <p className="hover:bg-gray-100 px-2 py-1.5 rounded-lg">Department</p>
                                    <p className="hover:bg-gray-100 px-2 py-1.5 rounded-lg">Email</p>
                                </div>
                            )}
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