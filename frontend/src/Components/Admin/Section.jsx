import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialInputFields = {
    sectionID: '',
    sectionName: '',
};

export default function DataTable() {
    const [inputFields, setInputFields] = useState(initialInputFields);
    const [createdata, setCreatedata] = useState([]);
    const [tableData, setTableData] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({
            ...inputFields,
            [name]: value,
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
            const response = await axios.get("http://localhost:4500/portaldev/readsection");
            console.log("Fetch data response:", response.data);
            setCreatedata(response.data);
        } catch (error) {
            console.error("Fetch error:", error.message);
        }
    };

    const postData = async (newEntry) => {
        try {
            const res = await axios.post("http://localhost:4500/portaldev/createSection", newEntry);
            console.log("Post data response:", res.data);
        } catch (error) {
            console.error("Post error:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <form onSubmit={handleSubmit}>
                <table className="w-full max-w-4xl bg-gray-100 border border-collapse border-gray-300 table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-300">Section ID</th>
                            <th className="px-4 py-2 border border-gray-300">Section Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(createdata.data) && createdata.length !==0 ? (
                            createdata.data.map((data, index) => (
                                <tr key={index} className="bg-white">
                                    <td className="px-4 py-2 border border-gray-300">{data.sectionID}</td>
                                    <td className="px-4 py-2 border border-gray-300">{data.sectionName}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="px-4 py-2 text-center border border-gray-300">
                                    No data available
                                </td>
                            </tr>
                        )}
                        <tr className="bg-white">
                            <td className="px-4 py-2 border border-gray-300">
                                <input
                                    className="w-full h-full px-2 py-1 outline-none"
                                    type="text"
                                    name="sectionID"
                                    placeholder="Section ID"
                                    value={inputFields.sectionID}
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                <input
                                    className="w-full h-full px-2 py-1 outline-none"
                                    type="text"
                                    name="sectionName"
                                    placeholder="Section Name"
                                    value={inputFields.sectionName}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="px-4 py-2">
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                                >
                                    ADD
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
