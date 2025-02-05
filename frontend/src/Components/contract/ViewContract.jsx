import React, { useState, useEffect } from "react";
import axios from "axios";
import { TbExternalLink } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";
import LoadingAnimation from "../Login/LoadingAnimation";

// Styled Field Component
const StyledField = ({ label, value }) => (
  <div>
    <label className="text-gray-700 font-medium mb-1 block">{label}:</label>
    <p className="border-l-2 border-slate-600 roundd-lg ps-3 py-2 bg-white">{value}</p>
  </div>
);

export default function ViewContract() {
  const [contracts, setContracts] = useState([]);
  const [viewDetailsRow, setViewDetailsRow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
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
    };
    fetchContracts();
  }, []);

  const handleViewDetailsClick = (contract) => {
    setViewDetailsRow(contract._id);
  };

  const selectedContract = contracts.find((c) => c._id === viewDetailsRow);

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="float-right w-full min-h-screen">
          <h2 className="ms-8 font-semibold text-gray-700 text-lg mt-4 inline-flex items-center">
            <IoIosArrowForward />View Contracts
          </h2>

          {!viewDetailsRow ? (
            <div className="mx-8 mt-5">
              <table className="min-w-full border border-collapse table-auto bg-gradient-to-r from-white via-gray-100 to-white rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-900 to-indigo-600 text-white text-center text-sm tracking-wide">
                    <th className="py-2 px-4 font-bold uppercase border">Supplier</th>
                    <th className="py-2 px-4 font-bold uppercase border">Customer</th>
                    <th className="py-2 px-4 font-bold uppercase border">Tender No</th>
                    <th className="py-2 px-4 font-bold uppercase border">View Details</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((contract) => (
                    <tr key={contract._id}>
                      <td className="py-3 px-2 border font-semibold">{contract.supplier}</td>
                      <td className="py-3 px-2 border font-semibold">{contract.customer}</td>
                      <td className="py-3 px-2 border font-semibold">{contract.tenderNo}</td>
                      <td className="py-3 px-2 text-center border">
                        <button
                          onClick={() => handleViewDetailsClick(contract)}
                          className="text-indigo-500 hover:text-indigo-600 text-3xl transform hover:scale-105 transition-all"
                        >
                          <TbExternalLink />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-5 bg-gray-100 relative">
              <div>
                <button
                  onClick={() => setViewDetailsRow(null)}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold px-5 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  Back to List
                </button>
              </div>

              <div className="grid gap-5 mt-4">
                <div className="grid grid-cols-3 gap-4">
                  <StyledField label="TenderNo" value={selectedContract?.tenderNo} />
                  <StyledField label="Supplier" value={selectedContract?.supplier} />
                  <StyledField label="Customer" value={selectedContract?.customer} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <StyledField
                    label="Customer Start Date"
                    value={new Date(selectedContract?.customerContStartDate).toISOString().substr(0, 10)}
                  />
                  <StyledField
                    label="Customer End Date"
                    value={new Date(selectedContract?.customerContEndDate).toISOString().substr(0, 10)}
                  />
                  <StyledField
                    label="Supplier Start Date"
                    value={new Date(selectedContract?.supplierContStartDate).toISOString().substr(0, 10)}
                  />
                  <StyledField
                    label="Supplier End Date"
                    value={new Date(selectedContract?.supplierContEndDate).toISOString().substr(0, 10)}
                  />
                </div>

                <hr className="bg-indigo-600 h-1" />

                <StyledField label="Subject Clerk" value={selectedContract?.subjectClerk} />

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-4">
                    <StyledField label="Sales Team" value={selectedContract?.salesTeam} />
                    <StyledField label="Account Manager" value={selectedContract?.accountManager} />
                    <StyledField label="Manager" value={selectedContract?.manager} />
                  </div>
                  <div className="grid gap-4">
                    <StyledField label="Solution Team" value={selectedContract?.solutionTeam} />
                    <StyledField label="Sales Engineer" value={selectedContract?.salesEngineer} />
                    <StyledField label="Solution Engineer" value={selectedContract?.solutionEngineer} />
                  </div>
                </div>

                <hr className="bg-indigo-600 h-1" />

                <div className="grid grid-cols-2 gap-4">
                  <StyledField label="Contract Status" value={selectedContract?.contractStatus} />
                  <StyledField label="Solution Description" value={selectedContract?.solutionDescription} />
                  <StyledField label="Remarks" value={selectedContract?.remarks} />
                </div>

                <hr className="bg-indigo-600 h-1" />

                <div className="grid grid-cols-2 gap-4">
                  <StyledField
                    label="AMC Payment Terms"
                    value={selectedContract?.AMCDetails[0]?.AMCpaymentterms}
                  />
                  <StyledField
                    label="AMC Currency"
                    value={selectedContract?.AMCDetails[0]?.AMCcurrency}
                  />
                </div>

                <div className="grid grid-cols-5 gap-4">
                  {selectedContract?.AMCDetails[0]?.AMCamount.map((amount, index) => (
                    amount ?
                      <StyledField
                        key={index}
                        label={`AMC Amount ${index + 1}`}
                        value={amount}
                      />
                      :
                      <p className="font-semibold pt-9"> *No AMC Amount</p>
                  ))}
                </div>

                <hr className="bg-indigo-600 h-1" />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}