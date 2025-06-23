// const pdfService = require('../Service/pdfservice'); 
// const path = require('path');
// const { readPdfToArray } = require('../utils/PdfGenerator');


// exports.generatePdf = async (req, res) => {
//     try {
//       const filePath = await pdfService.generatePdf();
//       res.download(filePath); // triggers file download
//     } catch (err) {
//       res.status(500).json({ message: 'Failed to generate PDF', error: err.message });
//     }
//   };
  

// exports.readPdf = async (req, res) => {
//   try {
//     const stream = await pdfService.readPdf();
//     stream.pipe(res); // send as stream
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to read PDF', error: err.message });
//   }
// }; 
// exports.readPdf = async (req, res) => {
//   try {
//     const filePath = path.join(__dirname, '../sample.pdf'); // Adjust if needed
//     const data = await readPdfToArray(filePath);
//     res.json({ status: 'success', data });
//   } catch (err) {
//     console.error('PDF read error:', err);
//     res.status(500).json({ status: 'error', message: err.message });
//   }
// };
// exports.uploadPDF = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }
//   }
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const parseUserLine = (line) => {
  const idMatch = line.match(/^(\d+)/);
  const id = idMatch ? idMatch[1] : null;
  let rest = id ? line.slice(id.length) : line;
  
const nameMatch = rest.match(/[a-zA-Z .'-]+/);
  const name = nameMatch ? nameMatch[0] : null;
  if (name) rest = rest.replace(name, '');

  const emailMatch = rest.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  const email = emailMatch ? emailMatch[1] : null;
  if (email) rest = rest.replace(email, '');

  const genderMatch = rest.match(/(FEMALE|MALE)/i);
  const gender = genderMatch ? genderMatch[0].toUpperCase() : null;
  if (gender) rest = rest.replace(gender, '');

  const dateRegex = /\d{4}-\d{2}-\d{2}/g;
  const dates = rest.match(dateRegex) || [];
  const createdAt = dates[0] || null;
  const updatedAt = dates[1] || null;
  dates.forEach(date => rest = rest.replace(date, ''));

  const menuIds = rest.split(',').map(s => s.trim()).filter(Boolean);

 // const name = rest.replace(menuIds.join(','), '').trim() || '-';

  return { id, name, email, gender, createdAt, updatedAt, menuIds };
};

exports.uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = path.resolve(req.file.path);
    const dataBuffer = fs.readFileSync(filePath);

    const data = await pdfParse(dataBuffer);

    // Extract lines, skipping headers and empty lines
    const lines = data.text.split('\n').map(line => line.trim()).filter(Boolean);

    // Skip header lines: assuming first 2 lines are header
    const dataLines = lines.slice(2);

    const parsedUsers = dataLines.map(parseUserLine);

    res.status(200).json({
      message: 'PDF parsed successfully',
      users: parsedUsers
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read PDF' });
  }
};
