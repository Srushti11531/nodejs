// const ExcelJS = require('exceljs');

// exports.readExcel = async (filePath) => {
//   const workbook = new ExcelJS.Workbook();
//   await workbook.xlsx.readFile(filePath);
//   const worksheet = workbook.worksheets[0];

//   const rows = [];
//   worksheet.eachRow((row, rowNumber) => {
//     if (rowNumber === 1) return; // skip header

//     const rowData = {};
//     row.eachCell((cell, colNumber) => {
//       const header = worksheet.getRow(1).getCell(colNumber).value;
//       rowData[header] = cell.value;
//     });
//     rows.push(rowData);
//   });

//   return rows;
// };

// exports.writeExcel = async (data, outputPath) => {
//   const workbook = new ExcelJS.Workbook();
//   const worksheet = workbook.addWorksheet('Sheet1');

//   // Set header row
//   const headers = Object.keys(data[0] || {});
//   worksheet.addRow(headers);

//   // Set bold header style
//   const headerRow = worksheet.getRow(1);
//   headerRow.eachCell(cell => {
//     cell.font = { bold: true };
//     cell.fill = {
//       type: 'pattern',
//       pattern: 'solid',
//       fgColor: { argb: 'D9D9D9' } // Light gray background for header
//     };
//   });

//   // Add data rows with alternating row colors
//   data.forEach((item, index) => {
//     const row = worksheet.addRow(Object.values(item));
//     const isEven = index % 2 === 0;
//     row.eachCell(cell => {
//       cell.fill = {
//         type: 'pattern',
//         pattern: 'solid',
//         fgColor: { argb: isEven ? 'FFFFFF' : 'F2F2F2' } // white or light gray
//       };
//     });
//   });

//   // Auto-size columns
//   worksheet.columns.forEach(col => {
//     let maxLength = 10;
//     col.eachCell({ includeEmpty: true }, cell => {
//       const value = cell.value ? cell.value.toString() : '';
//       maxLength = Math.max(maxLength, value.length);
//     });
//     col.width = maxLength + 2;
//   });

//   await workbook.xlsx.writeFile(outputPath);
// };

// const ExcelJS = require('exceljs');

// exports.writeExcel = async (data, outputPath) => {
//   if (!Array.isArray(data) || data.length === 0) {
//     throw new Error('Data must be a non-empty array of objects');
//   }

//   const workbook = new ExcelJS.Workbook();
//   const worksheet = workbook.addWorksheet('Sheet1');

//   // Filter out 'id' from headers
//   const headers = Object.keys(data[0] || {}).filter(h => h.toLowerCase() !== 'id');

//   // Add serial number header as the first column
//   worksheet.addRow(['S.No', ...headers]);

//   const borderStyle = {
//     top: { style: 'thin' },
//     left: { style: 'thin' },
//     bottom: { style: 'thin' },
//     right: { style: 'thin' }
//   };

//   // Style header row
//   const headerRow = worksheet.getRow(1);
//   headerRow.eachCell(cell => {
//     cell.font = { bold: true };
//     cell.fill = {
//       type: 'pattern',
//       pattern: 'solid',
//       fgColor: { argb: 'FFD9D9D9' } // Light gray
//     };
//     cell.border = borderStyle;
//     cell.alignment = { vertical: 'middle', horizontal: 'center' };
//   });

//   // Add data rows with serial numbers and filtered data
//   data.forEach((item, index) => {
//     // Map data values excluding 'id'
//    const rowData = headers.map(h => {
//   const value = item[h];

//   if (value === null || value === undefined || value === '') return 'N/A';


//   if (h.toLowerCase().includes('createdat') || h.toLowerCase().includes('updatedat')) {
//   const date = new Date(value);
//   return isNaN(date) ? 'Invalid Date' : date;
// }
//   const lowerHeader = h.toLowerCase();
//   if (lowerHeader.includes('createdat') || lowerHeader.includes('updatedat')) {
//     const date = new Date(value);
//     return isNaN(date.getTime()) ? 'Invalid Date' : date;
//   }

//   return value;
// });
// const row = worksheet.addRow([index + 1, ...rowData]);

// // Now format date cells if needed
// headers.forEach((h, i) => {
//   const cell = row.getCell(i + 2); // +1 for S.No, +1 for zero-index
//   const lowerHeader = h.toLowerCase();

//   if (lowerHeader.includes('createdat') || lowerHeader.includes('updatedat')) {
//     if (cell.value instanceof Date) {
//       cell.numFmt = 'dd-mmm-yyyy hh:mm AM/PM'; // proper Excel format
//     } else if (typeof cell.value === 'string' && Date.parse(cell.value)) {
//       cell.value = new Date(cell.value);
//       cell.numFmt = 'dd-mmm-yyyy hh:mm AM/PM';
//     }
//   }
// });

