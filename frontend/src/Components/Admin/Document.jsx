import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Document() {
    const [tenderNumber, setTenderNumber] = useState('');
    const [file, setFile] = useState(null);
    const [documents, setDocuments] = useState([]);

    const fetchDocuments = async () => {
        try {
            const response = await axios.get('http://localhost:4500/documents');
            console.log('Fetched documents:', response.data);
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
            await axios.post('http://localhost:4500/upload', formData);
            fetchDocuments(); // Refresh the documents list after upload
        } catch (error) {
            console.error('Error uploading file:', error);
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
                <button type="submit">Upload</button>
            </form>

            <table className="table-auto w-full mt-6">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Tender Number</th>
                        <th className="px-4 py-2">Documents</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.length > 0 ? (
                        documents.map((doc) => (
                            <tr key={doc._id}>
                                <td className="border px-4 py-2">{doc.tenderNumber}</td>
                                <td className="border px-4 py-2">
                                    {doc.fileType.startsWith('image') ? (
                                        <img
                                            src={`http://localhost:4500/uploads/${doc.filePath}`}
                                            alt={doc.fileType}
                                            className="w-32 h-32 object-cover"
                                        />
                                    ) : (
                                        <p>{doc.filePath}</p>
                                    )}
                                    <a
                                        href={`http://localhost:4500/uploads/${doc.filePath}`}
                                        download
                                    >
                                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                                            Download
                                        </button>
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="text-center">
                                No documents available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
