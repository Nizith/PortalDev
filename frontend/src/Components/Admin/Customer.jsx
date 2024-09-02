import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialInputFields = {
    BRnumber: '',
    name: '',
    email: '',
    contact: ''
};

export default function DataTable() {
    const [inputFields, setInputFields] = useState(initialInputFields);
    const [tableData, setTableData] = useState([]);
    const [createdata,setcreatedata] = useState([]);

    const handleChange = (e) => {
        setInputFields({
            ...inputFields,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new entry object from inputFields
        const newEntry = {
            BRnumber: inputFields.BRnumber,
            name: inputFields.name,
            email: inputFields.email,
            contact: inputFields.contact
        };
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
            const response = await axios.get("http://localhost:4500/portaldev/readcustomer");
            console.log(response);
            setcreatedata(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const postData = async (newEntry) => {
        try {
            const res = await axios.post(
                "http://localhost:4500/portaldev/createcustomer",
                newEntry
            );
            console.log(res.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <table className="table-auto bg-gray-100 w-full max-w-4xl border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 border border-gray-300">BR number</th>
                        <th className="px-4 py-2 border border-gray-300">Name</th>
                        <th className="px-4 py-2 border border-gray-300">Email</th>
                        <th className="px-4 py-2 border border-gray-300">Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(createdata.data) && createdata.length !== 0 ? (
                        createdata.data.map((data, index) => (
                            <tr key={index} className="bg-white">
                                <td className="px-4 py-2 border border-gray-300">{data.BRnumber}</td>
                                <td className="px-4 py-2 border border-gray-300">{data.name}</td>
                                <td className="px-4 py-2 border border-gray-300">{data.email}</td>
                                <td className="px-4 py-2 border border-gray-300">{data.contact}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="px-4 py-2 border border-gray-300 text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                    <tr className="bg-white">
                        <td className="px-4 py-2 border border-gray-300">
                            <input
                                className="w-full h-full px-2 py-1 outline-none"
                                type="text"
                                name="BRnumber"
                                placeholder="BR number"
                                value={inputFields.BRnumber}
                                onChange={handleChange}
                            />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                            <input
                                className="w-full h-full px-2 py-1 outline-none"
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={inputFields.name}
                                onChange={handleChange}
                            />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                            <input
                                className="w-full h-full px-2 py-1 outline-none"
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={inputFields.email}
                                onChange={handleChange}
                            />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                            <input
                                className="w-full h-full px-2 py-1 outline-none"
                                type="text"
                                name="contact"
                                placeholder="Contact"
                                value={inputFields.contact}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4" className="px-4 py-2">
                            <button type="submit"
                                onClick={handleSubmit}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                            >
                                ADD
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
