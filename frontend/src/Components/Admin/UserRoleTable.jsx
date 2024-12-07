import React, { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { FaCaretDown, FaCaretUp, FaUser } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';
import UserManagement from './UserManagement';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import LoadingAnimation from "../Login/LoadingAnimation";

export default function UserRoleTable() {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedUser, setEditedUser] = useState({ username: '', role: '' });
    const [resetUserId, setResetUserId] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // New state for delete confirmation
    const [userToDelete, setUserToDelete] = useState(null); // User to delete
    const [loading, setLoading] = useState(true);

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

                // Simulate minimum 2-second loading time
                const delay = new Promise((resolve) => setTimeout(resolve, 1000));

                // Wait for both data fetch and 2 seconds delay
                await Promise.all([delay, response]);

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false); // Stop the loading animation after both conditions are met
            }
        };


        fetchUsers();
    }, []);

    const handleCancelUpdate = () => {
        setEditingUserId(null); // Exit edit mode
        setEditedUser({ username: '', role: '' }); // Reset the edited user state
    };

    const handleUpdate = async (userId) => {
        if (editingUserId === userId) {
            // Save the updated user
            try {
                const response = await fetch(`http://localhost:4500/portaldev/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(editedUser)
                });
                if (response.ok) {
                    const updatedUser = await response.json();
                    setUsers(users.map(user => user._id === userId ? updatedUser : user));
                    toast.success('User updated successfully.');
                } else {
                    toast.error('Failed to update user.');
                }
            } catch (error) {
                console.error('Error updating user:', error);
            }
            setEditingUserId(null);
        } else {
            // Start editing the user
            const user = users.find(user => user._id === userId);
            setEditedUser({ username: user.username, role: user.role });
            setEditingUserId(userId);
        }
    };

    const handleDeleteClick = (userId) => {
        setUserToDelete(userId); // Set the user to be deleted
        setIsDeleteModalOpen(true); // Open delete confirmation modal
    }

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
        setIsDeleteModalOpen(false); // Close delete confirmation modal
    };

    const handleResetPassword = (userId) => {
        setResetUserId(userId);
        setIsModalOpen(true); // Open modal
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmResetPassword = async () => {
        try {
            const response = await fetch(`http://localhost:4500/portaldev/users/${resetUserId}/resetpassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: newPassword })
            });
            if (response.ok) {
                toast.success('Password updated successfully.');
                setIsModalOpen(false); // Close modal
                setNewPassword(''); // Reset password field
            } else {
                toast.error('Failed to reset password.');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
        }
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
                                    <th className="px-4 py-3 font-bold uppercase border">Username</th>
                                    <th className="px-4 py-3 font-bold uppercase border">Role</th>
                                    <th className="px-4 py-3 font-bold uppercase border w60">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border">
                                            {editingUserId === user._id ? (
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={editedUser.username}
                                                    onChange={handleInputChange}
                                                    className="p-1 border rounded w-full"
                                                />
                                            ) : (
                                                user.username
                                            )}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {editingUserId === user._id ? (
                                                <input
                                                    type="text"
                                                    name="role"
                                                    value={editedUser.role}
                                                    onChange={handleInputChange}
                                                    className="p-1 border rounded w-full"
                                                />
                                            ) : (
                                                user.role
                                            )}
                                        </td>
                                        <td className="px-4 py-2 border flex justify-around">
                                            <button
                                                className={`py-1 px-2 rounded font-bold ${editingUserId === user._id
                                                    ? 'text-green-200 font-semibold px-5 py-1.5 rounded-lg bg-green-800 hover:ring-2 ring-green-500 duration-200'
                                                    : 'text-blue-200 font-semibold px-5 py-1.5 rounded-lg bg-blue-800 hover:ring-2 ring-blue-500 duration-200'
                                                    } text-white`}
                                                onClick={() => handleUpdate(user._id)}
                                            >
                                                {editingUserId === user._id ? 'Save' : 'Update'}
                                            </button>
                                            {editingUserId === user._id ? (
                                                <button
                                                    className="text-gray-200 font-semibold px-5 py-1.5 rounded-lg bg-gray-500 hover:ring-2 ring-gray-500 duration-200"
                                                    onClick={handleCancelUpdate}
                                                >
                                                    Cancel
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        className="text-red-200 font-semibold px-5 py-1.5 rounded-lg bg-red-800 hover:ring-2 ring-red-500 duration-200"
                                                        onClick={() => handleDeleteClick(user._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="text-yellow-200 font-semibold px-5 py-1.5 rounded-lg bg-yellow-700 hover:ring-2 ring-yellow-500 duration-200"
                                                        onClick={() => handleResetPassword(user._id)}
                                                    >
                                                        Reset Password
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Password Reset Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h3 className="text-xl font-semibold mb-2">Reset Your Password</h3>
                                <p className="mb-4 text-gray-600">Use a strong password.</p>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="New Password"
                                    className="w-full p-2 border rounded mb-4"
                                />
                                <div className="flex justify-between gap-x-5">
                                    <button
                                        className="text-blue-200 font-semibold px-5 py-2 rounded-lg bg-blue-800 hover:ring-2 ring-blue-500 duration-200 w-full"
                                        onClick={handleConfirmResetPassword}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        className="text-gray-200 font-semibold px-5 py-2 rounded-lg bg-gray-500 hover:ring-2 ring-gray-500 duration-200 w-full"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

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
