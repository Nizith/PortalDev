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
                    <div className="bg-blue-900 w-2/5 h-1/2 my-auto rounded-md">
                        <form action="" className="p-10 text-white" onSubmit={Approve}>
                            <h1 className="flex justify-center -mt-3 mb-5 text-2xl  font-bold">Managed Services Contract Portal</h1>
                            <div className="mb-5">
                                <label htmlFor="adminname" className="">Name :</label>
                                <input
                                    type="text"
                                    onChange={(a) => setadminname(a.target.value)}
                                    className="block w-full mt-2 h-8 rounded outline-0 border-b-2 border-slate-600 ps-3 text-black"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="adminpassword" className="">Password :</label>
                                <input
                                    type="text"
                                    onChange={(a) => setadminpassword(a.target.value)}
                                    className="block w-full mt-2 h-8 rounded outline-0 border-b-2 border-slate-600 ps-3 text-black" />
                            </div>
                            <button className="w-full mt-5 py-1.5 rounded bg-green-500 hover:bg-green-600 hover:duration-300 hover:outline outline-1 font-semibold" onClick={Approve}>Login</button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}