//     // Insert serial number at the front
// //const row = worksheet.addRow([index + 1, ...rowData]);

//     const isEven = index % 2 === 0;
//     const fillColor = isEven ? 'FFFFFFFF' : 'FFF2F2F2'; // White or light gray

//     row.eachCell(cell => {
//       cell.fill = {
//         type: 'pattern',
//         pattern: 'solid',
//         fgColor: { argb: fillColor }
//       };
//       cell.border = borderStyle;
//       cell.alignment = { vertical: 'middle', horizontal: 'left' };
//     });

//     // Align the S.No column to center for clarity
//     row.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
//   });

//   // Auto-resize columns
// worksheet.columns.forEach((col, index) => {
//   let maxLength = 10;
//   col.eachCell({ includeEmpty: true }, cell => {
//     const value = cell.value ? cell.value.toString() : '';
//     maxLength = Math.max(maxLength, value.length);
//   });

//   if (
//     col.header &&
//     (col.header.toLowerCase().includes('createdat') || col.header.toLowerCase().includes('updatedat'))
//   ) {
//     col.width = 25;
//     console.log(`Column ${index + 1} (${col.header}) set to fixed width: ${col.width}`);
//   } else {
//     col.width = maxLength + 2;
//     console.log(`Column ${index + 1} (${col.header}) set to dynamic width: ${col.width}`);
//   }
// });


//   await workbook.xlsx.writeFile(outputPath);
//   console.log('Excel written to:', outputPath);
// };


const ExcelJS = require('exceljs');

const readExcel = async (filePath) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.worksheets[0];

  const data = [];
  const headers = [];

  worksheet.getRow(1).eachCell((cell, colNumber) => {
    headers[colNumber] = cell.text;
  });

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header
    const rowData = {};
    row.eachCell((cell, colNumber) => {
      rowData[headers[colNumber]] = cell.text;
    });
    data.push(rowData);
  });

  return data;
};

const writeExcel = async (data, outputPath) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Data must be a non-empty array of objects');
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  const headers = Object.keys(data[0] || {}).filter(h => h.toLowerCase() !== 'id');
  worksheet.addRow(['S.No', ...headers]);

  const borderStyle = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' }
  };

  // Style header row
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell(cell => {
    cell.font = { bold: true };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD9D9D9' }
    };
    cell.border = borderStyle;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  data.forEach((item, index) => {
    const rowData = headers.map(h => {
      const value = item[h];
      if (value === null || value === undefined || value === '') return 'N/A';
      if (h.toLowerCase().includes('createdat') || h.toLowerCase().includes('updatedat')) {
        const date = new Date(value);
        return isNaN(date) ? 'Invalid Date' : date;
      }
      return value;
    });

    const row = worksheet.addRow([index + 1, ...rowData]);

    // Date formatting
    headers.forEach((h, i) => {
      const cell = row.getCell(i + 2); // skip S.No column
      const lowerHeader = h.toLowerCase();
      if (lowerHeader.includes('createdat') || lowerHeader.includes('updatedat')) {
        if (cell.value instanceof Date) {
          cell.numFmt = 'dd-mmm-yyyy hh:mm AM/PM';
        } else if (typeof cell.value === 'string' && Date.parse(cell.value)) {
          cell.value = new Date(cell.value);
          cell.numFmt = 'dd-mmm-yyyy hh:mm AM/PM';
        }
      }
    });

    // Zebra stripe styling
    const isEven = index % 2 === 0;
    const fillColor = isEven ? 'FFFFFFFF' : 'FFF2F2F2';

    row.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: fillColor }
      };
      cell.border = borderStyle;
      cell.alignment = { vertical: 'middle', horizontal: 'left' };
    });

    row.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
  });

  // Auto-resize columns
  worksheet.columns.forEach((col, index) => {
    let maxLength = 10;
    col.eachCell({ includeEmpty: true }, cell => {
      const value = cell.value ? cell.value.toString() : '';
      maxLength = Math.max(maxLength, value.length);
    });

    if (
      col.header &&
      (col.header.toLowerCase().includes('createdat') || col.header.toLowerCase().includes('updatedat'))
    ) {
      col.width = 25;
    } else {
      col.width = maxLength + 2;
    }
  });

  await workbook.xlsx.writeFile(outputPath);
  console.log('Excel written to:', outputPath);
};

module.exports = {
  readExcel,
  writeExcel
};
