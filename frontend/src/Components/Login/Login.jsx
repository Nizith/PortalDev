import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import toast, { Toaster } from "react-hot-toast";
import LoginBgImg from "../../images/loginimage.jpg";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [logindata, setlogindata] = useState({
        username: "",
        password: ""
    });

    const handleLoginChange = (l) => {
        const { name, value } = l.target;
        setlogindata(logindata => ({
            ...logindata,
            [name]: value
        }));
    };

    const SubmitLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:4500/portaldev/login", logindata);

            toast.success("Login Successful!");

            const { token, role } = response.data;

            // Store the token and role in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            console.log("Token Stored:", localStorage.getItem('token'));
            console.log("Role Stored:", localStorage.getItem('role'));

            // Redirect based on the role
            setTimeout(() => {
                if (role === "Admin") {
                    navigate('/admindashboard');
                } else if (role === "MsStaff") {
                    navigate('/userdashboard');
                } else if (role === "SalesTeam") {
                    navigate('/userdashboard');
                }
            }, 1500);

        } catch (error) {
            toast.error("Login Failed. Invalid credentials!");
            console.error(error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Toaster />
            <div className="relative w-screen h-screen">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${LoginBgImg})`,
                    }}
                />
                <div className="absolute right-10 top-28 w-2/6">
                    <div className="bg-white bg-opacity-30 border-2 my-auto rounded-3xl shadow-2xl p-5">
                        <form className="p-10 mt-3 font-bold" onSubmit={SubmitLogin}>
                            <h1 className="flex justify-center -mt-8 mb-5 text-3xl text-center font-serif">
                                Managed Services Contract Portal
                            </h1>
                            <div className="my-10">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Enter Username..."
                                    onChange={handleLoginChange}
                                    className="block w-full mx-auto mt-2 h-12 bg-slate-200 border border-green-600 outline-none focus:ring-1 ring-green-600 rounded-lg  ps-5 text-black font-normal"
                                />
                            </div>
                            <div className="mb-5 relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Enter the Password..."
                                    onChange={handleLoginChange}
                                    className="block w-full mx-auto mt-2 h-12 bg-slate-200 border border-green-600 outline-none focus:ring-1 ring-green-600 rounded-lg  ps-5 text-black font-normal"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-5 flex items-center text-blue-600 hover:text-blue-800 focus:outline-none"
                                >
                                    {showPassword ? <VscEyeClosed size={25} /> : <VscEye size={25} />}
                                </button>
                            </div>
                            <div className="flex justify-center">
                                <button className="w-full h-12 text-xl mt-5 py-2 px-10 rounded-lg text-white duration-300 bg-indigo-900 hover:ring-2 ring-indigo-700 font-bold font-mono">
                                    Log In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
