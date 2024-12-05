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

const getDocuments = async (req, res) => {
    const documents = await Document.find();
    res.json(documents);
};

const deleteDocument = async (req, res) => {
    const { id } = req.params;
    await Document.findByIdAndDelete(id);
    res.send('Document deleted successfully');
};

module.exports = {
    upload,
    uploadFile,
    getDocuments,
    deleteDocument,
};
