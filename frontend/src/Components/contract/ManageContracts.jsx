import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { TbExternalLink } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import LoadingAnimation from "../Login/LoadingAnimation";
import { MdPayment } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PaymentAdd from "../Payment/PaymentAdd";

export default function ManageContracts() {
  const [contracts, setContracts] = useState([]);
  const [viewDetailsRow, setViewDetailsRow] = useState(null);
  const [editedContract, setEditedContract] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openPay, setOpenPay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContracts = async () =>  {
        try {
            const response = await axios.get("http://localhost:4500/portaldev/allcontracts");
            const delay = new Promise((resolve) => setTimeout(resolve, 1000));
            await Promise.all([delay, response]);
            setContracts(response.data.data);
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

  const dopay = () => {
    setOpenPay(true)
  }

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

  

  return (
    <>
    <Toaster />
      {loading ? (
        <>
          <LoadingAnimation />
        </>
      ) : (
        <div className="float-right w-full min-h-screen">
          <h1 className="text-2xl font-bold text-gray-900 my-5 ms-8">
            Contract Details
          </h1>

          {!viewDetailsRow ? (
            <div className="overflow-x-auto rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-xl mx-8">
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
                            <div className="inline-flex">
                              <input
                                type="text"
                                value={amount || ""}
                                onChange={(e) => handleAMCAmountChange(e, amcIndex, amountIndex)}
                                disabled
                                className="border border-gray-300 rounded-lg px-4 py-2 w-3/5"
                              />
                              <button onClick={dopay}>
                                <MdPayment className="text-indigo-600 size-8" />
                              </button>
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
                      <label>TenderNo:</label>
                      <input
                        type="text"
                        value={editedContract.tenderNo}
                        onChange={(e) => handleInputChange(e, "tenderNo")}
                        disabled={!isEditing}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                    <div className="col-span-3">
                      <label>Supplier:</label>
                      <input
                        type="text"
                        value={editedContract.supplier}
                        onChange={(e) => handleInputChange(e, "supplier")}
                        disabled={!isEditing}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                    <div className="col-span-3">
                      <label>Customer:</label>
                      <input
                        type="text"
                        value={editedContract.customer}
                        onChange={(e) => handleInputChange(e, "customer")}
                        disabled={!isEditing}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                  </div>


                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div>
                      <label>Customer Start Date:</label>
                      <input
                        type="date"
                        value={new Date(editedContract.customerContStartDate)
                          .toISOString()
                          .substr(0, 10)}
                        onChange={(e) => handleInputChange(e, "customerContStartDate")}
                        disabled={!isEditing}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                    <div>
                      <label>Customer End Date:</label>
                      <input
                        type="date"
                        value={new Date(editedContract.customerContEndDate)
                          .toISOString()
                          .substr(0, 10)}
                        onChange={(e) => handleInputChange(e, "customerContEndDate")}
                        disabled={!isEditing}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                    <div>
                      <label>Supplier Start Date:</label>
                      <input
                        type="date"
                        value={new Date(editedContract.supplierContStartDate)
                          .toISOString()
                          .substr(0, 10)}
                        onChange={(e) => handleInputChange(e, "supplierContStartDate")}
                        disabled={!isEditing}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                    <div>
                      <label>Supplier End Date:</label>
                      <input
                        type="date"
                        value={new Date(editedContract.supplierContEndDate)
                          .toISOString()
                          .substr(0, 10)}
                        onChange={(e) => handleInputChange(e, "supplierContEndDate")}
                        disabled={!isEditing}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                  </div>

                </div>

                <hr className="bg-indigo-600 h-1 my-3" />

                <div className="py-5">

                  <div>
                    <label>Subject Clerk:</label>
                    <input
                      type="text"
                      value={editedContract.subjectClerk}
                      onChange={(e) => handleInputChange(e, "subjectClerk")}
                      disabled={!isEditing}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-4">
                      <div>
                        <label>Sales Team:</label>
                        <input
                          type="text"
                          value={editedContract.salesTeam}
                          onChange={(e) => handleInputChange(e, "salesTeam")}
                          disabled={!isEditing}
                          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                        />
                      </div>
                      <div>
                        <label>Account Manager:</label>
                        <input
                          type="text"
                          value={editedContract.accountManager}
                          onChange={(e) => handleInputChange(e, "accountManager")}
                          disabled={!isEditing}
                          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                        />
                      </div>
                      <div>
                        <label> Manager:</label>
                        <input
                          type="text"
                          value={editedContract.manager}
                          onChange={(e) => handleInputChange(e, "manager")}
                          disabled={!isEditing}
                          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                        />
                      </div>

                    </div>

                    <div className="grid gap-4">
                      <div>
                        <label>Solution Team:</label>
                        <input
                          type="text"
                          value={editedContract.solutionTeam}
                          onChange={(e) => handleInputChange(e, "solutionTeam")}
                          disabled={!isEditing}
                          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                        />
                      </div>
                      <div>
                        <label>Sales Engineer:</label>
                        <input
                          type="text"
                          value={editedContract.salesEngineer}
                          onChange={(e) => handleInputChange(e, "salesEngineer")}
                          disabled={!isEditing}
                          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                        />
                      </div>
                      <div>
                        <label>Solution Engineer:</label>
                        <input
                          type="text"
                          value={editedContract.solutionEngineer}
                          onChange={(e) => handleInputChange(e, "solutionEngineer")}
                          disabled={!isEditing}
                          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                        />
                      </div>

                    </div>
                  </div>
                </div>

                <hr className="bg-indigo-600 h-1 my-3" />

                <div className="py-5">
                  <div className="grid gap-4">
                    <div>
                      <label>Contract Status:</label>
                      <input
                        type="text"
                        value={editedContract.contractStatus}
                        onChange={(e) => handleInputChange(e, "contractStatus")}
                        disabled={!isEditing}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                    <div>
                      <label>Solution Description:</label>
                      <input
                        type="text"
                        value={editedContract.solutionDescription}
                        onChange={(e) => handleInputChange(e, "solutionDescription")}
                        disabled={!isEditing}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                    <div>
                      <label>Remarks:</label>
                      <input
                        type="text"
                        value={editedContract.remarks}
                        onChange={(e) => handleInputChange(e, "remarks")}
                        disabled={!isEditing}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {openPay &&
            <PaymentAdd
              handleCloseModal={handleCloseDoPay}
              tenderNumber={editedContract.tenderNo}
              AMCterm={editedContract.AMCDetails[0]?.AMCpaymentterms}
              AMCCurrency={editedContract.AMCDetails[0]?.AMCcurrency}
            />}
        </div>
      )}
    </>
  );
}
