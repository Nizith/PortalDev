import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdAdd, IoMdRemove, IoIosWarning } from 'react-icons/io';
import toast, { Toaster } from 'react-hot-toast';

// Main Component
export default function ContractAdd() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        supplier: '',
        customer: '',
        customerContStartDate: '',
        customerContEndDate: '',
        supplierContStartDate: '',
        supplierContEndDate: '',
        subjectClerk: '',
        salesTeam: '',
        accountManager: '',
        manager: '',
        solutionTeam: '',
        salesEngineer: '',
        solutionEngineer: '',
        tenderNo: '',
        contractStatus: '',
        solutionDescription: '',
        remarks: '',
        AMCDetails: [{ AMCpaymentterms: '', AMCcurrency: '', AMCamount: ['', '', '', '', ''], paymentDescription: '' }] //Array of the AMC Details
    });

    // Handle input change
    // Adjust handleChange to handle the dynamic form fields
    const handleChange = (e, index, yearIndex) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAMCDetailsChange = (index, field, value) => {
        const newAMCDetails = [...formData.AMCDetails];
        if (field === 'AMCamount') {
            newAMCDetails[index].AMCamount = value;
        } else {
            newAMCDetails[index][field] = value;
        }
        setFormData((prevData) => ({
            ...prevData,
            AMCDetails: newAMCDetails
        }));
    };

    // "You can add only upto 4 forms!", { duration: 1000}
    // Event to Add new Fields
    const handleAddAMCDetail = (e) => {
        e.preventDefault(); // Prevent form submission
        if (formData.length >= 4) {
            return
        }
        setFormData((prevData) => ({
            ...prevData,
            AMCDetails: [...prevData.AMCDetails, { AMCpaymentterms: '', AMCcurrency: '', AMCamount: ['', '', '', '', ''], paymentDescription: '' }]
        }));
    };


    // Event to delete fields
    const handleDeleteAMCDetail = (index) => {
        const newAMCDetails = formData.AMCDetails.filter((_, idx) => idx !== index);
        setFormData((prevData) => ({
            ...prevData,
            AMCDetails: newAMCDetails
        }));
    };

    // Handle final form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const contractData = { ...formData };


        console.log('Sending contract data:', contractData);


        try {
            const response = await axios.post("http://localhost:4500/portaldev/createcontract", contractData)

            setTimeout(() => {
                window.location.reload();
            }, 2000);
            toast.success("Contract Created successfully!")

            console.log("Contract Details :- ", response.data)
        } catch (error) {

            toast.error("Contract Creation Failed!")

            console.error("Contract creation Failed!", error.response.data)
        }
    };


    // Proceed to next step
    const nextStep = () => {
        setTimeout(() => {
            setStep(step + 1);
        }, 0);
    };

    // Go back to previous step
    const prevStep = () => {
        setStep(step - 1);
    };

    // Go back to the step one
    const editCurrent = () => {
        setStep(step - 3)
    }


    // Area toFetch the Data From the DataBase
    const [suppliers, setSuppliers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [coordinators, setCoordinators] = useState([])

    // Fetch data once on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [SupplierResponse, CustomerResponse, CoordinatorResponse] = await Promise.all([
                    axios.get("http://localhost:4500/portaldev/readsupplier"),
                    axios.get("http://localhost:4500/portaldev/readcustomer"),
                    axios.get("http://localhost:4500/portaldev/allcordinator")
                ]);

                setSuppliers(SupplierResponse.data);
                setCustomers(CustomerResponse.data);
                setCoordinators(CoordinatorResponse.data);

                console.log("Supplier Data: ", SupplierResponse.data);
                console.log("Customer Data: ", CustomerResponse.data);
                console.log("Coordinator Data: ", CoordinatorResponse.data);
            } catch (error) {
                console.error("Data fetching failed", error);
                alert("Data fetching failed");
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <Toaster />
            <div className='flex justify-center'>
                <div className='w-full'>
                    <div
                        className="relative min-h-screen overflow-hidden"
                        style={{
                            // backgroundImage: `url(${ContractBgImg})`,
                            // backgroundSize: 'cover',
                            // backgroundPosition: 'center',
                            // backgroundAttachment: 'fixed'
                            backgroundColor: '#', // Ensures the background stays in place
                        }}
                    >
                        <div
                            className={`absolute inset-0 transition-transform duration-700 ease-in-out transform 
                        ${step === 1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                                }`}
                        >
                            <StepOne
                                formData={formData}
                                handleChange={handleChange}
                                nextStep={nextStep}
                                suppliers={suppliers}
                                customers={customers}
                            />
                        </div>
                        <div
                            className={`absolute inset-0 transition-transform duration-700 ease-in-out transform 
                        ${step === 2 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                                }`}
                        >

                            <StepTwo
                                formData={formData}
                                handleChange={handleChange}
                                prevStep={prevStep}
                                nextStep={nextStep}
                                coordinators={coordinators}
                            />
                        </div>

                        <div
                            className={`absolute inset-0 transition-transform duration-700 ease-in-out transform 
                        ${step === 3 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                                }`}
                        >
                            <StepThree
                                formData={formData}
                                handleChange={handleChange}
                                prevStep={prevStep}
                                nextStep={nextStep}
                            />
                        </div>

                        <div
                            className={`absolute inset-0 transition-transform duration-700 ease-in-out transform 
                        ${step === 4 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                                }`}
                        >
                            <StepFour
                                formData={formData}
                                handleAMCDetailsChange={handleAMCDetailsChange}
                                handleAddAMCDetail={handleAddAMCDetail}
                                handleDeleteAMCDetail={handleDeleteAMCDetail}
                                prevStep={prevStep}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                        {step === 5 && (
                            <StepFive
                                formData={formData}
                                editCurrent={editCurrent}
                                nextStep={nextStep}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

// Step 1 Component
const StepOne = ({ formData, handleChange, nextStep, suppliers, customers, handleSubmit }) => {
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='bg-zinc-200 bg border border-neutral-500 rounded-2xl p-8 w-full max-w-4xl'>
                <form className='m-0' onSubmit={handleSubmit}>
                    <div className='mb-5'>
                        <label>Tender No :</label>
                        <input
                            className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                            type="text"
                            id="tenderNo"
                            name="tenderNo"
                            value={formData.tenderNo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-5'>
                        <label>Supplier :</label>
                        <select
                            className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                            id="supplier"
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            {Array.isArray(suppliers.data) && suppliers.data.map((supplier) => (
                                <option key={supplier._id} value={supplier.name}>{supplier.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-8'>
                        <label>Customer :</label>
                        <select
                            className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                            id="customer"
                            name="customer"
                            value={formData.customer}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            {Array.isArray(customers.data) && customers.data.map((customer) => (
                                <option key={customer._id} value={customer.name}>{customer.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='grid grid-cols-2 gap-x-10 gap-y-8'>
                        <div>
                            <label>Customer Contract Start Date</label>
                            <input
                                className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600 pr-2'
                                type="date"
                                name="customerContStartDate"
                                value={formData.customerContStartDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Customer Contract End Date</label>
                            <input
                                className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600 pr-2'
                                type="date"
                                name="customerContEndDate"
                                value={formData.customerContEndDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Supplier Contract Start Date</label>
                            <input
                                className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600 pr-2'
                                type="date"
                                name="supplierContStartDate"
                                value={formData.supplierContStartDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Supplier Contract End Date</label>
                            <input
                                className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600 pr-2'
                                type="date"
                                name="supplierContEndDate"
                                value={formData.supplierContEndDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button type="button" onClick={nextStep} className='bg-green-600 hover:bg-blue-900 flex ml-auto mt-6 px-8 py-2 rounded text-white font-semibold'>
                        Next
                    </button>
                </form>
            </div>
        </div>
    );
};

// Step 2 Component
const StepTwo = ({ formData, handleChange, prevStep, nextStep, coordinators, handleSubmit }) => {
    return (
        <>
            <div className='flex items-center justify-center min-h-screen'>
                <div className='bg-zinc-200 border border-neutral-500 rounded-2xl p-8 w-full max-w-4xl'>
                    <form className='m-5' onSubmit={handleSubmit}>
                        <div className='mb-5'>
                            <label>Subject Clerk :</label>
                            <input
                                className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                type="text"
                                id="subjectClerk"
                                name="subjectClerk"
                                value={formData.subjectClerk}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <fieldset className='border-2 border-green-600 p-5 rounded'>
                                <legend className='text-lg font-semibold text-indigo-600 ms-5 px-2'>Sales & Solution Team</legend>
                                <div className='grid grid-cols-2 gap-x-5'>
                                    <div>
                                        <div className='mb-3'>
                                            <label>Sales Team :</label>
                                            <select
                                                className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                                id="salesTeam"
                                                name="salesTeam"
                                                value={formData.salesTeam}
                                                onChange={handleChange}
                                            >
                                                <option value=""></option>
                                                <option value="MB">MB</option>
                                                <option value="LB">LB</option>
                                                <option value="GB">GB</option>
                                            </select>
                                        </div>
                                        <div className='mb-3'>
                                            <label>AccountManager :</label>
                                            <select
                                                className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                                id="accountManager"
                                                name="accountManager"
                                                value={formData.accountManager}
                                                onChange={handleChange}
                                            >
                                                <option value=""></option>
                                                {Array.isArray(coordinators.data) && coordinators.data.map((coordinator) => (
                                                    <option key={coordinator._id} value={coordinator.AccountManager}>{coordinator.AccountManager}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='mb-3'>
                                            <label>Manager :</label>
                                            <select
                                                className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                                id="manager"
                                                name="manager"
                                                value={formData.manager}
                                                onChange={handleChange}
                                            >
                                                <option value=""></option>
                                                {Array.isArray(coordinators.data) && coordinators.data.map((coordinator) => (
                                                    <option key={coordinator._id} value={coordinator.Manager}>{coordinator.Manager}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='mb-3'>
                                            <label>Solution Team :</label>
                                            <select
                                                className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                                id="solutionTeam"
                                                name="solutionTeam"
                                                value={formData.solutionTeam}
                                                onChange={handleChange}
                                            >
                                                <option value=""></option>
                                                <option value="EDS">EDS</option>
                                                <option value="PSBD">PSBD</option>
                                                <option value="CMS">CMS</option>
                                            </select>
                                        </div>
                                        <div className='mb-3'>
                                            <label>Sales Engineer:</label>
                                            <select
                                                className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                                id="salesEngineer"
                                                name="salesEngineer"
                                                value={formData.salesEngineer}
                                                onChange={handleChange}
                                            >
                                                <option value=""></option>
                                                {Array.isArray(coordinators.data) && coordinators.data.map((coordinator) => (
                                                    <option key={coordinator._id} value={coordinator.SalesEngineer}>{coordinator.SalesEngineer}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label>Solution Engineer :</label>
                                            <select
                                                className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                                id="solutionEngineer"
                                                name="solutionEngineer"
                                                value={formData.solutionEngineer}
                                                onChange={handleChange}
                                            >
                                                <option value=""></option>
                                                {Array.isArray(coordinators.data) && coordinators.data.map((coordinator) => (
                                                    <option key={coordinator._id} value={coordinator.SolutionEngineer}>{coordinator.SolutionEngineer}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className='flex justify-between mt-6'>
                            <button type="button" onClick={prevStep} className='bg-blue-900 hover:bg-green-600 flex px-8 py-2 rounded text-white font-semibold'>
                                Previous
                            </button>
                            <button type="button" onClick={nextStep} className='bg-green-600 hover:bg-blue-900 px-8 py-2 rounded text-white font-semibold'>
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

//step 3 Component
const StepThree = ({ formData, handleChange, prevStep, nextStep, handleSubmit }) => {
    return (
        <>
            <div className='flex items-center justify-center min-h-screen'>
                <div className='bg-zinc-200 border border-neutral-500 rounded-2xl p-8 w-full max-w-4xl'>
                    <form className='m-5' onSubmit={handleSubmit}>
                        <div className='grid grid-cols-2 gap-x-5'>
                            <div>
                                <label>Contract Status :</label>
                                <select
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600 pr-2'
                                    type="text"
                                    id='contractStatus'
                                    name="contractStatus"
                                    value={formData.contractStatus}
                                    onChange={handleChange}
                                >
                                    <option value=""></option>
                                    <option value="active">Active</option>
                                    <option value="deactive">Deactive</option>
                                    <option value="terminated">Terminated</option>
                                </select>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label>Solution Description :</label>
                            <textarea
                                rows={5}
                                className='block w-full mt-1.5 rounded ps-2 pt-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                type="textarea"
                                name="solutionDescription"
                                value={formData.solutionDescription}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mt-3'>
                            <label>Remarks :</label>
                            <textarea
                                rows={5}
                                className='block w-full mt-1.5 rounded ps-2 pt-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                type="textarea"
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex justify-between mt-6'>
                            <button type="button" onClick={prevStep} className='bg-blue-900 hover:bg-green-600 flex px-8 py-2 rounded text-white font-semibold'>
                                Previous
                            </button>
                            <button type="button" onClick={nextStep} className='bg-green-600 hover:bg-blue-900 px-8 py-2 rounded text-white font-semibold'>
                                Next
                            </button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
};

// Step 4 Component
const StepFour = ({ formData, handleAMCDetailsChange, prevStep, handleAddAMCDetail, handleDeleteAMCDetail, handleSubmit }) => {
    return (
        <>
            <div className='flex justify-center'>
                <div className='my-10 mx-4 border border-neutral-500 bg-zinc-200 rounded'>
                    <h1 className='underline font-bold text-3xl text-indigo-800 ml-10 mt-5'>AMC Payment Details</h1>
                    <form className='m-10 mt-5 mb-5' onSubmit={handleSubmit}>
                        {formData.AMCDetails.map((detail, index) => (
                            <div>
                                <div key={index} className='mb-3 grid grid-rows-1 grid-cols-6 gap-x-5'>
                                    <div className='grid grid-rows-2'>
                                        <label>Payment Term :</label>
                                        <input
                                            className='block h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600 mt-5'
                                            type="text"
                                            name={`AMCpaymentterms${index}`}
                                            value={detail.AMCpaymentterms}
                                            onChange={(e) => handleAMCDetailsChange(index, 'AMCpaymentterms', e.target.value)}
                                        />
                                    </div>
                                    <div className='grid grid-rows-2 w-1/2 ml-1'>
                                        <label>Currency :</label>
                                        <input
                                            className='block h-8 w-full rounded ps-2 py-1 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600 mt-5'
                                            type="text"
                                            name={`AMCcurrency${index}`}
                                            value={detail.AMCcurrency}
                                            onChange={(e) => handleAMCDetailsChange(index, 'AMCcurrency', e.target.value)}
                                        />
                                    </div>
                                    <div className='-ml-24 grid grid-rows-2'>
                                        <label className='text-center'>Amount :</label>
                                        <div className='grid grid-rows-1 grid-cols-11 gap-x-2 bg-lime-00' style={{ width: '8.9in' }}>
                                            {detail.AMCamount.map((amount, amtIndex) => (
                                                <div key={amtIndex} className='text-center col-span-2 -mt-6'>
                                                    <button
                                                        onClick={(b) => { b.preventDefault() }}
                                                        className='bg-indigo-700 bg-opacity-80 border-2 px-5 py-1 text-white border-indigo-800 rounded-md focus-within:bg-indigo-900 mx-auto'
                                                    >
                                                        Year {amtIndex + 1}
                                                    </button>
                                                    <input
                                                        className='block rounded ps-2 py-1 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600 w-full'
                                                        style={{ marginTop: '9px' }}
                                                        type="text"
                                                        name={`AMCamount${index}${amtIndex}`}
                                                        value={amount}
                                                        onChange={(e) => {
                                                            const newAmounts = [...detail.AMCamount];
                                                            newAmounts[amtIndex] = e.target.value;
                                                            handleAMCDetailsChange(index, 'AMCamount', newAmounts);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                            <div className='ml-auto mt-auto flex justify-between gap-3'>
                                                <button
                                                    type="button"
                                                    className={`px-1 py-1 rounded-md ${formData.AMCDetails.length >= 4 ? 'hover:bg-none' : 'hover:bg-neutral-300'}`}
                                                    disabled={formData.AMCDetails.length >= 4}
                                                    onClick={handleAddAMCDetail}
                                                >
                                                    <IoMdAdd className={`size-5 ${formData.AMCDetails.length >= 4 ? 'text-gray-500' : ''}`} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`px-1 py-1 rounded-md ${formData.AMCDetails.length == 1 ? 'hover:bg-none' : 'hover:bg-neutral-300'}`}
                                                    disabled={formData.AMCDetails.length == 1}
                                                    onClick={() => handleDeleteAMCDetail(index)}
                                                >
                                                    <IoMdRemove className={`size-5 ${formData.AMCDetails.length == 1 ? 'text-gray-500' : ''}`} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-rows-2 mb-5'>
                                    <label>Payment Description :</label>
                                    <textarea
                                        rows={1}
                                        className='block w-full -mt-0.5 rounded ps-2 py-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                        type="textarea"
                                        name={`paymentDescription${index}`}
                                        value={formData.paymentDescription}
                                        onChange={(e) => handleAMCDetailsChange(index, 'paymentDescription', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                        {formData.AMCDetails.length >= 4 && (
                            <div className='bg-red-800 border-2 border-red-500 px-10 py-1.5 rounded-lg mb-3'>
                                <IoIosWarning className='text-red-300 size-7' />
                                <h3 className='text-red-300 text-lg ml-10 -mt-7'>You can only add up to 4 forms!</h3>
                            </div>
                        )}
                        <div className='flex justify-between mt-6'>
                            <button type="button" onClick={prevStep} className='bg-blue-900 hover:bg-green-600 flex px-8 py-2 rounded text-white font-semibold'>
                                Previous
                            </button>
                            <button type="submit" className='bg-green-600 hover:bg-blue-900 px-8 py-2 rounded text-white font-semibold'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};


//step 5 Component
const StepFive = ({ formData, editCurrent, handleSubmit }) => {
    return (
        <>
            <div className='w-screen h-screen fixed flex justify-center'>
                <div className='w-2/5 my-auto bg-black bg-opacity-20 rounded'>
                    <div className='m-10 '>
                        <div className='grid grid-cols-2 gap-5'>
                            <div>
                                <label htmlFor="">Supplier :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.supplier}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Customer :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.customer}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">AccountManager :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.accountManager}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Manager :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.manager}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Sales Engineer :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.salesEngineer}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Solution Engineer :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.solutionEngineer}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Tender No :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.tenderNo}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Customer Contract Start Date :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.customerContStartDate}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Customer Contract End Date :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.customerContEndDate}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Supplier Contract Start Date :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.supplierContStartDate}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Supplier Contract End Date :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.supplierContEndDate}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Solution Description :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 border border-gray-400 focus:outline-none focus:border-2 focus:border-indigo-600'
                                    type="text"
                                    value={formData.solutionDescription}
                                    disabled />
                            </div>
                        </div>

                        <div className='flex justify-between mt-6'>
                            <button type="button" onClick={editCurrent} className='bg-blue-900 hover:bg-green-600 px-8 py-2 rounded text-white font-semibold'>
                                Edit
                            </button>
                            <button type="button" onClick={handleSubmit} className='bg-green-600 hover:bg-blue-900 px-8 py-2 rounded text-white font-semibold'>
                                Pay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};


// Export all components together
export { StepOne, StepTwo, StepThree, StepFour, StepFive };