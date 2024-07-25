import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';

// Main Component
export default function ContractAdd() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState([{
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
        AMCpaymentterms: '',
        AMCcurrency: '',
        AMCamount: ['', '', '', '', ''] // Initialize with 5 empty strings for 5 years
    }]);

    // Handle input change
    // Adjust handleChange to handle the dynamic form fields
    const handleChange = (e, index, yearIndex) => {
        const { name, value } = e.target;
        const newFormData = [...formData];
        if (name === 'AMCamount') {
            newFormData[index] = {
                ...newFormData[index],
                AMCamount: newFormData[index].AMCamount.map((amount, i) =>
                    i === yearIndex ? value : amount
                )
            };
        } else {
            newFormData[index] = {
                ...newFormData[index],
                [name]: value
            };
        }
        setFormData(newFormData);
    };

    // Proceed to next step
    const nextStep = () => {
        setTimeout(() => {
            setStep(step + 1);
        }, 300)
    };

    // Go back to previous step
    const prevStep = () => {
        setStep(step - 1);
    };

    // Go back to the step one
    const editCurrent = () => {
        setStep(step - 3)
    }

    // Handle final form submission
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    // "You can add only upto 4 forms!", { duration: 1000}
    // Event to Add new Fields
    const AddnewFeilds = (e) => {
        e.preventDefault(); // Prevent form submission
        if (formData.length >= 4) {
            return
        }
        setFormData([...formData, { AMCpaymentterms: '', AMCcurrency: '', AMCamount: ['', '', '', '', ''] }]);
    };

    // Event to delete fields
    const DeleteFields = (index) => {
        const updatedFormData = [...formData];
        updatedFormData.splice(index, 1);
        setFormData(updatedFormData);
    };


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

            <div>
                {step === 4 && (
                    <StepOne
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={nextStep}
                        suppliers={suppliers}
                        customers={customers}
                    />
                )}
                {step === 2 && (
                    <StepTwo
                        formData={formData}
                        handleChange={handleChange}
                        prevStep={prevStep}
                        nextStep={nextStep}
                        coordinators={coordinators}
                    />
                )}
                {step === 3 && (
                    <StepThree
                        formData={formData}
                        handleChange={handleChange}
                        prevStep={prevStep}
                        nextStep={nextStep}
                    />
                )}
                {step === 1 && (
                    <StepFour
                        formData={formData}
                        handleChange={handleChange}
                        AddnewFeilds={AddnewFeilds}
                        DeleteFields={DeleteFields}
                        prevStep={prevStep}
                        nextStep={nextStep}
                    />
                )}
                {step === 5 && (
                    <StepFive
                        formData={formData}
                        editCurrent={editCurrent}
                        handleSubmit={handleSubmit}
                        nextStep={nextStep}
                    />
                )}
            </div>
        </>
    );
}

