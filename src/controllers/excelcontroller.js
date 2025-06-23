const excelService = require('../Service/excelservice');

const uploadExcel = (req, res) => {
  try {
    const filePath = req.file.path;
    const result = excelService.processUploadedFile(filePath);
    res.status(200).json({ status: 'success', data: result.data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const downloadExcel = (req, res) => {
  const filePath = 'data/output.xlsx';
  res.download(filePath);
};
const writeExcel = async (req, res) => {
  try {
    const outputPath = await excelService.writeUsersToExcel();
    res.status(200).json({ message: 'Excel written successfully', file: outputPath });
  } catch (error) {
    res.status(500).json({ message: 'Failed to write Excel', error: error.message });
  }
};

module.exports = { uploadExcel, downloadExcel,writeExcel };
