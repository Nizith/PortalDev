import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiContractLine, RiLogoutCircleLine } from "react-icons/ri";
import { MdManageAccounts, MdPayment, MdTableView } from "react-icons/md";
import { BsPersonFillDown, BsPersonFillUp } from "react-icons/bs";
import { TbSectionFilled } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeRoute, setActiveRoute] = useState('');
    const [role, setRole] = useState('');
    const [confirmlogout, setConfirmlogout] = useState(false);

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        setRole(userRole);
        setActiveRoute(location.pathname);
    }, [location.pathname]);

    const handleHomeNavigation = () => {
        if (role === 'Admin') {
            navigate('/admindashboard');
        }
        else if (role === 'MsStaff') {
            navigate('/userdashboard');
        }
        else if (role === 'SalesTeam') {
            navigate('/userdashboard');
        }
    };

    const handleNavigation = (path) => {
        setActiveRoute(path);
        navigate(path);
    };

    const handleLogout = () => {
        setConfirmlogout(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('role');
        navigate('/login');
    };

    const closelogout = () => {
        setConfirmlogout(false);
    }

    const linkClass = (path) => {
        return activeRoute === path
            ? "w-full py-3 bg-indigo-600 bg-opacity-50 text-white pl-4 transition duration-300 "
            : "w-full py-3 hover:ring-2 ring-indigo-600 text-white text-opacity-60 hover:text-white pl-4 transition duration-300 ";
    };


    return (
        <>
            <div className="fixed flex flex-col w-1/5 min-h-screen p-6 text-white shadow-lg bg-slate-900">
                <div className="mb-4">
                    <button onClick={() => handleHomeNavigation()} className="w-full text-xl font-bold font-serif text-center">
                        Manage Services Contract Portal
                    </button>
                </div>
                <div className="flex-grow">
                    <nav>
                        {/* Super Admin tabs */}
                        {role === 'superadmin' && (
                            <>
                                <button
                                    onClick={() => handleNavigation('/')}
                                    className={`${linkClass('/')} font-semibold text-lg rounded-md`}
                                >
                                    Sup Admin
                                </button>
                            </>
                        )}


                        {/* Admin tabs */}
                        {role === 'Admin' && (
                            <>
                                <hr className='text-sky-900 my-2' />
                                <button
                                    onClick={() => handleNavigation('/addcontract')}
                                    className={`${linkClass('/addcontract')} font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                >
                                    <RiContractLine className='size-6' /> Create Contracts
                                </button>
                                <hr className='text-sky-900 my-2' />
                                <button
                                    onClick={() => handleNavigation('/contracts')}
                                    className={`${linkClass('/contracts')} font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                >
                                    <MdTableView className='size-7' /> Manage Contracts
                                </button>
                                <hr className='text-sky-900 my-2' />
                                <button
                                    onClick={() => handleNavigation('/payments')}
                                    className={`${linkClass('/payments')} font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                >
                                    <MdPayment className='size-6' /> Manage Payments
                                </button>
                                <hr className='text-sky-900 my-2' />
                                <button
                                    onClick={() => handleNavigation('/suppliers')}
                                    className={`${linkClass('/suppliers')} font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                >
                                    <BsPersonFillUp className='size-7' /> Manage Suppliers
                                </button>
                                <hr className='text-sky-900 my-2' />
                                <button
                                    onClick={() => handleNavigation('/customers')}
                                    className={`${linkClass('/customers')} font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                >
                                    <BsPersonFillDown className='size-7' /> Manage Customers
                                </button>
                                <hr className='text-sky-900 my-2' />
                                <button
                                    onClick={() => handleNavigation('/cordinators')}
                                    className={`${linkClass('/cordinators')} font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                >
                                    <MdManageAccounts className='size-7' /> Manage Cordinators
                                </button>
                                <hr className='text-sky-900 my-2' />
                                <button
                                    onClick={() => handleNavigation('/sections')}
                                    className={`${linkClass('/sections')} font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                >
                                    <TbSectionFilled className='size-7' /> Manage Sections
                                </button>
                                <hr className='text-sky-900 my-2' />
                            </>
                        )}


                        {/* User tabs */}
                        {(role === 'SalesTeam' || role === 'MsStaff') && (
                            <>
                                <hr className='text-sky-900 my-2' />
                                <button
                                    onClick={() => handleNavigation('/viewcontracts')}
                                    className={`${linkClass('/viewcontracts')} font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                >
                                    <MdTableView className='size-7' />
                                    View Contract
                                </button>
                                <hr className='text-sky-900 my-2' />
                            </>
                        )}
                    </nav>
                </div>
                <div className=''>
                    {confirmlogout && (
                        <>
                            <div className='w-screen h-screen absolute inset-0 bg-yello-300' onClick={closelogout}></div>
                            <div className='relative mb-4 text-center -mt-20 pt-2 w-ful rounded-lg bg-slate-800'>
                                <button
                                    className='absolute right-4 top-3 text-lg hover:text-red-500 rounded-lg'
                                    onClick={closelogout}><IoClose />
                                </button>
                                <p className='font-bold'>Are you sure ?</p>
                                <div className='grid grid-rows-1 grid-cols-2 p-4 gap-x-5 font-semibold'>
                                    <button className='bg-red-900 px-6 py-0.5 rounded-lg hover:ring-1 ring-red-600' onClick={confirmLogout}>Yes</button>
                                    <button className='bg-indigo-900 px-6 py-0.5 rounded-lg hover:ring-1 ring-indigo-600' onClick={closelogout}>No</button>
                                </div>
                            </div>
                        </>
                    )}
                    <button
                        className='flex items-center justify-center w-full py-2 font-semibold duration-300 bg-indigo-900 rounded-lg hover:ring-2 ring-indigo-700 gap-x-2'
                        onClick={handleLogout}
                    >
                        <RiLogoutCircleLine className='size-6' />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}
