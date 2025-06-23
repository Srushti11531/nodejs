// const fs = require('fs');
// const path = require('path');
// const PdfGenerator = require('../utils/PdfGenerator');
// const User = require('../models/user'); //  Adjust path if needed

// const filePath = path.join(__dirname, '../../files/sample.pdf');

// exports.generatePdf = async () => {
//     try {
//       const users = await User.findAll(); // Fetch data from DB
  
//       const doc = PdfGenerator.createPdfFromUserData(users);
//       const stream = fs.createWriteStream(filePath);
  
//       return new Promise((resolve, reject) => {
//         doc.pipe(stream);
//         stream.on('finish', () => resolve(filePath));
//         stream.on('error', (err) => reject(err));
//       });
//     } catch (err) {
//       throw err;
//     }
//   };
  
// exports.readPdf = () => {
//   return new Promise((resolve, reject) => {
//     if (!fs.existsSync(filePath)) {
//       return reject(new Error('PDF file does not exist'));
//     }

//     const stream = fs.createReadStream(filePath);
//     resolve(stream);
//   });
// };
const fs = require('fs').promises;

exports.processPDF = async (filePath) => {
  const data = await fs.readFile(filePath);      // Buffer
  const byteArray = Array.from(data);            // Convert to array if needed
  console.log('Byte array preview:', byteArray.slice(0, 20)); // Optional

  // You can pass this data to Poppler, pdfjs-dist, etc.
  return byteArray;
};
