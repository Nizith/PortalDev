const express = require('express');
const { upload, uploadFile, getDocuments, updateDocument, deleteDocument, deleteFile, updateFile } = require('../controllers/DocumentController'); // Import updateFile function
const router = express.Router();

// Route for uploading a document
router.post('/portaldev/upload', upload.single('file'), uploadFile);

// Route for retrieving all documents
router.get('/portaldev/documents', getDocuments);

// Route for updating a specific document
router.put('/portaldev/documents/:id', upload.single('file'), updateDocument);

// Route for updating a specific file within a document
router.put('/portaldev/documents/:id/file/:fileId', upload.single('file'), updateFile); // New route for updating a single file

// Route for deleting a specific document
router.delete('/portaldev/documents/:id', deleteDocument);

// Route for deleting a specific file within a document
router.delete('/portaldev/documents/:id/file/:fileId', deleteFile); // Route for deleting a single file

module.exports = router;