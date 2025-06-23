// const express = require('express');
// const router = express.Router();
// const pdfController = require('../controllers/pdfcontroller');

// router.get('/generate', pdfController.generatePdf);
// router.get('/read', pdfController.readPdf);
// router.get('/read-pdf',pdfController.readPdf);


// module.exports = router;
const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfcontroller');
const upload = require('../middleware/multer'); // your multer config
router.post('/upload', upload.single('file'), pdfController.uploadPDF);

module.exports = router;