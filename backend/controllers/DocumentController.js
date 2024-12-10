const Document = require('../models/Document');
const multer = require('multer');
const path = require('path');

// Ensure upload directory exists
const uploadDirectory = path.join(__dirname, '..', 'uploads');
const fs = require('fs');

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Set up Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Upload a new file
const uploadFile = async (req, res) => {
    const { tenderNumber } = req.body;
    const relativeFilePath = path.relative(uploadDirectory, req.file.path); // Get relative path

    const existingDoc = await Document.findOne({ tenderNumber });
    if (existingDoc) {
        existingDoc.documents.push({
            filePath: relativeFilePath,
            fileType: req.file.mimetype,
        });
        await existingDoc.save();
    } else {
        const document = new Document({
            tenderNumber,
            documents: [
                {
                    filePath: relativeFilePath,
                    fileType: req.file.mimetype,
                }
            ],
        });
        await document.save();
    }
    res.send('File uploaded successfully');
};

// Get all documents
const getDocuments = async (req, res) => {
    const documents = await Document.find();
    res.json(documents);
};

// Update an existing document
const updateDocument = async (req, res) => {
    const { id } = req.params;
    const { tenderNumber } = req.body;
    const relativeFilePath = req.file ? path.relative(uploadDirectory, req.file.path) : null;

    try {
        const document = await Document.findById(id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Update tenderNumber and file if provided
        document.tenderNumber = tenderNumber || document.tenderNumber;
        if (relativeFilePath) {
            document.documents = [
                {
                    filePath: relativeFilePath,
                    fileType: req.file.mimetype,
                },
            ];
        }

        await document.save();
        res.status(200).json({ message: 'Document updated successfully' });
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ message: 'Error updating document' });
    }
};

// Delete a document
const deleteDocument = async (req, res) => {
    const { id } = req.params;
    try {
        const document = await Document.findByIdAndDelete(id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ message: 'Error deleting document' });
    }
};

module.exports = {
    upload,
    uploadFile,
    getDocuments,
    updateDocument, // Added the update function
    deleteDocument,
};
