const ExcelJS = require('exceljs');

async function getTestData(sheetName, testCaseName) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('./testdata/testdata1.xlsx');
  const worksheet = workbook.getWorksheet(sheetName);

  let rowData = {};
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header
    const testCase = row.getCell(1).value; // first column = TestCase
    if (testCase === testCaseName) {
      rowData = {
        url: row.getCell(2).value,
        username: row.getCell(3).value,
        password: row.getCell(4).value,
        articleId: row.getCell(5).value,
        serialNumber: row.getCell(6).value,
        customerName: row.getCell(7).value,
        contactNumber: row.getCell(8).value,
        location: row.getCell(9).value,
        filePath: row.getCell(10).value
      };
    }
  });
  return rowData;
}

module.exports = { getTestData };