// Step 1 Component
const StepOne = ({ formData, handleChange, nextStep, suppliers, customers }) => {
    return (
        <>
            <div className='w-screen h-screen fixed flex justify-center'>
                <div className='w-2/5 my-auto bg-white bg-opacity-50 rounded'>
                    <form className='m-10'>
                        <div className='mb-5'>
                            <label>Tender No :</label>
                            <input
                                className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                type="text"
                                name="tenderNo"
                                value={formData.tenderNo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-5'>
                            <label>Supplier :</label>
                            <select
                                className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                id="supplier"
                                name="supplier"
                                value={formData.supplier}
                                onChange={handleChange}
                            >
                                <option value=""></option>
                                {Array.isArray(suppliers.data) && suppliers.data.map((supplier) => (
                                    <option key={supplier._id} value={supplier.category}>{supplier.category}</option>
                                ))}
                            </select>
                        </div>
                        <div className='mb-8'>
                            <label>Customer :</label>
                            <select
                                className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
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
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none pr-2'
                                    type="date"
                                    name="customerContStartDate"
                                    value={formData.customerContStartDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Customer Contract End Date</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none pr-2'
                                    type="date"
                                    name="customerContEndDate"
                                    value={formData.customerContEndDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Supplier Contract Start Date</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none pr-2'
                                    type="date"
                                    name="supplierContStartDate"
                                    value={formData.supplierContStartDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Supplier Contract End Date</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none pr-2'
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
        </>
    );
};

// Step 2 Component
const StepTwo = ({ formData, handleChange, prevStep, nextStep, coordinators }) => {
    return (
        <>
            <div className='w-screen h-screen fixed flex justify-center'>
                <div className='w-3/5 my-auto bg-white bg-opacity-50 rounded'>
                    <form className='m-10'>
                        <div className='mb-5'>
                            <label>Subject Clerk :</label>
                            <input
                                className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                type="text"
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
                                                className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
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
                                                className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
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
                                                className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
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
                                                className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                                id="solutionTeam"
                                                name="solutionTeam"
                                                value={formData.solutionTeam}
                                                onChange={handleChange}
                                            >
                                                <option value=""></option>
                                                <option value="EDS">EDS</option>
                                                <option value="PSBD">PSBD</option>
                                            </select>
                                        </div>
                                        <div className='mb-3'>
                                            <label>Sales Engineer:</label>
                                            <select
                                                className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
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
                                                className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
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
const StepThree = ({ formData, handleChange, prevStep, nextStep }) => {
    return (
        <>
            <div className='w-screen h-screen fixed flex justify-center'>
                <div className='w-2/5 my-auto bg-white bg-opacity-50 rounded'>
                    <form className='m-10'>
                        <div className='grid grid-cols-2 gap-x-5'>
                            <div>
                                <label>Contract Status :</label>
                                <select
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none pr-2'
                                    type="text"
                                    name="contractStatus"
                                    value={formData.contractStatus}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label>Solution Description :</label>
                            <textarea
                                rows={5}
                                className='block w-full mt-1.5 rounded ps-2 pt-2 outline-none'
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
                                className='block w-full mt-1.5 rounded ps-2 pt-2 outline-none'
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
                </div>
            </div>
        </>
    )
};

// Step 4 Component
const StepFour = ({ formData, handleChange, prevStep, nextStep, AddnewFeilds, DeleteFields }) => {
    return (
        <>
            <div className='w-screen h-screen fixed flex justify-center'>
                <div className='w-4/5 my-auto bg-white bg-opacity-50 rounded'>
                    <h1 className='underline font-bold text-3xl text-indigo-800 ml-10 mt-5'>AMC Payment Details</h1>
                    <form className='m-10 mt-5 mb-5'>
                        {formData.map((field, index) => (
                            <div key={index} className='mb-3 grid grid-rows-1 grid-cols-6 gap-x-5'>
                                <div className='grid grid-rows-2'>
                                    <label>Payment Term :</label>
                                    <input
                                        className='block h-8 rounded ps-2 outline-none mt-5'
                                        type="text"
                                        name="AMCpaymentterms"
                                        value={field.AMCpaymentterms}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                <div className='grid grid-rows-2 w-1/2 ml-1'>
                                    <label>Currency :</label>
                                    <input
                                        className='block h-8 w-full rounded ps-2 py-1 outline-none mt-5'
                                        type="text"
                                        name="AMCcurrency"
                                        value={field.AMCcurrency}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                <div className='-ml-24 grid grid-rows-2'>
                                    <label className='text-center'>Amount :</label>
                                    <div className='grid grid-rows-1 grid-cols-11 gap-x-2 bg-lime-00' style={{ width: '8.9in' }}>
                                        {Array.from({ length: 5 }, (_, year) => (
                                            <div key={year} className='text-center col-span-2 -mt-6'>
                                                <button
                                                    onClick={(b) => { b.preventDefault() }}
                                                    className='bg-indigo-700 bg-opacity-80 border-2 px-5 py-1 text-white border-indigo-800 rounded-md focus-within:bg-indigo-900 mx-auto'
                                                >
                                                    Year {year + 1}
                                                </button>
                                                <input
                                                    className='block rounded ps-2 py-1 outline-none w-full' style={{ marginTop: '9px' }}
                                                    type="text"
                                                    name="AMCamount"
                                                    value={field.AMCamount[year]}
                                                    onChange={(e) => handleChange(e, index, year)}
                                                />
                                            </div>
                                        ))}
                                        <div className='ml-auto mt-auto flex justify-between gap-3'>
                                            <button type="button"
                                                className={`px-1 py-1 rounded-md ${formData.length >= 4 ? 'hover:bg-none' : 'hover:bg-neutral-300'}`}
                                                disabled={formData.length >= 4}
                                                onClick={(e) => {
                                                    if (formData.length < 4) {
                                                        AddnewFeilds(e);
                                                    } else {
                                                        // Show message or handle max fields reached
                                                    }
                                                }}
                                            >
                                                <IoMdAdd className={`size-5 ${formData.length >= 4 ? 'text-gray-500' : ''}`} />
                                            </button>
                                            <button type="button" className='hover:bg-neutral-300 px-1 py-1 rounded-md' onClick={() => { DeleteFields(index) }}><IoMdRemove className='size-5' /></button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                        {formData.length >= 4 && (
                            <div className='bg-red-800 border-2 border-red-500 px-10 py-1.5 rounded-lg mb-3'>
                                <IoIosWarning className='text-red-300 size-7' /><h3 className='text-red-300 text-lg ml-10 -mt-6'>You can only add upto 4 forms!</h3>
                            </div>
                        )}
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
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                    type="text"
                                    value={formData.supplier}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Customer :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                    type="text"
                                    value={formData.customer}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">AccountManager :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                    type="text"
                                    value={formData.accountManager}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Manager :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                    type="text"
                                    value={formData.manager}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Sales Engineer :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                    type="text"
                                    value={formData.salesEngineer}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Solution Engineer :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                    type="text"
                                    value={formData.solutionEngineer}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Tender No :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                    type="text"
                                    value={formData.tenderNo}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Customer Contract Start Date :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                    type="text"
                                    value={formData.customerContStartDate}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Customer Contract End Date :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                    type="text"
                                    value={formData.customerContEndDate}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Supplier Contract Start Date :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                    type="text"
                                    value={formData.supplierContStartDate}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Supplier Contract End Date :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                    type="text"
                                    value={formData.supplierContEndDate}
                                    disabled />
                            </div>
                            <div>
                                <label htmlFor="">Solution Description :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
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