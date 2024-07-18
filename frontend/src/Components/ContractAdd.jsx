import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        remarks: ''
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
        <div>
            {step === 1 && (
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
             {step === 4 && (
                <StepFour
                    formData={formData}
                    editCurrent={editCurrent}
                    handleSubmit={handleSubmit}
                    nextStep={nextStep}
                />
            )}
        </div>
    );
}

// Step 1 Component
const StepOne = ({ formData, handleChange, nextStep, suppliers, customers }) => {
    return (
        <>
            <div className='w-screen h-screen fixed flex justify-center'>
                <div className='w-2/5 my-auto bg-black bg-opacity-20 rounded'>
                    <form className='m-10'>

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
                <div className='w-3/5 my-auto bg-black bg-opacity-20 rounded'>
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
                        <div className='grid grid-cols-2 gap-x-5'>
                            <fieldset className='border-2 border-green-600 p-5 rounded'>
                                <legend className='text-lg font-semibold text-blue-600 ms-5 px-2'>Sales</legend>
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
                                        {Array.isArray (coordinators.data) && coordinators.data.map((coordinator) => (
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
                                        {Array.isArray (coordinators.data) && coordinators.data.map((coordinator) => (
                                            <option key={coordinator._id} value={coordinator.Manager}>{coordinator.Manager}</option>
                                        ))}
                                    </select>
                                </div>
                            </fieldset>
                            <fieldset className='border-2 border-green-600 p-5 rounded'>
                                <legend className='text-lg font-semibold text-blue-600 mx-5 px-2'>Solution</legend>
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
                                        {Array.isArray (coordinators.data) && coordinators.data.map((coordinator) => (
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
                                        {Array.isArray (coordinators.data) && coordinators.data.map((coordinator) => (
                                            <option key={coordinator._id} value={coordinator.SolutionEngineer}>{coordinator.SolutionEngineer}</option>
                                        ))}
                                    </select>
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
                <div className='w-2/5 my-auto bg-black bg-opacity-20 rounded'>
                    <form className='m-10'>
                        <div className='grid grid-cols-2 gap-x-5'>
                            <div className='mb-7'>
                                <label>Tender No :</label>
                                <input
                                    className='block w-full mt-1.5 h-8 rounded ps-2 outline-none'
                                    type="text"
                                    name="tenderNo"
                                    value={formData.tenderNo}
                                    onChange={handleChange}
                                />
                            </div>
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

//step 4 Component
const StepFour = ({ formData, editCurrent, handleSubmit }) => {
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