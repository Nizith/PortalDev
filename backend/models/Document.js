const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    tenderNumber: { type: String, required: true },
    documents: [
        {
            filePath: { type: String, required: true },
            fileType: { type: String, required: true },
        }
    ],
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
