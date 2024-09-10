import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiContractLine, RiLogoutCircleLine } from "react-icons/ri";
import { MdManageAccounts, MdTableView } from "react-icons/md";
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
        if (role === 'superadmin') {
            navigate('/admindash');
        }
        else if (role === 'admin') {
            navigate('/admindash');
        }
        else if (role === 'user') {
            navigate('/side');
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
            ? "w-full py-3 bg-green-600  text-white pl-4 transition duration-300 "
            : "w-full py-3 hover:bg-indigo-700 text-white pl-4 transition duration-300 ";
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
                        {role === 'admin' && (
                            <>
                                <hr className='text-sky-900 my-2' />
                                <button
                                    onClick={() => handleNavigation('/suppliertable')}
                                    className={`${linkClass('/suppliertable')} font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                >
                                    <BsPersonFillUp className='size-7' /> Create Supplier
                                </button>
                                <hr className='text-sky-900 my-2' />
                                <button
                                    onClick={() => handleNavigation('/customer')}
                                    className={`${linkClass('/customer')} font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                >
                                    <BsPersonFillDown className='size-7' /> Create Customer
                                </button>
                                <hr className='text-sky-900 my-2' />
                                <button
                                    onClick={() => handleNavigation('/cordinatortable')}
                                    className={`${linkClass('/cordinatortable')} font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                >
                                    <MdManageAccounts className='size-7' /> Create Cordinator
                                </button>
                                <hr className='text-sky-900 my-2' />
                                <button
                                    onClick={() => handleNavigation('/section')}
                                    className={`${linkClass('/section')} font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                >
                                    <TbSectionFilled className='size-7' /> Create Section
                                </button>
                                <hr className='text-sky-900 my-2' />
                            </>
                        )}


                        {/* User tabs */}
                        {(role === 'user') && (
                            <>
                                <hr className='text-sky-900 my-2' />
                                <button
                                    onClick={() => handleNavigation('/addcontract')}
                                    className={`${linkClass('/addcontract')} font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                >
                                    <RiContractLine className='size-6' />
                                    Create Contract
                                </button>
                                <hr className='text-sky-900 my-2' />
                                <button
                                    onClick={() => handleNavigation('/viewcontract')}
                                    className={`${linkClass('/viewcontract')} font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                >
                                    <MdTableView className='size-7' />
                                    View Contract
                                </button>
                                <hr className='text-sky-900 my-2' />
                            </>
                        )}
                    </nav>
                </div>
                {confirmlogout && (
                    <>
                        <div className='w-screen h-screen absolute inset-0' onClick={closelogout}></div>
                        <div className='relative  mb-4 text-center pt-2 rounded-lg bg-slate-800'>
                            <button
                                className='absolute right-4 top-3 text-lg hover:text-red-500 rounded-lg'
                                onClick={closelogout}><IoClose />
                            </button>
                            <p className='font-bold'>Are you sure ?</p>
                            <div className='inline-flex gap-x-20 my-3 font-semibold'>
                                <button className='bg-red-900 px-6 py-0.5 rounded-lg hover:ring-1 ring-red-600'  onClick={confirmLogout}>Yes</button>
                                <button className='bg-indigo-900 px-6 py-0.5 rounded-lg hover:ring-1 ring-indigo-600' onClick={closelogout}>No</button>
                            </div>
                        </div>
                    </>
                )}
                <div className=''>
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
