const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const excelController = require('../controllers/excelcontroller');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), excelController.uploadExcel);
router.get('/download', excelController.downloadExcel);
router.post('/write', excelController.writeExcel); 

module.exports = router;
