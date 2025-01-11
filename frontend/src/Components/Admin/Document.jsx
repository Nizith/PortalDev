import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowForward } from 'react-icons/io';
import { MdDriveFolderUpload } from 'react-icons/md';
import { HiFolderDownload } from "react-icons/hi";
import { RiDeleteBin5Fill, RiFileEditFill } from "react-icons/ri";
import { IoCheckmarkDoneCircle, IoCloseCircle } from "react-icons/io5";
import { GrDocumentConfig } from "react-icons/gr";

export default function Document() {
    const [tenderNumber, setTenderNumber] = useState('');
    const [file, setFile] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [editId, setEditId] = useState(null); // For editing records
    const [newFile, setNewFile] = useState(null); // New file for update
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchDocuments = async () => {
        try {
            const response = await axios.get('http://localhost:4500/documents');
            setDocuments(response.data || []);
        } catch (error) {
            console.error('Error fetching documents:', error);
            setDocuments([]);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('tenderNumber', tenderNumber);

        try {
            if (editId) {
                // Update the document if editId is set
                await axios.put(`http://localhost:4500/documents/${editId}`, formData);
            } else {
                // Upload new document
                await axios.post('http://localhost:4500/upload', formData);
            }
            setEditId(null);
            fetchDocuments(); // Refresh documents list after upload/update
        } catch (error) {
            console.error('Error uploading or updating file:', error);
        }
    };

    const handleEdit = (doc) => {
        // Set fields for editing
        setTenderNumber(doc.tenderNumber);
        setEditId(doc._id);
        openEditModal(doc);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4500/documents/${id}`);
            fetchDocuments(); // Refresh list after delete
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    const openEditModal = (doc) => {
        setSelectedDocument(doc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedDocument(null);
        setIsModalOpen(false);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', newFile);  // newFile will be the uploaded file
        formData.append('tenderNumber', selectedDocument.tenderNumber);

        try {
            await axios.put(`http://localhost:4500/documents/${selectedDocument._id}`, formData);
            fetchDocuments(); // Refresh the list
            closeModal();
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    const handleFileDelete = async (fileId) => {
        try {
            await axios.delete(`http://localhost:4500/documents/${selectedDocument._id}/file/${fileId}`);
            fetchDocuments(); // Refresh the list
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const [tenderNums, settenderNums] = useState([]);
    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const response = await axios.get("http://localhost:4500/portaldev/allcontracts");
                const delay = new Promise((resolve) => setTimeout(resolve, 1000));
                await Promise.all([delay, response]);

                const tenderNumbers = response.data.data.map(contract => contract.tenderNo)
                settenderNums(tenderNumbers)

                console.log("Tender Numbers : ", tenderNumbers)

            } catch (error) {
                console.error("Error fetching contracts:", error);
            }
        }
        fetchContracts();
    }, []);


    return (
        <div className="float-right w-full min-h-screen">

            <h2 className="ms-8 font-semibold text-gray-700 text-lg mt-4 inline-flex items-center">
                <IoIosArrowForward />Documents
            </h2>

            <div className='flex justify-center items-center'>
                <form onSubmit={handleUpload} className='mx-8 bg-sy-400 block w-2/5 mt-3 border-4 p-5 rounded-md'>

                    <select
                        value={tenderNumber}
                        onChange={(e) => setTenderNumber(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Select Tender Number</option>
                        {tenderNums.map((tenderNum, key) => (
                            <option key={key} value={tenderNum}>{tenderNum}</option>
                        ))}
                    </select>
                    <div
                        className="my-2 border-2 border-dashed border-green-600 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer"
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        <p className="font-bold text-lg">Upload The Document Here</p>
                        <MdDriveFolderUpload className='text-indigo-600' size={50} />
                        <input
                            id="fileInput"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".doc,.docx,.xls,.xlsx,.pdf,.jpg,.jpeg,.png"
                        />
                        {file && <p className="text-xl">Selected File: {file.name}</p>}
                    </div>

                    <button className="w-full bg-green-800 hover:ring-2 ring-green-500 text-green-200 duration-200 px-8 py-2 rounded-lg font-semibold" type="submit">
                        {editId ? 'Update' : 'Upload'}
                    </button>

                </form>
            </div>



            <div className="mx-8 my-5">
                <table className="min-w-full border border-collapse table-auto bg-gradient-to-r from-white via-gray-100 to-white rounded-xl overflow-hidden shadow-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-slate-900 to-indigo-600 text-white text-sm tracking-wide">
                            <th className="px-4 py-3 font-bold uppercase border">Tender Number</th>
                            <th className="px-4 py-3 font-bold uppercase border">Documents</th>
                            <th className="px-4 py-3 font-bold uppercase border">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gradient-to-r">
                        {documents.length > 0 ? (
                            documents.map((doc) => (
                                <tr key={doc._id}>
                                    <td className="border px-4 py-2">{doc.tenderNumber}</td>
                                    <td className="border px-4 py-2">
                                        {doc.documents.map((file, index) => (
                                            <div key={index} className=' flex justify-between items-center'>
                                                {file.fileType && file.fileType.startsWith('image') ? (
                                                    <img
                                                        src={`http://localhost:4500/uploads/${file.filePath}`}
                                                        alt={file.fileType}
                                                        className="w-32 h-32 object-cover"
                                                    />
                                                ) : (
                                                    <p>{file.filePath}</p>
                                                )}
                                                <a
                                                    href={`http://localhost:4500/uploads/${file.filePath}`}
                                                    download
                                                >
                                                    <button className="text-indigo-600 mt-1 text-5xl rounded">
                                                        <HiFolderDownload />
                                                    </button>
                                                </a>
                                            </div>
                                        ))}
                                    </td>
                                    <td className={`border py-2 px-4 ${isModalOpen && "w-[5in]"}`}>
                                        {isModalOpen && selectedDocument && selectedDocument._id === doc._id ? (
                                            <div className="modal w-[5in]">
                                                <form onSubmit={handleFileUpload} className='w-full inline-flex justify-between'>
                                                    <label
                                                        className="w-[4in] bg-green-800 hover:ring-2 ring-green-500 duration-200 text-green-200 text-center px-2 py-1.5 rounded-md cursor-pointer"
                                                        onClick={() => document.getElementById('editfile').click()}
                                                    >Select File
                                                    </label>
                                                    <input
                                                        id='editfile'
                                                        type="file"
                                                        className='hidden'
                                                        onChange={(e) => setNewFile(e.target.files[0])}
                                                        accept=".doc,.docx,.xls,.xlsx,.pdf,.jpg,.jpeg,.png"
                                                    />
                                                    <button type="submit" className='text-indigo-600'><IoCheckmarkDoneCircle size={35} /></button>
                                                    <button onClick={closeModal} className='text-yellow-600'><IoCloseCircle size={35} /></button>
                                                </form>

                                                <div className='flex-1 my-2'>
                                                    <h4 className='font-bold'>Current Files</h4>
                                                    <ul>
                                                        {selectedDocument.documents.map((file, index) => (
                                                            <>
                                                                <li key={index} className='inline-flex justify-between w-full'>
                                                                    {file.fileType.startsWith('image') ? (
                                                                        <img
                                                                            src={`http://localhost:4500/uploads/${file.filePath}`}
                                                                            alt="File"
                                                                            className="w-32 h-32 object-cover"
                                                                        />
                                                                    ) : (
                                                                        <p>{file.filePath}</p>
                                                                    )}
                                                                    <button
                                                                        className='text-red-600 text-xl'
                                                                        onClick={() => handleFileDelete(file._id)}>
                                                                        <RiDeleteBin5Fill />
                                                                    </button>
                                                                </li>
                                                                <hr className='my-2 ' />
                                                            </>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='flex justify-center space-x-8'>
                                                <button
                                                    onClick={() => handleEdit(doc)}
                                                    className="text-yellow-500 text-4xl"
                                                >
                                                    <GrDocumentConfig />
                                                </button>
                                            </div>
                                        )}

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No documents available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
