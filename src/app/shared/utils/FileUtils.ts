
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf'
import autoTable, { RowInput } from 'jspdf-autotable'
import * as xlsx from 'xlsx';

export class FileUtils {

    static exportPdf(fileName: string, head: string[], body: string[][]) {
        
        const doc = new jsPDF('l', 'mm', 'a4');
        autoTable(doc, {
            head: [head],
            body,
            didDrawCell: (data) => { },
        });

        doc.save(`${fileName}.pdf`);
    }

    static exportExcel(fileName: string, data: any) {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, fileName);
    }

    static exportCSV(fileName: string, data: any) {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'csv', type: 'array' });
        this.saveAsCsvFile(excelBuffer, fileName);
    }


    static saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    }

    static saveAsCsvFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.csv';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    }
}