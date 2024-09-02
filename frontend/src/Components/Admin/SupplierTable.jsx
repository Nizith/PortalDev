import React, { useState, useEffect } from "react";
import axios from "axios";

const initialInputFields = {
  SRno: "",
  name: "",
  category: "",
  mobile: "",
  description: "",
};

export default function DataTable() {
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
      const response = await axios.get("http://localhost:4500/portaldev/readsupplier");
      console.log(response);
      setCreatedata(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const postData = async (newEntry) => {
    try {
      const res = await axios.post("http://localhost:4500/portaldev/createsupplier", newEntry);
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

    <h2 className=" flex  justify-center text-white my-6">Supplier Table</h2>
        <div className="p-4 bg-blue-50 mx-8 my-10 ">
      <table className="w-full border-collapse bg-white shadow-lg">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2 border border-blue-600">SR number</th>
            <th className="px-4 py-2 border border-blue-600">Name</th>
            <th className="px-4 py-2 border border-blue-600">Category</th>
            <th className="px-4 py-2 border border-blue-600">Mobile</th>
            <th className="px-4 py-2 border border-blue-600">Description</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(createdata.data) && createdata.length !==0 ? (
            createdata.data.map((data, index) => (
              <tr key={index} className="bg-white even:bg-blue-100">
                <td className="px-4 py-2 border border-gray-300">{data.SRno}</td>
                <td className="px-4 py-2 border border-gray-300">{data.name}</td>
                <td className="px-4 py-2 border border-gray-300">{data.category}</td>
                <td className="px-4 py-2 border border-gray-300">{data.mobile}</td>
                <td className="px-4 py-2 border border-gray-300">{data.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center border border-gray-300 text-gray-500">
                No data available
              </td>
            </tr>
          )}
          <tr>
            <td className="px-4 py-2">
              <input
                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                name="SRno"
                placeholder="SR number"
                value={inputFields.SRno}
                onChange={handleChange}
              />
            </td>
            <td className="px-4 py-2">
              <input
                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                name="name"
                placeholder="Supplier name"
                value={inputFields.name}
                onChange={handleChange}
              />
            </td>
            <td className="px-4 py-2">
              <input
                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                name="category"
                placeholder="Category"
                value={inputFields.category}
                onChange={handleChange}
              />
            </td>
            <td className="px-4 py-2">
              <input
                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                name="mobile"
                placeholder="Contact number"
                value={inputFields.mobile}
                onChange={handleChange}
              />
            </td>
            <td className="px-4 py-2">
              <input
                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                name="description"
                placeholder="Description"
                value={inputFields.description}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="5" className="px-4 py-2 text-center">
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
