import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PaymentAdd() {

    const [PRnumber, setPRnumber] = useState("")
    const [PRdate, setPRdate] = useState("")
    const [LOIdetails, setLOIdetails] = useState("")
    const [POnumber, setPOnumber] = useState(0)
    const [POdate, setPOdate] = useState("")
    const [InvoiceNumber, setInvoiceNumber] = useState(0)
    const [InvoiceDate, setInvoiceDate] = useState("")
    const [Paymentstatus, setPaymentstatus] = useState("")
    const [Paiddate, setPaiddate] = useState("")
    const [Paymentremarks, setPaymentremarks] = useState("")



    const PaymentSubmit = (e) => {
        e.preventDefault()

        const newPayment = { PRnumber, PRdate, LOIdetails, POnumber, POdate, InvoiceNumber, InvoiceDate, Paymentstatus, Paiddate, Paymentremarks }

        axios.post("http://localhost:4500/portaldev/createpayment", newPayment)
            .then(() => {
                alert("Payment Successful!")
            })
            .catch((err) => {
                console.error(err)
                alert("Payment Unsuccessful!")
            })

        console.log("Payment Added : ", { PRnumber, PRdate, LOIdetails, POnumber, POdate, InvoiceNumber, InvoiceDate, Paymentstatus, Paiddate, Paymentremarks });
    }

    return (
        <div className=' w-full  h-screen flex justify-center items-center '>
            <div className='w-1/2  px-5  bg-sky-700 bg-opacity-55  rounded-2xl shadow-md mt-1'>
                <form onSubmit={PaymentSubmit} >
                    <fieldset className='border-2  p-3 my-4 rounded-xl mt-2'>
                    <legend className='text-2xl font-semibold px-1'>Payments</legend>

                        <div className='grid grid-cols-2  gap-x-8'>
                            <div>
                                <label className="block text-medium font-medium text-gray-950 ">PRnumber :</label>
                                <input onChange={(e) => { setPRnumber(e.target.value) }}
                                    type='text' className="w-full mt-1 h-10 p-3 outline-1 border-b-2 border-slate-700 rounded" />
                            </div>
                            <div
                                className='mb-5'>
                                <label className="block text-medium font-medium text-gray-950">PRdate :</label>
                                <input onChange={(e) => { setPRdate(e.target.value) }}
                                    type='date' className="w-full mt-1 h-10 p-3 outline-1 border-b-2 border-slate-700 rounded" />
                            </div>
                        </div>
                        <div className='mb-5' >
                            <label className="block text-medium font-medium text-gray-950">LOIdetails :</label>
                            <input onChange={(e) => { setLOIdetails(e.target.value) }}
                                type='text' className="w-full mt-1 h-10 p-3 outline-1 border-b-2 border-slate-700 rounded" />
                        </div>
                        <div className='mb-5'>

                            <label className="block text-medium font-medium text-gray-950">Paymentremarks :</label>
                            <input onChange={(e) => { setPaymentremarks(e.target.value) }}
                                type='text' className="w-full mt-1 h-10 p-3 outline-1 border-b-2 border-slate-700 rounded" />
                        </div>
                        <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                            <div className='mb-5'>
                                <label className="block text-medium font-medium text-gray-950">POnumber:</label>
                                <input onChange={(e) => setPOnumber(e.target.value)}
                                    type='text' className="w-full mt-1 h-10 p-3 outline-1 border-b-2 border-slate-700 rounded" />
                            </div>
                            <div className='mb-5'>
                                <label className="block text-medium font-medium text-gray-950">POdate:</label>
                                <input onChange={(e) => setPOdate(e.target.value)}
                                    type='date' className="w-full mt-1 h-10 p-3 outline-1 border-b-2 border-slate-700 rounded" />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                            <div className='mb-5'>
                                <label className="block text-medium font-medium text-gray-950">InvoiceNumber:</label>
                                <input onChange={(e) => setInvoiceNumber(e.target.value)}
                                    type='text' className="w-full mt-1 h-10 p-3 outline-1 border-b-2 border-slate-700 rounded bg-gradient-to-t" />
                            </div>
                            <div className='mb-5'>
                                <label className="block text-medium font-medium text-gray-950">InvoiceDate:</label>
                                <input onChange={(e) => setInvoiceDate(e.target.value)}
                                    type='date' className="w-full mt-1 h-10 p-3 outline-1 border-b-2 border-slate-700 rounded" />
                            </div>
                        </div>
                        <div className='grid grid-cols-2  gap-x-8'>
                            <div className='mb-5'>
                                <label className="block text-medium font-medium text-gray-950">Paymentstatus:</label>
                                <input onChange={(e) => setPaymentstatus(e.target.value)}
                                    type='text' className="w-full mt-1 h-10 p-3 outline-1 border-b-2 border-slate-700 rounded" />
                            </div>
                            <div className='mb-5'>
                                <label className="block text-medium font-medium text-gray-950">Paiddate:</label>
                                <input onChange={(e) => setPaiddate(e.target.value)}
                                    type='date' className="w-full mt-1 h-10 p-3 outline-1 border-b-2 border-slate-700 rounded" />
                            </div>
                        </div>


                        <div className="flex justify-center mt-1">
                            <button className="w-2/3 py-1 bg-green-600 rounded-full text-white">Submit</button>
                        </div>


                    </fieldset>
                </form>
            </div>
        </div>

    )
}


