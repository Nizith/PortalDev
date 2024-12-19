const express = require('express');
const { upload, uploadFile, getDocuments, updateDocument, deleteDocument, deleteFile } = require('../controllers/DocumentController'); // Import deleteFile function
const router = express.Router();

// Route for uploading a document
router.post('/upload', upload.single('file'), uploadFile);

// Route for retrieving all documents
router.get('/documents', getDocuments);

// Route for updating a specific document
router.put('/documents/:id', upload.single('file'), updateDocument);

// Route for deleting a specific document
router.delete('/documents/:id', deleteDocument);

// Route for deleting a specific file within a document
router.delete('/documents/:id/file/:fileId', deleteFile); // New route for deleting a single file

module.exports = router;
