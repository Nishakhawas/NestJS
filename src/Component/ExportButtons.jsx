import { FaFileExcel, FaFilePdf, FaFileCsv, FaPrint } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useRef } from 'react';

const ExportButtons = ({ data }) => {

  const tableRef = useRef();

  // Excel
  const handleExcelExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  //  CSV
  const handleCSVExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    console.log("🚀 ~ handleCSVExport ~ worksheet:", worksheet)
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF
  const handlePDFExport = () => {
    const doc = new jsPDF();
    console.log("🚀 ~ handlePDFExport ~ doc:", doc)
    doc.autoTable({
      head: [Object.keys(data[0])],
      body: data.map(row => Object.values(row)),
    });
    doc.save('data.pdf');
  };


  //  Print
  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    const tableHTML = `
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>${Object.keys(data[0]).map(key => `<th>${key}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>${Object.values(row).map(val => `<td>${val}</td>`).join('')}</tr>
          `).join('')}
        </tbody>
      </table>
    `;

    printWindow.document.write(`
      <html>
        <head><title>Print Table</title></head>
        <body>${tableHTML}</body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="flex justify-end mt-3 mx-2 gap-3 flex-wrap">
      <button onClick={handleExcelExport} className="flex items-center gap-2 bg-blue-700 text-white px-2 py-1 text-xs rounded hover:bg-blue-800 transition">
        <FaFileExcel />
        EXCEL
      </button>
      <button onClick={handlePDFExport} className="flex items-center gap-2 bg-red-400 text-white px-2 py-1 text-xs rounded hover:bg-red-500 transition">
        <FaFilePdf />
        PDF
      </button>
      <button onClick={handleCSVExport} className="flex items-center gap-2 bg-blue-600 text-white px-2 py-1 text-xs rounded hover:bg-blue-700 transition">
        <FaFileCsv />
        CSV
      </button>
      <button onClick={handlePrint} className="flex items-center gap-2 bg-green-800 text-white px-2 py-1 text-xs rounded hover:bg-green-900 transition">
        <FaPrint />
        PRINT
      </button>
    </div>
  );
};

export default ExportButtons;
