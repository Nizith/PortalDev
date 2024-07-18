import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PaymentAdd() {

    const [PRnumber, setPRnumber] = useState(0)
    const [PRdate, setPRdate] = useState("")
    const [LOIdetails, setLOIdetails] = useState("")
    const [POnumber, setPOnumber] = useState(0)
    const [POdate, setPOdate] = useState("")
    const [InvoiceNumber, setInvoiceNumber] = useState(0)
    const [InvoiceDate, setInvoiceDate] = useState("")
    const [Paymentstatus, setPaymentstatus] = useState("")
    const [Paiddate, setPaiddate] = useState("")
    const [Paymentremarks, setPaymentremarks] = useState("")
    const [AMCpaymentterms, setAMCPaymentTerms] = useState("")
    const [AMCcurrency, setAMCcurrency] = useState("")
    const [AMCamount, setAMCamount] = useState("")


    const PaymentSubmit = (e) => {
        e.preventDefault()

        const newPayment = { PRnumber, PRdate, LOIdetails, POnumber, POdate, InvoiceNumber, InvoiceDate, Paymentstatus, Paiddate, Paymentremarks, AMCpaymentterms, AMCcurrency, AMCamount }

        axios.post("http://localhost:4500/portaldev/createPayment", newPayment)
            .then(() => {
                alert("Payment Successful!")
            })
            .catch((err) => {
                console.error(err)
                alert("Payment Unsuccessful!")
            })

        console.log("Payment Added : ", { PRnumber, PRdate, LOIdetails, POnumber, POdate, InvoiceNumber, InvoiceDate, Paymentstatus, Paiddate, Paymentremarks, AMCpaymentterms, AMCcurrency, AMCamount });
    }

    return (
        <div className='flex justify-center my-20'>
            <div className='w-2/3 p-8 bg-green-500 rounded-xl shadow-md m-auto'>
                <form onSubmit={PaymentSubmit} >
                    <fieldset className='border-2  p-4  rounded-xl' >
                        <legend className='text-xl font-semibold px-1 '>Payment Contract</legend>
                        
                        <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                            <div>
                                <label className="block text-medium font-medium text-gray-950">PRnumber :</label>
                                <input onChange={(e) => { setPRnumber(e.target.value) }}
                                    type='text' className="w-full mt-1 h-10 p-3 outline-0  border-b-2 border-slate-700 rounded" />
                            </div>
                            <div
                                className='mb-5'>
                                <label className="block text-medium font-medium text-gray-950">PRdate :</label>
                                <input onChange={(e) => { setPRdate(e.target.value) }}
                                    type='date' className="w-full mt-1 h-10 p-3 outline-0 border-b-2 border-slate-700 rounded" />
                            </div>
                        </div>
                            <div className='mb-5' flex>
                                <label className="block text-medium font-medium text-gray-950">LOIdetails :</label>
                                <input onChange={(e) => { setLOIdetails(e.target.value) }}
                                    type='text' className="w-full mt-1 h-9 p-2 outline-0 border-b-2 border-slate-700 rounded" />
                            </div>

                        <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                                <div className='mb-5'>
                                    <label className="block text-medium font-medium text-gray-950">POnumber:</label>
                                    <input onChange={(e) => setPOnumber(e.target.value)}
                                        type='text' className="w-full mt-1 h-10 p-3 outline-0 border-b-2 border-slate-700 rounded" />
                                </div>
                                <div className='mb-5'>
                                    <label className="block text-medium font-medium text-gray-950">POdate:</label>
                                    <input onChange={(e) => setPOdate(e.target.value)}
                                        type='date' className="w-full mt-1 h-10 p-3 outline-0 border-b-2 border-slate-700 rounded" />
                                </div>
                                </div>  
                        <div className='grid grid-cols-4 grid-flow-row-dense grid-rows-1 gap-y-4 gap-x-8 '>
                                <div className='col-span-3 mb-5'>
                                    <label className="block text-medium font-medium text-gray-950">Paymentremarks :</label>
                                    <input onChange={(e) => { setPaymentremarks(e.target.value) }}
                                        type='text' className="w-full mt-1 h-10 outline-0 border-b-2 border-slate-700 rounded" />
                                </div>
                                <div className='col-span-1 mb-5'>
                                    <label className="block text-medium font-medium text-gray-950">AMCpaymentterms :</label>
                                    <input onChange={(e) => { setAMCPaymentTerms(e.target.value) }}
                                        type='text' className="w-full mt-1 h-10 p-3 outline-0 border-b-2 border-slate-700 rounded" />
                                </div>
                        </div>    
                        <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                                    <div className='mb-5'>
                                        <label className="block text-medium font-medium text-gray-950">InvoiceNumber:</label>
                                        <input onChange={(e) => setInvoiceNumber(e.target.value)}
                                            type='text' className="w-full mt-1 h-10 p-3 outline-0 border-b-2 border-slate-700 rounded" />
                                    </div>
                                    <div className='mb-5'>
                                        <label className="block text-medium font-medium text-gray-950">InvoiceDate:</label>
                                        <input onChange={(e) => setInvoiceDate(e.target.value)}
                                            type='date' className="w-full mt-1 h-10 p-3 outline-0 border-b-2 border-slate-700 rounded" />
                                    </div>
                        </div>
                        <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                                    <div className='mb-5'>
                                        <label className="block text-medium font-medium text-gray-950">Paymentstatus:</label>
                                        <input onChange={(e) => setPaymentstatus(e.target.value)}
                                            type='text' className="w-full mt-1 h-10 p-3 outline-0 border-b-2 border-slate-700 rounded" />
                                    </div>
                                    <div className='mb-5'>
                                        <label className="block text-medium font-medium text-gray-950">Paiddate:</label>
                                        <input onChange={(e) => setPaiddate(e.target.value)}
                                            type='date' className="w-full mt-1 h-10 p-3 outline-0 border-b-2 border-slate-700 rounded" />
                                    </div>
                        </div>
                        <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                                    <div className='mb-5'>
                                        <label className="block text-medium font-medium text-gray-950">AMCcurrency:</label>
                                        <input onChange={(e) => setAMCcurrency(e.target.value)}
                                            type='text' className="w-full mt-1 h-10 p-3 outline-0 border-b-2 border-slate-700 rounded" />
                                    </div>
                                    <div className='mb-5'>
                                        <label className="block text-medium font-medium text-gray-950">AMCamount:</label>
                                        <input onChange={(e) => setAMCamount(e.target.value)}
                                            type='text' className="w-full mt-1 h-10 p-3 outline-0 border-b-2 border-slate-700 rounded" />
                                    </div>
                        </div>
                            
                            <div className="flex justify-center mt-8">
                                <button className="w-2/3 py-1.5 bg-blue-700 rounded-full text-white">Submit</button>
                            </div>
                           
                    </fieldset>

                </form>
            </div>
        </div>

    )
}


