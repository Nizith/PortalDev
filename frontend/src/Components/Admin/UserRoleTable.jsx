import React, { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import 'tailwindcss/tailwind.css';
import UserManagement from './UserManagement';
import LoadingAnimation from "../Login/LoadingAnimation";
import { RiDeleteBin5Fill, RiFileEditFill } from 'react-icons/ri';

export default function UserRoleTable() {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedUser, setEditedUser] = useState({ username: '', role: '' });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [loading, setLoading] = useState(true);

    // Define available roles statically
    const [userRoles, setUserRoles] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:4500/portaldev/users', {
                    headers: {
                        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual token
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const delay = new Promise((resolve) => setTimeout(resolve, 1000));
                await Promise.all([delay, response]);

                const data = await response.json();
                setUsers(data);
                
                // Extract all roles
                const roles = data.map(user => user.role).filter(role => role); // Remove null/undefined roles

                // Get unique roles
                const uniqueRoles = [...new Set(roles)];

                setUserRoles(uniqueRoles);

            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleCancelUpdate = () => {
        setEditingUserId(null);
        setEditedUser({ username: '', role: '' });
    };

    const handleUpdate = async (userId) => {
        if (editingUserId === userId) {
            try {
                const response = await fetch(`http://localhost:4500/portaldev/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ role: editedUser.role }) // Only updating role
                });
                if (response.ok) {
                    const updatedUser = await response.json();
                    setUsers(users.map(user => user._id === userId ? updatedUser : user));
                    toast.success('User role updated successfully.');
                } else {
                    toast.error('Failed to update user role.');
                }
            } catch (error) {
                console.error('Error updating user role:', error);
            }
            setEditingUserId(null);
        } else {
            const user = users.find(user => user._id === userId);
            setEditedUser({ username: user.username, role: user.role });
            setEditingUserId(userId);
        }
    };

    const handleDeleteClick = (userId) => {
        setUserToDelete(userId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:4500/portaldev/users/${userToDelete}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers(users.filter(user => user._id !== userToDelete));
                toast.success('User deleted successfully.');
            } else {
                toast.error('Failed to delete user.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        setIsDeleteModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevState => ({ ...prevState, [name]: value }));
    };

    const navigate = useNavigate();
    const navigateUserMng = () => {
        navigate('/usemanagement');
    };

    return (
        <>
            <Toaster />
            {loading ? (
                <>
                    <LoadingAnimation />
                </>
            ) : (
                <div className="float-right w-full min-h-screen">
                    <h2 className="ms-8 font-semibold text-gray-700 text-lg mt-4 inline-flex items-center">
                        <a href='/admindashboard' className='p1'><IoIosArrowBack className='text-indigo-500' /></a>
                        <IoIosArrowForward /> User Management
                    </h2>
                    <div className='mx-8'>
                        <div className='float-right'><UserManagement /></div>
                        <table className="min-w-full font-semibold table-auto border border-collapse bg-gradient-to-r from-white via-gray-100 to-white rounded-xl overflow-hidden shadow-lg">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-900 to-indigo-600 text-white text-sm tracking-wide">
                                    <th className="px-4 py-3 font-bold uppercase border">Service number</th>
                                    <th className="px-4 py-3 font-bold uppercase border">Role</th>
                                    <th className="px-4 py-3 font-bold uppercase border w60">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border">
                                            {user.username}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {editingUserId === user._id ? (
                                                <select
                                                    name="role"
                                                    value={editedUser.role}
                                                    onChange={handleInputChange}
                                                    className="p-1 border rounded w-full"
                                                >
                                                    {userRoles.map((role) => (
                                                        <option key={role} value={role}>
                                                            {role}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                user.role
                                            )}
                                        </td>
                                        <td className="px-4 py-2 border w-96">
                                            <div className='flex justify-center gap-x-8'>
                                                <button
                                                    className={`py-1 px-2 rounded font-bold ${editingUserId === user._id
                                                        ? 'text-green-200 font-semibold px-5 py-1.5 rounded-lg bg-green-800 hover:ring-2 ring-green-500 duration-200'
                                                        : 'text-blue-800 font-semibold px-5 py-1.5 rounded-lg  duration-200'
                                                        } text-white`}
                                                    onClick={() => handleUpdate(user._id)}
                                                >
                                                    {editingUserId === user._id ? 'Save' : <RiFileEditFill size={25} />}
                                                </button>
                                                {editingUserId === user._id ? (
                                                    <button
                                                        className="text-gray-200 font-semibold px-5 py-1.5 rounded-lg bg-gray-500 hover:ring-2 ring-gray-500 duration-200"
                                                        onClick={handleCancelUpdate}
                                                    >
                                                        Cancel
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="text-red-600 font-semibold px-5 py-1.5 rounded-lg duration-200"
                                                        onClick={() => handleDeleteClick(user._id)}
                                                    >
                                                        <RiDeleteBin5Fill size={25} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Delete Confirmation Modal */}
                    {isDeleteModalOpen && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h3 className="text-xl font-semibold mb-2">Delete User</h3>
                                <p className="mb-4 text-gray-600">Are you sure you want to delete this user?</p>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        onClick={handleDeleteConfirm}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                                        onClick={() => setIsDeleteModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}