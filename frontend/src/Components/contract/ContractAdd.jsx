import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import StepOne from "./contractCreate/StepOne";
import StepTwo from "./contractCreate/StepTwo";
import StepThree from "./contractCreate/StepThree";
import StepFour from "./contractCreate/StepFour";
import StepFive from "./contractCreate/StepFive.jsx";

// Steps for the form
const steps = [
    "Stakeholder Information",
    "MS Staff Details",
    "Contract Core Details",
    "AMC Payment Details",
    "Final Review",
];

// Step placeholders

// Main Component
export default function ContractAdd() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        supplier: "",
        customer: "",
        customerContStartDate: "",
        customerContEndDate: "",
        supplierContStartDate: "",
        supplierContEndDate: "",
        subjectClerk: "",
        salesTeam: "",
        accountManager: "",
        manager: "",
        solutionTeam: "",
        salesEngineer: "",
        solutionEngineer: "",
        tenderNo: "",
        contractStatus: "",
        solutionDescription: "",
        remarks: "",
        AMCDetails: [
            {
                AMCpaymentterms: "",
                AMCcurrency: "",
                AMCamount: ["", "", "", "", ""],
                paymentDescription: "",
            },
        ],
    });

    const [suppliers, setSuppliers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [coordinators, setCoordinators] = useState([]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAMCDetailsChange = (index, field, value) => {
        const newAMCDetails = [...formData.AMCDetails];
        if (field === "AMCamount") {
            newAMCDetails[index].AMCamount = value;
        } else {
            newAMCDetails[index][field] = value;
        }
        setFormData((prevData) => ({
            ...prevData,
            AMCDetails: newAMCDetails,
        }));
    };

    const handleAddAMCDetail = () => {
        setFormData((prevData) => ({
            ...prevData,
            AMCDetails: [
                ...prevData.AMCDetails,
                {
                    AMCpaymentterms: "",
                    AMCcurrency: "",
                    AMCamount: ["", "", "", "", ""],
                    paymentDescription: "",
                },
            ],
        }));
    };

    const handleDeleteAMCDetail = (index) => {
        const newAMCDetails = formData.AMCDetails.filter((_, idx) => idx !== index);
        setFormData((prevData) => ({
            ...prevData,
            AMCDetails: newAMCDetails,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:4500/portaldev/createcontract",
                formData
            );
            toast.success("Contract Created successfully!");
            console.log("Contract Details: ", response.data);
            setTimeout(() => window.location.reload(), 2000);
        } catch (error) {
            toast.error("Contract Creation Failed!");
            console.error("Contract creation Failed!", error.response.data);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [SupplierResponse, CustomerResponse, CoordinatorResponse] =
                    await Promise.all([
                        axios.get("http://localhost:4500/portaldev/readsupplier"),
                        axios.get("http://localhost:4500/portaldev/readcustomer"),
                        axios.get("http://localhost:4500/portaldev/allcordinator"),
                    ]);

                setSuppliers(SupplierResponse.data);
                setCustomers(CustomerResponse.data);
                setCoordinators(CoordinatorResponse.data);
            } catch (error) {
                console.error("Data fetching failed", error);
                alert("Data fetching failed");
            }
        };
        fetchData();
    }, []);

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            <Toaster />
            <div className="w-[12in] mx-auto p-4">
                {/* Stepper Header */}
                <div className="flex items-center justify-between mb-8">
                    {steps.map((label, index) => (
                        <div key={label} className="flex-1 flex flex-col items-center">
                            <div
                                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${index <= activeStep ? "bg-indigo-600" : "bg-gray-300"
                                    }`}
                            >
                                {index + 1}
                            </div>
                            <span
                                className={`text-sm mt-2 font-semibold ${index <= activeStep ? "text-indigo-600" : "text-gray-500"
                                    }`}
                            >
                                {label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="mb-8">
                    {activeStep === 0 && (
                        <StepOne
                            formData={formData}
                            handleChange={handleChange}
                            nextStep={handleNext}
                            suppliers={suppliers}
                            customers={customers}
                        />
                    )}
                    {activeStep === 1 && (
                        <StepTwo
                            formData={formData}
                            handleChange={handleChange}
                            prevStep={handleBack}
                            nextStep={handleNext}
                            coordinators={coordinators}
                        />
                    )}
                    {activeStep === 2 && (
                        <StepThree
                            formData={formData}
                            handleChange={handleChange}
                            prevStep={handleBack}
                            nextStep={handleNext}
                        />
                    )}
                    {activeStep === 3 && (
                        <StepFour
                            formData={formData}
                            handleAMCDetailsChange={handleAMCDetailsChange}
                            handleAddAMCDetail={handleAddAMCDetail}
                            handleDeleteAMCDetail={handleDeleteAMCDetail}
                            prevStep={handleBack}
                            handleSubmit={handleSubmit}
                        />
                    )}
                    {activeStep === 4 && (
                        <StepFive
                            formData={formData}
                            editCurrent={handleBack}
                            nextStep={handleNext}
                        />
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <button
                        className="bg-blue-800 hover:ring-2 ring-blue-500 text-blue-200 duration-300 flex px-8 py-2 rounded-lg font-semibold"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </button>
                    {activeStep === steps.length - 1 ? (
                        <div className="space-x-5">
                            <button
                                type="submit"
                                className='bg-green-800 hover:ring-2 ring-green-500 text-green-200 px-8 py-2 rounded-lg font-semibold'
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                            <button
                                className="bg-red-800 hover:ring-2 ring-red-600 text-red-200 duration-300 px-5 py-2 rounded-lg font-semibold"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </div>
                    ) : (
                        <button
                            className="bg-green-800 hover:ring-2 ring-green-500 text-green-200 duration-300 px-8 py-2 rounded-lg font-semibold"
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
