import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    return (
        <div className="text-lg text-center text-fuchsia-700 text-2xl font-semibold">
            <h2>Document Upload Page</h2>
            <form onSubmit={handleUpload}>
                <input
                    type="text"
                    value={tenderNumber}
                    onChange={(e) => setTenderNumber(e.target.value)}
                    placeholder="Tender Number"
                    required
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".doc,.docx,.xls,.xlsx,.pdf,.jpg,.jpeg,.png"
                    required
                />
                <button type="submit">{editId ? 'Update' : 'Upload'}</button>
            </form>

            <table className="table-auto w-full mt-6">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Tender Number</th>
                        <th className="px-4 py-2">Documents</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.length > 0 ? (
                        documents.map((doc) => (
                            <tr key={doc._id}>
                                <td className="border px-4 py-2">{doc.tenderNumber}</td>
                                <td className="border px-4 py-2">
                                    {doc.documents.map((file, index) => (
                                        <div key={index}>
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
                                                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                                                    Download
                                                </button>
                                            </a>
                                        </div>
                                    ))}
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => openEditModal(doc)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    {isModalOpen && selectedDocument && (
                <div className="modal">
                    <h3>Edit Document: {selectedDocument.tenderNumber}</h3>
                    <form onSubmit={handleFileUpload}>
                        <input
                            type="file"
                            onChange={(e) => setNewFile(e.target.files[0])}
                            accept=".doc,.docx,.xls,.xlsx,.pdf,.jpg,.jpeg,.png"
                        />
                        <button type="submit">Upload New File</button>
                    </form>

                    <h4>Current Files</h4>
                    <ul>
                        {selectedDocument.documents.map((file, index) => (
                            <li key={index}>
                                {file.fileType.startsWith('image') ? (
                                    <img
                                        src={`http://localhost:4500/uploads/${file.filePath}`}
                                        alt="File"
                                        className="w-32 h-32 object-cover"
                                    />
                                ) : (
                                    <p>{file.filePath}</p>
                                )}
                                <button onClick={() => handleFileDelete(file._id)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={closeModal}>Close</button>
                </div>
            )}
                                    <button
                                        onClick={() => handleDelete(doc._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>
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
    );
}