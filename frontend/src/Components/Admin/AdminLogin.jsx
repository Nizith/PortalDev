import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BgImg from '../../images/enterprise3.jpg'

export default function AdminLogin() {

    const [adminname, setadminname] = useState('');
    const [adminpassword, setadminpassword] = useState('');
    const navigate = useNavigate();

    const Approve = (e) => {
        e.preventDefault();

        if (adminname === 'admin' && adminpassword === '1234') {
            navigate('/admindash')
        }
        if (adminname === 'user' && adminpassword == '123') {
            navigate('/addcontract')
        } else {
            alert("Invalid credentials");
        }
    }
    return (
        <>
            <div className="">
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="bg-white bg-opacity-90 w-1/3 my-auto rounded-3xl shadow-2xl p-5">
                        <form action="" className="p-10 mt-3 font-bold" onSubmit={Approve}>
                            <h1 className="flex justify-center -mt-3 mb-5 text-3xl text-center  font-bold">Managed Services Contract Portal</h1>
                            <div className="my-10">
                                <input
                                    type="text"
                                    placeholder="Enter Username..."
                                    onChange={(a) => setadminname(a.target.value)}
                                    className="block w-full mx-auto mt-2 h-12 bg-slate-200 rounded-3xl outline-0 border-b-4 border-slate-600 ps-5 text-black font-normal"
                                />
                            </div>
                            <div className="mb-5">
                                <input
                                    type="text"
                                    placeholder="Enter the Password..."
                                    onChange={(a) => setadminpassword(a.target.value)}
                                    className="block w-full mx-auto mt-2 h-12 bg-slate-200 rounded-3xl outline-0 border-b-4 border-slate-600 ps-5 text-black font-normal" />
                            </div>
                            <div className="flex justify-center">
                                <button className="w-2/3 mt-5 py-2 px-10 rounded-3xl text-white bg-green-500 hover:bg-green-600 hover:duration-300 font-semibold" onClick={Approve}>Login</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}
