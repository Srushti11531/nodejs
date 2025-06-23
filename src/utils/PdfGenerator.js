const PDFDocument = require('pdfkit');
const moment = require('moment');

// Create a PDF from user data (array of objects)
exports.createPdfFromUserData = (userData) => {
  const doc = new PDFDocument({ margin: 30, size: 'A3', layout: 'landscape' });

  doc.fontSize(16).text('User Table Report', { align: 'center' });
  doc.moveDown(1);

  if (!Array.isArray(userData) || userData.length === 0) {
    doc.text('No user data available.');
    doc.end();
    return doc;
  }

  const headers = Object.keys(userData[0]); // Dynamic headers
  const startX = 50;
  const rowHeight = 20;
  const colSpacing = 100; // space between columns

  // Create dynamic X positions based on column index
  const positions = {};
  headers.forEach((header, i) => {
    positions[header] = startX + i * colSpacing;
  });

  let currentY = doc.y;

  // Draw header row
  doc.fontSize(10).font('Helvetica-Bold');
  headers.forEach(header => {
    doc.text(header, positions[header], currentY);
  });

  currentY += 10;
  doc.moveTo(30, currentY).lineTo(1500, currentY).stroke();

  // Draw user data rows
  doc.font('Helvetica').fontSize(10);
  currentY += 5;

  userData.forEach((user) => {
    headers.forEach((key) => {
      let value = user[key];

      // Format createdAt/updatedAt if possible
      if (typeof value === 'string' && (key.toLowerCase().includes('createdat') || key.toLowerCase().includes('updatedat'))) {
        const date = moment(value);
        value = date.isValid() ? date.format('YYYY-MM-DD') : '-';
      }

      // If array (like menuIds), join them
      if (Array.isArray(value)) {
        value = value.join(', ');
      }

      doc.text(value?.toString() || '-', positions[key], currentY);
    });

    currentY += rowHeight;
  });

  doc.end();
  return doc;
};
