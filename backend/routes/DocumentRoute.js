const express = require('express');
const { upload, uploadFile, getDocuments, deleteDocument } = require('../controllers/DocumentController');
const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/documents', getDocuments);
router.delete('/documents/:id', deleteDocument);

module.exports = router;
