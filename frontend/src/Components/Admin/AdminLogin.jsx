import React from "react";

export default function AdminLogin() {
    return (
        <>
            <div className="w-screen h-screen fixed flex justify-center">
                <div className="bg-blue-900 w-2/5 h-1/2 my-auto rounded-md">
                    <form action="" className="p-10 text-white">
                        <h1 className="flex justify-center -mt-3 mb-5 text-2xl  font-bold">Admin Login</h1>
                        <div className="mb-5">
                            <label htmlFor="adminname" className="">Name :</label>
                            <input
                                type="text"
                                className="block w-full mt-2 h-8 rounded outline-0 border-b-2 border-slate-600 ps-3 text-black"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="adminpassword" className="">Password :</label>
                            <input
                                type="text"
                                className="block w-full mt-2 h-8 rounded outline-0 border-b-2 border-slate-600 ps-3 text-black" />
                        </div>
                        <button className="w-full py-1.5 rounded bg-green-500 hover:bg-green-600 hover:duration-300  font-semibold">Login As Admin</button>
                    </form>
                </div>

            </div>
        </>
    )
}
