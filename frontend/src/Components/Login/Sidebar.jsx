import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    RiContractLine, RiLogoutCircleLine
} from "react-icons/ri";
import {
    MdManageAccounts, MdNavigateNext, MdPayment, MdTableView
} from "react-icons/md";
import {
    BsPersonFillDown, BsPersonFillUp
} from "react-icons/bs";
import { TbSectionFilled } from "react-icons/tb";
import { IoClose, IoDocuments, IoNotifications } from 'react-icons/io5';

const ROLE_NAVIGATION = {
    Admin: [
        { path: '/addcontract', label: 'Create Contracts', icon: <RiContractLine size={28} /> },
        { path: '/contracts', label: 'Manage Contracts', icon: <MdTableView size={28} /> },
        {
            label: 'Manage Users',
            icon: <MdManageAccounts size={28} />,
            icon2: <MdNavigateNext size={32} />,
            subMenu: [
                { path: '/suppliers', label: 'Manage Suppliers', icon: <BsPersonFillUp size={24} /> },
                { path: '/customers', label: 'Manage Customers', icon: <BsPersonFillDown size={24} /> },
                { path: '/cordinators', label: 'Manage Coordinators', icon: <MdManageAccounts size={24} /> },
                { path: '/sections', label: 'Manage Sections', icon: <TbSectionFilled size={24} /> },
            ]
        },
        { path: '/payments', label: 'Manage Payments', icon: <MdPayment size={28} /> },
        { path: '/notifications', label: 'Notifications', icon: <IoNotifications size={28} /> },
        { path: '/documents', label: 'Documents', icon: <IoDocuments size={28} /> },
    ],
    SalesTeam: [
        { path: '/viewcontracts', label: 'View Contracts', icon: <MdTableView size={28} /> },
        { path: '/payments', label: 'View Payments', icon: <MdPayment size={28} /> },
        // {
        //     label: 'View Users',
        //     icon: <MdManageAccounts size={28} />,
        //     icon2: <MdNavigateNext size={32} />,
        //     subMenu: [
        //         { path: '/suppliers', label: 'View Suppliers', icon: <BsPersonFillUp size={28} /> },
        //         { path: '/customers', label: 'View Customers', icon: <BsPersonFillDown size={28} /> },
        //         { path: '/cordinators', label: 'View Cordinators', icon: <MdManageAccounts size={28} /> },
        //         { path: '/sections', label: 'View Sections', icon: <TbSectionFilled size={28} /> },
        //     ]
        // },
        { path: '/notifications', label: 'Notifications', icon: <IoNotifications size={28} /> },
        { path: '/documents', label: 'Documents', icon: <IoDocuments size={28} /> },
    ],
    MsStaff: [
        { path: '/viewcontracts', label: 'View Contracts', icon: <MdTableView size={28} /> },
        { path: '/payments', label: 'View Payments', icon: <MdPayment size={28} /> },
        // {
        //     label: 'View Users',
        //     icon: <MdManageAccounts size={28} />,
        //     icon2: <MdNavigateNext size={32} />,
        //     subMenu: [
        //         { path: '/suppliers', label: 'View Suppliers', icon: <BsPersonFillUp size={28} /> },
        //         { path: '/customers', label: 'View Customers', icon: <BsPersonFillDown size={28} /> },
        //         { path: '/cordinators', label: 'View Cordinators', icon: <MdManageAccounts size={28} /> },
        //         { path: '/sections', label: 'View Sections', icon: <TbSectionFilled size={28} /> },
        //     ]
        // },
        { path: '/notifications', label: 'Notifications', icon: <IoNotifications size={28} /> },
        { path: '/documents', label: 'Documents', icon: <IoDocuments size={28} /> },
    ],

};

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [confirmlogout, setConfirmlogout] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        setRole(userRole);
    }, []);

    const handleNavigation = (path) => navigate(path);

    const linkClass = (path) => (
        location.pathname === path
            ? "w-[2.62in] mx-auto py-3 bg-indigo-600 bg-opacity-50 text-white pl-4 transition duration-300"
            : "w-[2.62in] mx-auto py-3 hover:ring-2 ring-indigo-600 text-white text-opacity-60 hover:text-white pl-4 transition duration-300"
    );

    const confirmLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        navigate('/login');
    };

    const navLinks = ROLE_NAVIGATION[role] || [];

    return (
        <div className="fixed flex flex-col w-1/5 h-screen p-6 text-white shadow-lg bg-slate-900">
            <div className="mb-4">
                <button onClick={() => handleNavigation(
                    `/${
                        (() => {
                        switch (role) {
                            case "Admin":
                                return "admindashboard"
                            case "MsStaff":
                                return "mssdashboard"
                            case "SalesTeam":
                                return "sstdashboard"
                            default:
                                break;
                        }
                    })()
                    }`
                )}
                    className="w-full text-xl font-bold font-serif text-center">
                    Manage Services Contract Portal
                </button>
            </div>
            <div className="flex-grow overflow-y-auto">
                <nav>
                    <hr className='text-sky-900 my-2' />
                    {navLinks.map(({ path, label, icon, subMenu, icon2 }) => (
                        <div key={label} className="">
                            {!subMenu ? (
                                <button
                                    onClick={() => handleNavigation(path)}
                                    className={`${linkClass(path)} font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                >
                                    {icon} {label}
                                </button>
                            ) : (
                                <>
                                    <button
                                        className={`${linkClass(path)} hover:bg-slate-800 font-semibold text-lg rounded-md flex items-center gap-x-4`}
                                        onMouseEnter={() => setHovered(true)}
                                        onMouseLeave={() => setHovered(false)}
                                    >
                                        {icon} {label} {icon2}
                                    </button>
                                    <div
                                        className={`absolute left-[2.94in] p-2 top-[15.4rem] z50 bg-slate-700 shadow-lg rounded-tl-none rounded-md transition duration-300 ${hovered ? 'opacity-100 visible' : 'opacity-0 invisible'
                                            }`}
                                        onMouseEnter={() => setHovered(true)}
                                        onMouseLeave={() => setHovered(false)}
                                    >
                                        {subMenu.map(({ path: subPath, label: subLabel, icon: subIcon, }, index) => (
                                            <>
                                                <button
                                                    key={subPath}
                                                    onClick={() => handleNavigation(subPath)}
                                                    className="w-[2.62in] mx-auto py-3 font-semibold text-lg rounded-md flex items-center gap-x-4 pl-4 text-white hover:ring-2 ring-indigo-600 transition duration-300"
                                                >
                                                    {subIcon} {subLabel}
                                                </button>
                                                {/* Render <hr> for all items except the last one */}
                                                {index < subMenu.length - 1 && <hr className="text-sky-900 my-2" />}
                                            </>
                                        ))}
                                    </div>
                                </>
                            )}
                            <hr className='text-sky-900 my-2' />
                        </div>
                    ))}
                </nav>
            </div>
            <div>
                {confirmlogout && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setConfirmlogout(false)}>
                        <div className="p-4 w-full mx-6 bg-slate-800 rounded-lg text-center relative" onClick={(e) => e.stopPropagation()}>
                            <button className="absolute top-5 right-4" onClick={() => setConfirmlogout(false)}>
                                <IoClose className="text-lg hover:text-red-500" size={24} />
                            </button>
                            <p className="font-bold mb-5 text-lg">Are you sure?</p>
                            <div className="flex justify-between gap-4">
                                <button onClick={confirmLogout} className="bg-red-900 px-4 py-2 rounded-lg hover:ring-1 ring-red-600 w-full">Yes</button>
                                <button onClick={() => setConfirmlogout(false)} className="bg-indigo-900 px-4 py-2 rounded-lg hover:ring-1 ring-indigo-600 w-full">No</button>
                            </div>
                        </div>
                    </div>
                )}
                <button
                    className="flex items-center justify-center w-full py-2 font-semibold duration-300 bg-indigo-900 rounded-lg hover:ring-2 ring-indigo-700 gap-x-2"
                    onClick={() => setConfirmlogout(true)}
                >
                    <RiLogoutCircleLine className='size-6' /> Logout
                </button>
            </div>
        </div>
    );
}
