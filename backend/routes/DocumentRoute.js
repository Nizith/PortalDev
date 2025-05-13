const router = require("express").Router();
const {
    upload,
    uploadFile,
    getDocuments,
    updateDocument,
    deleteDocument,
    deleteFile,
    updateFile
} = require('../controllers/DocumentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route for uploading a document - accessible by all roles
router.post('/upload', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), upload.single('file'), uploadFile);

// Route for retrieving all documents - accessible by all roles
router.get('/documents', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), getDocuments);

// Route for updating a specific document - accessible by Admin and MsStaff
router.put('/documents/:id', protect, authorize('Admin', 'MsStaff'), upload.single('file'), updateDocument);

// Route for updating a specific file within a document - accessible by Admin and MsStaff
router.put('/documents/:id/file/:fileId', protect, authorize('Admin', 'MsStaff'), upload.single('file'), updateFile);

// Route for deleting a specific document - accessible only by Admin
router.delete('/documents/:id', protect, authorize('Admin'), deleteDocument);

// Route for deleting a specific file within a document - accessible only by Admin
router.delete('/documents/:id/file/:fileId', protect, authorize('Admin'), deleteFile);

module.exports = router;