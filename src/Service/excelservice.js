const excelHelper = require('../utils/excelhelper');
const path = require('path');
const fs = require('fs');
const ExcelRepository = require('../repository/ExcelRepository');

const ExcelService = {
  async processUploadedFile(filePath) {
    const data = await excelHelper.readExcel(filePath);

    // Optional: Add a timestamp field
    const updatedData = data.map(item => ({
      ...item,
      processedAt: new Date().toISOString()
    }));

    const outputPath = path.join(__dirname, '../../data/output.xlsx');
    await excelHelper.writeExcel(updatedData, outputPath);
    return { data: updatedData, outputPath };
  },

  async writeUsersToExcel() {
    const users = await ExcelRepository.getAllUsers();

    const data = users.map(user => ({
      ID: user.id,
      Name: user.name,
      Email: user.email,
      Gender: user.gender,
      CreatedAt: user.createdAt,
      UpdatedAt: user.updatedAt,
    }));

    const outputPath = path.join(__dirname, '../../data/output.xlsx');

    // Ensure file is not busy
    if (fs.existsSync(outputPath)) {
      try {
        fs.unlinkSync(outputPath);
      } catch (err) {
        throw new Error('File is in use. Please close it and try again.');
      }
    }

    await excelHelper.writeExcel(data, outputPath);
    return outputPath;
  }
};

module.exports = ExcelService;
