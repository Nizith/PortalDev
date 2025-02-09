import React from "react";

// Field labels mapping
const fieldLabels = {

  supplier: "Supplier",
  customer: "Customer",
  customerContStartDate: "Customer Contract Start Date",
  customerContEndDate: "Customer Contract Start Date",
  supplierContStartDate: "Supplier Contract Start Date",
  supplierContEndDate: "Supplier Contract End Date",
  subjectClerk: "Subject Clerk",
  salesTeam: "Sales Team",
  accountManager: "Account Manager",
  manager: "Manager",
  solutionTeam: "Solution Team",
  salesEngineer: "Sales Engineer",
  solutionEngineer: "Solution Engineer",
  tenderNo: "Tender Number",
  contractStatus: "Contract Status",
  solutionDescription: "Solution Description",
  remarks: "Remarks"
};

// Display Field Component for regular text
const DisplayField = ({ label, value }) => (
  <div className="inline-flex items-center ">
    <label className="block text-sm font-semibold text-gray-700">
      {label}:
    </label>
    <p className="ms-4 text-indigo-600">
      {value || "N/A"}
    </p>
  </div>
);

// AMC Details Display Component
const AMCDetailsDisplay = ({ details }) => (
  <div className="col-span-2 mt-2">
    <label className="block text-lg font-semibold underline">
      AMC Details:
    </label>
    {details.map((detail, index) => (
      <>
        <div key={index} className="grid grid-cols-2 gap-x-4 mt-2 text-sm text-gray-700">
          {/* Left Column - AMC Amount */}
          <div className="col-span-1">
            <span className="mt-4 text-sm font-medium">AMC Amount:</span>
            <div className="ps-3">
              {/* Check if AMCamount is an array, otherwise split it */}
              {(Array.isArray(detail.AMCamount)
                ? detail.AMCamount
                : detail.AMCamount?.split(",")
              ).map((amount, i) => (
                <p key={i} className="mb-1 text-indigo-600">{amount.trim() || "N/A"}</p>
              ))}
            </div>
          </div>

          {/* Right Column - Other Details */}
          <div className="grid grid-cols-1 gap-y-4 items-center">
            <div className="mb-2">
              <span className="text-sm font-medium ">AMC Currency:</span>
              <p className="ms-4 text-indigo-600 inline-flex">{detail.AMCcurrency || "N/A"}</p>
            </div>
            <div className="mb-2">
              <span className="text-sm font-medium ">AMC Term:</span>
              <p className="ms-4 text-indigo-600 inline-flex">{detail.AMCpaymentterms || "N/A"}</p>
            </div>
            <div>
              <span className="text-sm font-medium ">Payment Description:</span>
              <p className="ms-4 text-indigo-600 inline-flex">{detail.paymentDescription || "N/A"}</p>
            </div>
          </div>
        </div>
        { index < details.length - 1 && <hr className="bg-indigo-600 h-[1px] border-none" />}
      </>
    ))}
  </div>
);

const StepFive = ({ formData }) => {
  // Define fields that require special handling
  const specialFields = ["solutionDescription", "AMCDetails"];

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="py-2.5 px-10 bg-gray-200 rounded-2xl w-full">
          <div className="m-2.5">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {/* Regular fields */}
              {Object.entries(formData).map(([key, value]) => {
                if (specialFields.includes(key)) return null;

                return (
                  <DisplayField
                    key={key}
                    label={fieldLabels[key] || key} // Use label from the object, fallback to key
                    value={value}
                  />
                );
              })}

              {/* Solution Description - Full width */}
              <div className="inline-flex ">
                <label className="block text-sm font-semibold text-gray-700">
                  {fieldLabels.solutionDescription}:
                </label>
                <p className="ms-4 text-indigo-600">
                  {formData.solutionDescription || "N/A"}
                </p>
              </div>

              {/* AMC Details */}
              {formData.AMCDetails && Array.isArray(formData.AMCDetails) && (
                <>
                  <AMCDetailsDisplay details={formData.AMCDetails} />
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
