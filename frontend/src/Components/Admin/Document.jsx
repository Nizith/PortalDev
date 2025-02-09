import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowForward } from 'react-icons/io';
import { MdDriveFolderUpload } from 'react-icons/md';
import { HiFolderDownload } from "react-icons/hi";
import { RiDeleteBin5Fill, RiFileEditFill } from "react-icons/ri";
import LoadingAnimation from "../Login/LoadingAnimation";
import { api } from '../../api';

export default function Document() {
    const [tenderNumber, setTenderNumber] = useState('');
    const [file, setFile] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [editId, setEditId] = useState(null);
    const [newFile, setNewFile] = useState(null);
    const [selectedFileId, setSelectedFileId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [tenderNums, setTenderNums] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDocuments = async () => {
        try {
            const response = await axios.get(`${api}/documents`);

            const delay = new Promise((resolve) => setTimeout(resolve, 1000));
            await Promise.all([delay, response]);

            setDocuments(response.data || []);
        } catch (error) {
            console.error('Error fetching documents:', error);
            setDocuments([]);
        } finally {
            setLoading(false);
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
                await axios.put(`${api}/documents/${editId}`, formData);
            } else {
                await axios.post(`${api}/upload`, formData);
            }
            setEditId(null);
            fetchDocuments();
        } catch (error) {
            console.error('Error uploading or updating file:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${api}/documents/${id}`);
            fetchDocuments();
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    const handleFileEdit = (docId, fileId) => {
        setEditId(docId);
        setSelectedFileId(fileId);
        setIsEditModalOpen(true);
    };

    const handleFileDelete = async (docId, fileId) => {
        try {
            if (documents.find(doc => doc._id === docId).documents.length === 1) {
                await handleDelete(docId);
            } else {
                await axios.delete(`${api}/documents/${docId}/file/${fileId}`);
                fetchDocuments();
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', newFile);

        try {
            const url = `${api}/documents/${editId}/file/${selectedFileId}`;
            await axios.put(url, formData);
            fetchDocuments();
            setIsEditModalOpen(false);
            setEditId(null);
            setSelectedFileId(null);
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const response = await axios.get(`${api}/allcontracts`);
                const delay = new Promise((resolve) => setTimeout(resolve, 1000));
                await Promise.all([delay, response]);
                const tenderNumbers = response.data.data.map(contract => contract.tenderNo);
                setTenderNums(tenderNumbers);
            } catch (error) {
                console.error("Error fetching contracts:", error);
            }
        }
        fetchContracts();
    }, []);

    return (
        <>
            {loading ? (
                <>
                    <LoadingAnimation />
                </>
            ) : (
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
                                    <th className="px-4 py-3 font-bold uppercase border">Files</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gradient-to-r">
                                {documents.length > 0 ? (
                                    documents.map((doc) => (
                                        <tr key={doc._id}>
                                            <td className="border px-4 py-2">{doc.tenderNumber}</td>
                                            <td className="border px-4 py-2">
                                                <div className="space-y-5">
                                                    {doc.documents.map((file, index) => (
                                                        <>
                                                            <div key={index} className="flex items-center justify-between rounded">
                                                                <div className="flex-1">
                                                                    {file.fileType.startsWith('image') ? (
                                                                        <img
                                                                            src={`${api}/uploads/${file.filePath}`}
                                                                            alt="File"
                                                                            className="w-32 h-32 object-cover"
                                                                        />
                                                                    ) : (
                                                                        <span className="text-gray-700">{file.filePath}</span>
                                                                    )}
                                                                </div>
                                                                <div className="flex space-x-4">
                                                                    <a
                                                                        href={`${api}/uploads/${file.filePath}`}
                                                                        download
                                                                        className="text-green-600 hover:text-green-800"
                                                                    >
                                                                        <HiFolderDownload size={35} />
                                                                    </a>
                                                                    <button
                                                                        onClick={() => handleFileEdit(doc._id, file._id)}
                                                                        className="text-yellow-500 hover:text-yellow-700"
                                                                    >
                                                                        <RiFileEditFill size={25} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleFileDelete(doc._id, file._id)}
                                                                        className="text-red-500 hover:text-red-700"
                                                                    >
                                                                        <RiDeleteBin5Fill size={25} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="text-center py-4">
                                            No documents available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {isEditModalOpen && (
                        <div className="modal-container fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setIsEditModalOpen(false)}>
                            <div className="modal-content bg-white p-4 rounded-lg w-[6in]" onClick={(e) => e.stopPropagation()}>
                                <form onSubmit={handleFileUpload} className='mx-8 bg-sy-400 block my-3 border-4 p-5 rounded-md'>
                                    <div
                                        className="my-2 border-2 border-dashed border-green-600 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer"
                                        onClick={() => document.getElementById('editfile').click()}
                                    >
                                        <p className="font-bold text-lg">Upload The New Document Here</p>
                                        <MdDriveFolderUpload className='text-indigo-600' size={50} />
                                        <input
                                            id='editfile'
                                            type="file"
                                            className='hidden'
                                            onChange={(e) => setNewFile(e.target.files[0])}
                                            accept=".doc,.docx,.xls,.xlsx,.pdf,.jpg,.jpeg,.png"
                                        />
                                    </div>
                                    <button type="submit" className="w-full bg-green-800 hover:ring-2 ring-green-500 text-green-200 duration-200 px-8 py-2 rounded-lg font-semibold">
                                        Submit the updated file
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}