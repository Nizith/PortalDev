import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { TbExternalLink } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { IoIosArrowForward, IoMdClose } from "react-icons/io";
import LoadingAnimation from "../Login/LoadingAnimation";
import { MdOutlineArrowRight, MdPayment, MdPayments } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import PaymentAdd from "../Payment/PaymentAdd";

export default function ManageContracts() {
  const [contracts, setContracts] = useState([]);
  const [AMCTerm, setAMCTerm] = useState("");
  const [viewDetailsRow, setViewDetailsRow] = useState(null);
  const [editedContract, setEditedContract] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openPay, setOpenPay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get("http://localhost:4500/portaldev/allcontracts");
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        await Promise.all([delay, response]);
        setContracts(response.data.data);
        setAMCTerm(response.data.data.map(contract => contract.AMCDetails?.map(amc => amc.AMCpaymentterms)).flat());
        console.log("Contract data : ", response.data)
      } catch (error) {
        console.error("Error fetching contracts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchContracts();
  }, []);

  const handleViewDetailsClick = (contract) => {
    setViewDetailsRow(contract._id);
    setEditedContract(contract);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const StoreAMCTerm = (AMCterm) => {
    setAMCTerm(AMCterm);
  };

  const [selectedAMC, setSelectedAMC] = useState({ AMCterm: "", AMCCurrency: "", AMCamount: null });

  const dopay = (AMCterm, AMCCurrency, AMCamount, tenderNo, yearIndex, period) => {

    let AMCamountPeriod;
    switch (AMCterm.toLowerCase()) {
      case "monthly in arrears":
        AMCamountPeriod = `${tenderNo}-${yearIndex + 1}-${period}`; 
        break;
      case "quarterly in arrears":
        AMCamountPeriod = `${tenderNo}-${yearIndex + 1}-${period}`;
        break;
      case "annually in arrears":
      case "annually in advance":
        AMCamountPeriod = `${tenderNo}-${yearIndex + 1}`;
        break;
      default:
        AMCamountPeriod = `${tenderNo}-${yearIndex + 1}`;
    }

    setSelectedAMC({ AMCterm, AMCCurrency, AMCamount, AMCamountPeriod });
    setOpenPay(true);
  };

  const handleCloseDoPay = () => {
    setOpenPay(false);
  };

  const handleInputChange = (e, field) => {
    setEditedContract({ ...editedContract, [field]: e.target.value });
  };

  const handleAMCChange = (e, field, amcIndex) => {
    const updatedAMC = [...editedContract.AMCDetails];
    updatedAMC[amcIndex][field] = e.target.value;
    setEditedContract({ ...editedContract, AMCDetails: updatedAMC });
  };


  const handleAMCAmountChange = (e, amcIndex, amountIndex) => {
    const updatedAMC = [...editedContract.AMCDetails];
    updatedAMC[amcIndex].AMCamount[amountIndex] = e.target.value;
    setEditedContract({ ...editedContract, AMCDetails: updatedAMC });
  };

  const handleSaveClick = (id) => {
    axios
      .put(`http://localhost:4500/portaldev/updatecontract/${id}`, editedContract)
      .then((response) => {
        setContracts(
          contracts.map((contract) =>
            contract._id === id ? response.data.data : contract
          )
        );
        toast.success("Updated successfully!");
        setViewDetailsRow(null);
        setEditedContract({});
      })
      .catch((error) => {
        toast.error("Update Failed!");
        console.error("Error updating contract:", error);
      });
  };

  const handleDeleteClick = (id) => {

    if (window.confirm('Are you sure you want to delete this Contract?')) {
      axios
        .delete(`http://localhost:4500/portaldev/deletecontract/${id}`)
        .then(() => {
          setContracts(contracts.filter((contract) => contract._id !== id));
          setViewDetailsRow(null);
          setEditedContract({});
        })
        .catch((error) => {
          console.error("Error deleting contract:", error);
        });
    }
  };

  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);

  const [isPaidState, setIsPaitState] = useState([]);

  // Fetch all payments from the API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:4500/portaldev/Allpayments");

        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        await Promise.all([delay, response]);

        const isPaidArray = response.data.data.map(payment => payment.isPaid);
        setIsPaitState(isPaidArray);

        setPayments(response.data.data);
        setFilteredPayments(response.data.data); // Set both payments and filteredPayments
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false); // Stop the loading animation after both conditions are met
      }
    };

    fetchPayments();
  }, []);

  return (
    <>
      <Toaster />
      {loading ? (
        <>
          <LoadingAnimation />
        </>
      ) : (
        <div className="float-right w-full min-h-screen">
          <h2 className="ms-8 font-semibold text-gray-700 text-lg mt-4 inline-flex items-center"><IoIosArrowForward /> Manage Contracts</h2>

          {!viewDetailsRow ? (
            <div className="overflow-x-auto rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-xl mx-8 mt-5">
              <table className="min-w-full border border-collapse table-auto bg-gradient-to-r from-white via-gray-100 to-white rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-900 to-indigo-600 text-white text-center text-sm tracking-wide">
                    <th className="py-3 px-4 font-bold uppercase border">Supplier</th>
                    <th className="py-3 px-4 font-bold uppercase border">Customer</th>
                    <th className="py-3 px-4 font-bold uppercase border">Tender No</th>
                    <th className="py-3 px-4 font-bold uppercase border">View Details</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((contract, index) => (
                    <React.Fragment key={contract._id}>
                      <tr
                        className={`${index % 2 === 0 ? "bg-white bg-opacity-80" : "bg-gray-50"
                          } hover:bg-gradient-to-r hover:from-blue-50 hover:via-gray-50 hover:to-blue-50 transition-all duration-300 ease-in-out`}
                      >
                        <td className="py-3 px-2 border text-gray-800 font-semibold">
                          {contract.supplier}
                        </td>
                        <td className="py-3 px-2 border text-gray-800 font-semibold">
                          {contract.customer}
                        </td>
                        <td className="py-3 px-2 border text-gray-800 font-semibold">
                          {contract.tenderNo}
                        </td>
                        <td className="py-3 px-2 text-center border text-indigo-500 hover:text-indigo-600 text-3xl rounded-lg transform hover:scale-105 transition-all">
                          <button
                            onClick={() => handleViewDetailsClick(contract)}
                          >
                            <TbExternalLink />
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-5 bg-gray-100">
              <div className="flex justify-between items-center mb-4">
                <div className="col-span-2 flex gap-4">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleSaveClick(viewDetailsRow)}
                        className="bg-green-800 hover:ring-2 ring-green-600 text-green-200 font-semibold px-5 py-2 rounded-lg duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => { setIsEditing(false) }}
                        className="bg-red-800 hover:ring-2 ring-red-600 text-red-100 font-semibold px-4 py-2 rounded-lg flex items-center"
                      >
                        <IoMdClose className="size-6 mr-2" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setViewDetailsRow(null)}
                      className="bg-gray-800 hover:ring-2 ring-gray-500 text-gray-200  font-semibold px-5 py-2 rounded-lg duration-200"
                    >
                      Back to List
                    </button>
                  )}
                </div>
                <div className="inline-flex space-x-5">
                  <button
                    onClick={handleEditClick}
                    className="bg-indigo-800 hover:ring-2 ring-indigo-600 text-indigo-100  font-semibold px-4 py-2 rounded-lg flex items-center duration-200"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(viewDetailsRow)}
                    className="bg-red-800 hover:ring-2 ring-red-600 text-red-200  font-semibold px-5 py-2 rounded-lg duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>


              <div className="py-5 border-4 border-emerald-600 rounded-lg px-4">

                <div className="grid gap-4 mt-5">
                  {editedContract.AMCDetails?.map((amcDetail, amcIndex) => (
                    <div key={amcIndex} className="border p-4 rounded-lg bg-white shadow-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label>AMC Payment Terms:</label>
                          <input
                            type="text"
                            value={amcDetail.AMCpaymentterms || ""}
                            onChange={(e) => handleAMCChange(e, "AMCpaymentterms", amcIndex)}
                            disabled
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                          />
                        </div>
                        <div>
                          <label>AMC Currency:</label>
                          <input
                            type="text"
                            value={amcDetail.AMCcurrency || ""}
                            onChange={(e) => handleAMCChange(e, "AMCcurrency", amcIndex)}
                            disabled
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-5 gap-3 mt-4">
                        {amcDetail.AMCamount?.map((amount, amountIndex) => (
                          <div key={amountIndex} className="col-span-1">
                            <label>Year {amountIndex + 1}:</label>
                            <div className={`${amount ? "inline-flex" : "block mt-2.5"}`}>
                              {amount ? (
                                <>
                                  <input
                                    type="text"
                                    value={amount || ""}
                                    onChange={(e) => handleAMCAmountChange(e, amcIndex, amountIndex)}
                                    disabled
                                    className={`border border-gray-300 rounded-lg px-4 py-2 ${amount === "FOC" ? "w-w-full" : "w-4/5"} `}
                                  />
                                  {(() => {
                                    const paymentTerms = amcDetail.AMCpaymentterms.toLowerCase();
                                    if (paymentTerms === "monthly in arrears" || paymentTerms === "quarterly in arrears") {
                                      return (
                                        amount !== "FOC" && (
                                          <DropdownMenu
                                            amcterm={amcDetail.AMCpaymentterms}
                                            doThePay={(period) =>
                                              dopay(
                                                amcDetail.AMCpaymentterms,
                                                amcDetail.AMCcurrency,
                                                amount,
                                                editedContract.tenderNo,
                                                amountIndex,
                                                period
                                              )
                                            }
                                          />
                                        ));
                                    } else if (paymentTerms === "annually in advance" || paymentTerms === "annually in arrears") {
                                      return (
                                        amount !== "FOC" && (
                                          <button
                                            onClick={() =>
                                              dopay(
                                                amcDetail.AMCpaymentterms,
                                                amcDetail.AMCcurrency,
                                                amount,
                                                editedContract.tenderNo,
                                                amountIndex
                                              )
                                            }
                                          >
                                            <RiMoneyDollarCircleFill className="text-indigo-600 size-10" />
                                          </button>
                                        ));
                                    }
                                    return null;
                                  })()}
                                </>
                              ) : (
                                <>
                                  <p className="font-semibold"> *No AMC Amount</p>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>


              </div>

              <hr className="bg-indigo-600 h-1 my-3" />

              <div className="grid py-5">
                <div>
                  <div className="grid grid-cols-7 gap-4">
                    <div className="col-span-1">
                      <InputField
                        label="TenderNo"
                        value={editedContract.tenderNo}
                        onChange={(e) => handleInputChange(e, "tenderNo")}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-span-3">
                      <InputField
                        label="Supplier"
                        value={editedContract.supplier}
                        onChange={(e) => handleInputChange(e, "supplier")}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-span-3">
                      <InputField
                        label="Customer"
                        value={editedContract.customer}
                        onChange={(e) => handleInputChange(e, "customer")}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <InputField
                      label="Customer Start Date"
                      type="date"
                      value={new Date(editedContract.customerContStartDate).toISOString().substr(0, 10)}
                      onChange={(e) => handleInputChange(e, "customerContStartDate")}
                      disabled={!isEditing}
                    />
                    <InputField
                      label="Customer End Date"
                      type="date"
                      value={new Date(editedContract.customerContEndDate).toISOString().substr(0, 10)}
                      onChange={(e) => handleInputChange(e, "customerContEndDate")}
                      disabled={!isEditing}
                    />
                    <InputField
                      label="Supplier Start Date"
                      type="date"
                      value={new Date(editedContract.supplierContStartDate).toISOString().substr(0, 10)}
                      onChange={(e) => handleInputChange(e, "supplierContStartDate")}
                      disabled={!isEditing}
                    />
                    <InputField
                      label="Supplier End Date"
                      type="date"
                      value={new Date(editedContract.supplierContEndDate).toISOString().substr(0, 10)}
                      onChange={(e) => handleInputChange(e, "supplierContEndDate")}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <hr className="bg-indigo-600 h-1 my-3" />

                <div className="py-5">
                  <InputField
                    label="Subject Clerk"
                    value={editedContract.subjectClerk}
                    onChange={(e) => handleInputChange(e, "subjectClerk")}
                    disabled={!isEditing}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-4">
                      <InputField
                        label="Sales Team"
                        value={editedContract.salesTeam}
                        onChange={(e) => handleInputChange(e, "salesTeam")}
                        disabled={!isEditing}
                      />
                      <InputField
                        label="Account Manager"
                        value={editedContract.accountManager}
                        onChange={(e) => handleInputChange(e, "accountManager")}
                        disabled={!isEditing}
                      />
                      <InputField
                        label="Manager"
                        value={editedContract.manager}
                        onChange={(e) => handleInputChange(e, "manager")}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="grid gap-4">
                      <InputField
                        label="Solution Team"
                        value={editedContract.solutionTeam}
                        onChange={(e) => handleInputChange(e, "solutionTeam")}
                        disabled={!isEditing}
                      />
                      <InputField
                        label="Sales Engineer"
                        value={editedContract.salesEngineer}
                        onChange={(e) => handleInputChange(e, "salesEngineer")}
                        disabled={!isEditing}
                      />
                      <InputField
                        label="Solution Engineer"
                        value={editedContract.solutionEngineer}
                        onChange={(e) => handleInputChange(e, "solutionEngineer")}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <hr className="bg-indigo-600 h-1 my-3" />

                <div className="py-5">
                  <div className="grid gap-4">
                    <InputField
                      label="Contract Status"
                      value={editedContract.contractStatus}
                      onChange={(e) => handleInputChange(e, "contractStatus")}
                      disabled={!isEditing}
                    />
                    <InputField
                      label="Solution Description"
                      value={editedContract.solutionDescription}
                      onChange={(e) => handleInputChange(e, "solutionDescription")}
                      disabled={!isEditing}
                    />
                    <InputField
                      label="Remarks"
                      value={editedContract.remarks}
                      onChange={(e) => handleInputChange(e, "remarks")}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

            </div>
          )}
          {openPay && (
            <PaymentAdd
              handleCloseModal={handleCloseDoPay}
              tenderNo={editedContract.tenderNo}
              AMCterm={selectedAMC.AMCterm}
              AMCCurrency={selectedAMC.AMCCurrency}
              AMCamount={selectedAMC.AMCamount}
              AMCamountPeriod={selectedAMC.AMCamountPeriod}
            />
          )}
        </div>
      )}
    </>
  );
}

const months = [
  "Month 1", "Month 2", "Month 3",
  "Month 4", "Month 5", "Month 6",
  "Month 7", "Month 8", "Month 9",
  "Month 10", "Month 11", "Month 12"
];

const quaters = [
  "Quater 1", "Quater 2", "Quater 3", "Quater 4"
];

const DropdownMenu = ({ amcterm, doThePay }) => {
  const [isOpen, setIsOpen] = useState(false); // State to control popup visibility

  const togglePopup = () => {
    setIsOpen(true); // Toggle the state on button click
  };

  const closepopup = () => {
    setIsOpen(false)
  }

  return (
    <nav>
      <ul className="flex items-center">
        <li>
          <button onClick={togglePopup} className="mt-1.5 text-indigo-600">
            <TbExternalLink size={30} />
          </button>

          {/* Popup block */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="absolute inset-0 bg-transparent" onClick={closepopup}></div>
              <div className="relative bg-white p-8 rounded-lg shadow-lg w-1/3 text-center">
                <h3 className="text-xl font-semibold underline text-indigo-600">{amcterm.toLowerCase() === "monthly in arrears" ? "Select a Month" : "Select Quater"}</h3>
                <div className={`mt-4 grid ${amcterm.toLowerCase() === "monthly in arrears" ? "grid-cols-3 gap-2" : "grid-cols-2"}`}>
                  {amcterm.toLowerCase() === "monthly in arrears" ? (
                    months.map((month, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          doThePay(month);
                          setIsOpen(false); // Close the popup after a selection is made
                        }}
                        className="px-6 py-3 w-full text-left my-1 cursor-pointer hover:bg-gray-200 hover:border-b-2 hover:border-b-indigo-600"
                      >
                        {month}
                      </div>
                    ))
                  ) : (
                    quaters.map((quater, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          doThePay(quater);
                          setIsOpen(false); // Close the popup after a selection is made
                        }}
                        className="grid-cols-2 px-6 py-3 w-full text-left my-1 cursor-pointer hover:bg-gray-200 hover:border-b-2 hover:border-b-indigo-600"
                      >
                        {quater}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

const InputField = ({ label, type = "text", value, onChange, disabled }) => {
  return (
    <div>
      <label>{label}:</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
      />
    </div>
  );
};
