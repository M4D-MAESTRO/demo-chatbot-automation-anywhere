import { SYSTEM_INFO } from './../../../config/app.config';
import * as Exceljs from 'exceljs';
import { Worksheet } from 'exceljs';

export class ExcelUtils {


    static startExcel(name: string): [string, Exceljs.Workbook] {
        const reportName = name.includes('.xlsx') ? name : `${name}.xlsx`;

        const workbook = new Exceljs.Workbook();

        workbook.creator = SYSTEM_INFO.SYSTEM_NICKNAME;
        workbook.lastModifiedBy = SYSTEM_INFO.SYSTEM_NICKNAME;
        workbook.created = new Date();
        workbook.modified = new Date();
        workbook.lastPrinted = new Date();

        return [reportName, workbook];
    }

    static startCsv(name: string): [string, Exceljs.Workbook] {
        const reportName = name.includes('.csv') ? name : `${name}.csv`;

        const workbook = new Exceljs.Workbook();

        workbook.creator = SYSTEM_INFO.SYSTEM_NICKNAME;
        workbook.lastModifiedBy = SYSTEM_INFO.SYSTEM_NICKNAME;
        workbook.created = new Date();
        workbook.modified = new Date();
        workbook.lastPrinted = new Date();

        return [reportName, workbook];
    }

    static doCellDarkBlue(cellPosition: string, cellValue: any, sheet: Worksheet): Worksheet {
        sheet.getCell(cellPosition).value = cellValue;
        sheet.getCell(cellPosition).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        sheet.getCell(cellPosition).fill = {
            type: 'pattern',
            pattern: 'darkTrellis',
            fgColor: { argb: '003296' }
        };

        sheet.getCell(cellPosition).font = { color: { argb: 'ffffff' }, bold: true };

        return sheet;
    }

    static doCellOutfill(cellPosition: string, cellValue: any, sheet: Worksheet): Worksheet {
        sheet.getCell(cellPosition).value = cellValue;
        sheet.getCell(cellPosition).border = {
            top: { style: 'double' },
            left: { style: 'double' },
            bottom: { style: 'double' },
            right: { style: 'double' }
        };

        sheet.getCell(cellPosition).font = { color: { argb: '003296' } };

        return sheet;
    }

    static doCellDarkBlueOutfill(cellPosition: string, cellValue: any, sheet: Worksheet): Worksheet {
        sheet.getCell(cellPosition).value = cellValue;

        sheet.getCell(cellPosition).font = { color: { argb: '003296' }, bold: true };

        return sheet;
    }

    static doCellDarkBlueFullFill(cellPosition: string, cellValue: any, sheet: Worksheet): Worksheet {
        sheet.getCell(cellPosition).value = cellValue;

        sheet.getCell(cellPosition).fill = {
            type: 'pattern',
            pattern: 'darkTrellis',
            fgColor: { argb: '003296' }
        };

        sheet.getCell(cellPosition).font = { color: { argb: 'FFFFFF' }, bold: true };

        return sheet;
    }

    static doCellDarkBlueFullFillBoldOff(cellPosition: string, cellValue: any, sheet: Worksheet): Worksheet {
        sheet.getCell(cellPosition).value = cellValue;

        sheet.getCell(cellPosition).fill = {
            type: 'pattern',
            pattern: 'darkTrellis',
            fgColor: { argb: '003296' }
        };

        sheet.getCell(cellPosition).font = { color: { argb: 'FFFFFF' }, bold: false };

        return sheet;
    }

    static doCellDarkBlueWithBorder(cellPosition: string, cellValue: any, sheet: Worksheet): Worksheet {
        sheet.getCell(cellPosition).value = cellValue;
        sheet.getCell(cellPosition).border = {
            top: { style: 'thick' },
            left: { style: 'thick' },
            bottom: { style: 'thick' },
            right: { style: 'thick' }
        };
        sheet.getCell(cellPosition).font = { color: { argb: '003296' }, bold: true };

        return sheet;
    }

    static doCellRedFullFill(cellPosition: string, cellValue: any, sheet: Worksheet, fgColor = 'f8cbad', color = 'ff0000',): Worksheet {
        sheet.getCell(cellPosition).value = cellValue;

        sheet.getCell(cellPosition).fill = {
            type: 'pattern',
            pattern: 'darkTrellis',
            fgColor: { argb: fgColor }
        };

        sheet.getCell(cellPosition).font = { color: { argb: color }, bold: false };

        return sheet;
    }

    static doCellRedBoldFullFill(cellPosition: string, cellValue: any, sheet: Worksheet, fgColor = 'f8cbad', color = 'ff0000',): Worksheet {
        sheet.getCell(cellPosition).value = cellValue;

        sheet.getCell(cellPosition).fill = {
            type: 'pattern',
            pattern: 'darkTrellis',
            fgColor: { argb: fgColor }
        };

        sheet.getCell(cellPosition).font = { color: { argb: color }, bold: true };

        return sheet;
    }

    static cleanExcel(sheet: Worksheet,) {
        const max = 1000;
        for (let index = 0; index < max; index++) {
            sheet.getColumn(Number(index + 1)).fill = {
                type: 'pattern',
                pattern: 'darkTrellis',
                fgColor: { argb: 'FFFFFF' }
            };

        }
    }

}
