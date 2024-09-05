import React, { useState, useEffect } from "react";
import axios from 'axios';

const initialInputFields = {
  SalesCategory: "",
  SolutionCategory: "",
  AccountManager: "",
  Manager: "",
  SalesEngineer: "",
  SolutionEngineer: ""
};

export default function CordinatorTable() {
  const [inputFields, setInputFields] = useState(initialInputFields);
  const [tableData, setTableData] = useState([]);
  const [createdata, setCreatedata] = useState([]);

  const handleChange = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = { ...inputFields };

    try {
      // Update tableData state with the new entry
      setTableData([...tableData, newEntry]);

      // Post data to the server
      await postData(newEntry);

      // Clear inputFields state after submission
      setInputFields(initialInputFields);
    } catch (error) {
      console.error("Error submitting the form: ", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4500/portaldev/allcordinator");
      console.log(response);
      setCreatedata(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const postData = async (newEntry) => {
    try {
      const res = await axios.post("http://localhost:4500/portaldev/createCordinator", newEntry);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2 className="flex justify-center text-white my-6">Cordinator Table</h2>
      <div className="p-4 bg-blue-50 mx-8 my-10">
        <table className="w-full border-collapse bg-white shadow-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 border border-blue-600">SalesCategory</th>
              <th className="px-4 py-2 border border-blue-600">SolutionCategory</th>
              <th className="px-4 py-2 border border-blue-600">AccountManager</th>
              <th className="px-4 py-2 border border-blue-600">Manager</th>
              <th className="px-4 py-2 border border-blue-600">SalesEngineer</th>
              <th className="px-4 py-2 border border-blue-600">SolutionEngineer</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(createdata.data) && createdata.data.length !== 0 ? (
              createdata.data.map((data, index) => (
                <tr key={index} className="bg-white even:bg-blue-100">
                  <td className="px-4 py-2 border border-gray-300">{data.SalesCategory}</td>
                  <td className="px-4 py-2 border border-gray-300">{data.SolutionCategory}</td>
                  <td className="px-4 py-2 border border-gray-300">{data.AccountManager}</td>
                  <td className="px-4 py-2 border border-gray-300">{data.Manager}</td>
                  <td className="px-4 py-2 border border-gray-300">{data.SalesEngineer}</td>
                  <td className="px-4 py-2 border border-gray-300">{data.SolutionEngineer}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center border border-gray-300 text-gray-500">
                  No data available
                </td>
              </tr>
            )}
            <tr>
              <td className="px-4 py-2">
                <input
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  name="SalesCategory"
                  placeholder="Sales Category"
                  value={inputFields.SalesCategory}
                  onChange={handleChange}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  name="SolutionCategory"
                  placeholder="Solution Category"
                  value={inputFields.SolutionCategory}
                  onChange={handleChange}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  name="AccountManager"
                  placeholder="Account Manager"
                  value={inputFields.AccountManager}
                  onChange={handleChange}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  name="Manager"
                  placeholder="Manager"
                  value={inputFields.Manager}
                  onChange={handleChange}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  name="SalesEngineer"
                  placeholder="Sales Engineer"
                  value={inputFields.SalesEngineer}
                  onChange={handleChange}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  name="SolutionEngineer"
                  placeholder="Solution Engineer"
                  value={inputFields.SolutionEngineer}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center">
                <button
                  className="px-4 py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="submit"
                  onClick={handleSubmit}
                >
                  ADD
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}