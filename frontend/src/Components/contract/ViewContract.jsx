import React, { useState, useEffect } from "react";
import axios from "axios";
import { TbExternalLink } from "react-icons/tb";
import LoadingAnimation from "../Login/LoadingAnimation";

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

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="float-right w-full min-h-screen">

          <h1 className="text-4xl font-bold text-gray-900 my-5 text-center">Contract Details</h1>

          {!viewDetailsRow ? (
            <div className="overflow-x-auto rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-xl mx-8">
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
                    <tr key={contract._id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:via-gray-50 hover:to-blue-50 transition-all duration-300 ease-in-out">
                      <td className="py-3 px-2 border text-gray-800 font-semibold">{contract.supplier}</td>
                      <td className="py-3 px-2 border text-gray-800 font-semibold">{contract.customer}</td>
                      <td className="py-3 px-2 border text-gray-800 font-semibold">{contract.tenderNo}</td>
                      <td className="py-3 px-2 text-center border text-indigo-500 hover:text-indigo-600 text-3xl rounded-lg transform hover:scale-105 transition-all">
                        <button onClick={() => handleViewDetailsClick(contract)}>
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

              <div className="absolute top-6 left-5 -mt-20">
                <button onClick={() => setViewDetailsRow(null)} className="bg-gray-800 hover:ring-2 ring-gray-500 text-gray-200 font-semibold px-5 py-2 rounded-lg duration-200">
                  Back to List
                </button>
              </div>
              <div className="grid py-5">
                <div className="grid grid-cols-3 gap-4 z-10">
                  <div>
                    <label>TenderNo:</label>
                    <p className="border-l-2 border-slate-600 rounded-lg ps-3">{contracts.find((c) => c._id === viewDetailsRow)?.tenderNo}</p>
                  </div>
                  <div>
                    <label>Supplier:</label>
                    <p className="border-l-2 border-slate-600 rounded-lg ps-3">{contracts.find((c) => c._id === viewDetailsRow)?.supplier}</p>
                  </div>
                  <div>
                    <label>Customer:</label>
                    <p className="border-l-2 border-slate-600 rounded-lg ps-3">{contracts.find((c) => c._id === viewDetailsRow)?.customer}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-5">
                  <div>
                    <label>Customer Start Date:</label>
                    <p className="border-l-2 border-slate-600 rounded-lg ps-3">{new Date(contracts.find((c) => c._id === viewDetailsRow)?.customerContStartDate).toISOString().substr(0, 10)}</p>
                  </div>
                  <div>
                    <label>Customer End Date:</label>
                    <p className="border-l-2 border-slate-600 rounded-lg ps-3">{new Date(contracts.find((c) => c._id === viewDetailsRow)?.customerContEndDate).toISOString().substr(0, 10)}</p>
                  </div>
                  <div>
                    <label>Supplier Start Date:</label>
                    <p className="border-l-2 border-slate-600 rounded-lg ps-3">{new Date(contracts.find((c) => c._id === viewDetailsRow)?.supplierContStartDate).toISOString().substr(0, 10)}</p>
                  </div>
                  <div>
                    <label>Supplier End Date:</label>
                    <p className="border-l-2 border-slate-600 rounded-lg ps-3">{new Date(contracts.find((c) => c._id === viewDetailsRow)?.supplierContEndDate).toISOString().substr(0, 10)}</p>
                  </div>
                </div>

                <hr className="bg-indigo-600 h-1 my-3" />

                <div>
                  <label>Subject Clerk:</label>
                  <p className="border-l-2 border-slate-600 rounded-lg ps-3">{contracts.find((c) => c._id === viewDetailsRow)?.subjectClerk}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-4">
                    <div>
                      <label>Sales Team:</label>
                      <p className="border-l-2 border-slate-600 rounded-lg ps-3">{contracts.find((c) => c._id === viewDetailsRow)?.salesTeam}</p>
                    </div>
                    <div>
                      <label>Account Manager:</label>
                      <p className="border-l-2 border-slate-600 rounded-lg ps-3">{contracts.find((c) => c._id === viewDetailsRow)?.accountManager}</p>
                    </div>
                    <div>
                      <label>Manager:</label>
                      <p className="border-l-2 border-slate-600 rounded-lg ps-3">{contracts.find((c) => c._id === viewDetailsRow)?.manager}</p>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <label>Solution Team</label>
                      <p className="border-l-2 border-slate-600 rounded-lg ps-3">{contracts.find((c) => c._id === viewDetailsRow)?.solutionTeam}</p>
                    </div>
                    <div>
                      <label>Sales Engineer:</label>
                      <p className="border-l-2 border-slate-600 rounded-lg ps-3">{contracts.find((c) => c._id === viewDetailsRow)?.salesEngineer}</p>
                    </div>
                    <div>
                      <label>Solution Engineer:</label>
                      <p className="border-l-2 border-slate-600 rounded-lg ps-3">{contracts.find((c) => c._id === viewDetailsRow)?.solutionEngineer}</p>
                    </div>
                  </div>
                </div>

                <hr className="bg-indigo-600 h-1 my-3" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label>Contract Status:</label>
                    <p className="border-l-2 border-slate-600 rounded-lg ps-3">{contracts.find((c) => c._id === viewDetailsRow)?.contractStatus}</p>
                  </div>
                  <div>
                    <label>Solution Description:</label>
                    <p className="border-l-2 border-slate-600 rounded-lg ps-3">{contracts.find((c) => c._id === viewDetailsRow)?.solutionDescription}</p>
                  </div>
                  <div>
                    <label>Remarks:</label>
                    <p className="border-l-2 border-slate-600 rounded-lg ps-3">{contracts.find((c) => c._id === viewDetailsRow)?.remarks}</p>
                  </div>
                </div>

                <hr className="bg-indigo-600 h-1 my-3" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label>AMC Payment Terms:</label>
                    <p className="border-l-2 border-slate-600 rounded-lg ps-3">{contracts.find((c) => c._id === viewDetailsRow)?.AMCDetails[0]?.AMCpaymentterms}</p>
                  </div>
                  <div>
                    <label>AMC Currency:</label>
                    <p className="border-l-2 border-slate-600 rounded-lg ps-3">{contracts.find((c) => c._id === viewDetailsRow)?.AMCDetails[0]?.AMCcurrency}</p>
                  </div>
                </div>
                <>
                  <div className="grid grid-cols-5 gap-4 mt-4">
                    {contracts.find((c) => c._id === viewDetailsRow)?.AMCDetails[0]?.AMCamount.map((amount, index) => (
                      <div key={index} className="col-span-1">
                        <label>AMC Amount {index + 1}:</label>
                        <p className="border-l-2 border-slate-600 rounded-lg ps-3">{amount}</p>
                      </div>
                    ))}
                  </div>
                </>
              </div>
            </div>
          )}
        </div >
      )
      }
    </>
  );
}
