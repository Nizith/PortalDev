import React, { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { FaCaretDown, FaCaretUp, FaUser } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

export default function UserRoleTable() {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedUser, setEditedUser] = useState({ username: '', role: '' });
    const [resetUserId, setResetUserId] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:4500/portaldev/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

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

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:4500/portaldev/users/${userId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers(users.filter(user => user._id !== userId));
                toast.success('User deleted successfully.');
            } else {
                toast.error('Failed to delete user.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
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
        <Toaster/>
        <div className="float-right w-full min-h-screen ">
            <h2 className="flex justify-center text-black text-2xl font-bold mt-4">User Role Table</h2>

            <div
                                className="inline-flex space-x-4 border-2 mr-5 border-indigo-600 hover:bg-gray-100 cursor-pointer px-4 py-1 rounded-lg "
                                onClick={navigateUserMng}>
                                <h1 className="font-semibold text-gray-600 text-lg">User Management</h1>
                                <FaUser className="text-gray-800 size-6" />
                            </div>



            <table className="min-w-full table-auto border border-collapse bg-gradient-to-r from-white via-gray-100 to-white rounded-xl overflow-hidden shadow-lg">
                <thead>
                    <tr className="bg-gradient-to-r from-slate-900 to-indigo-600 text-white text-sm tracking-wide">
                        <th className="px-4 py-3 font-bold uppercase border">Username</th>
                        <th className="px-4 py-3 font-bold uppercase border">Role</th>
                        <th className="px-4 py-3 font-bold uppercase border">Actions</th>
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
                                    className={`py-1 px-2 rounded font-bold ${
                                        editingUserId === user._id ? 'bg-green-500 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-700'
                                    } text-white`} 
                                    onClick={() => handleUpdate(user._id)}
                                >
                                    {editingUserId === user._id ? 'Save' : 'Update'}
                                </button>
                                <button 
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" 
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </button>
                                <button 
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded" 
                                    onClick={() => handleResetPassword(user._id)}
                                >
                                    Reset Password
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={handleConfirmResetPassword}
                            >
                                Confirm
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}
