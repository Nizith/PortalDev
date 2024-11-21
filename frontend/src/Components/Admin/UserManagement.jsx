import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UserManagement() {
    const [isuserMngOpen, setuserMngOpen] = useState(false);

    // Single state for all form fields
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
    });

    const [message, setMessage] = useState("");

    // Open and close modal
    const toggleUserMng = () => setuserMngOpen(true);
    const closeuserMng = () => {
        setuserMngOpen(false);
        setMessage("");
        setFormData({ username: "", password: "", role: "" });
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, role } = formData;

        if (!username || !password || !role) {
            setMessage("All fields are required.");
            return;
        }

        try {
            const response = await fetch("http://localhost:4500/portaldev/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || "User created successfully!");
                setFormData({ username: "", password: "", role: "" });
            } else {
                setMessage(data.message || "An error occurred.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("Failed to create user. Please try again.");
        }
    };

    return (
        <>
            <Toaster />
            <div>
                <button
                    className="w-[3in] bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 m-4 rounded-md"
                    onClick={toggleUserMng}
                >
                    Add new user
                </button>

                {isuserMngOpen && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
                        onClick={closeuserMng} // Close modal when clicking outside
                    >
                        <div
                            className="bg-white w-[5in] p-6 rounded-lg shadow-lg mx-auto mt-20"
                            onClick={(e) => e.stopPropagation()} // Prevent modal close
                        >
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        User
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
