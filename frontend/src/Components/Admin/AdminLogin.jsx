import React from "react";

export default function AdminLogin() {
    return (
        <>
            <div className="w-screen h-screen fixed flex justify-center">
                <div className="bg-amber-100 w-1/2 h-1/2 my-auto rounded">
                    <form action="" className="p-10">
                        <h1 className="flex justify-center -mt-3 mb-5 text-2xl font-bold">Admin Login</h1>
                        <div className="mb-5">
                            <label htmlFor="adminname" className="">Name :</label>
                            <input
                                type="text"
                                className="block w-full mt-2 h-8 rounded outline-0 border-b-2 border-slate-600 ps-3"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="adminpassword" className="">Password :</label>
                            <input
                                type="text"
                                className="block w-full mt-2 h-8 rounded outline-0 border-b-2 border-slate-600 ps-3" />
                        </div>
                        <button className="w-full py-1.5 rounded bg-slate-600 text-white">Login As Admin</button>
                    </form>
                </div>

            </div>
        </>
    )
}
