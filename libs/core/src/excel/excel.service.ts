import { Injectable } from '@nestjs/common';
import { ExcelService } from './excel.abstract';
import { Column, Workbook, Worksheet } from 'exceljs';
import { EXCEL_CONSTANTS, ExcelModuleType } from './excel.constant';

@Injectable()
export class ExcelServiceImp extends ExcelService {
	newSheet(workbook: Workbook, module: ExcelModuleType): Worksheet {
		const setting = EXCEL_CONSTANTS[module];
		const worksheet = workbook.addWorksheet(setting.sheetName);
		const columns: Partial<Column>[] = [];

		Array.from(setting.columns, (value) => {
			const { header, key, required } = value;
			if (required) {
				columns.push({
					header: {
						richText: [
							{ text: header }, // Regular text
							{
								text: ' (',
								font: {
									bold: true
								}
							},
							{
								text: '*',
								font: {
									bold: true,
									color: {
										argb: 'FFFF0000'
									}
								}
							}, // Red star
							{
								text: ')',
								font: {
									bold: true
								}
							}
						]
					},
					key,
					width: header!.length + 6
				} as any);
			} else {
				columns.push({
					header,
					key,
					width: header!.length + 2
				});
			}
		});
		worksheet.columns = columns;
		worksheet.findRow(1)!.font = {
			bold: true
		};
		worksheet.findRow(1)!.fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FFD9EAD3' },
			bgColor: { argb: 'FFD9EAD3' }
		};
		worksheet.findRow(1)!.border = {
			top: { style: 'thin' },
			left: { style: 'thin' },
			bottom: { style: 'thin' },
			right: { style: 'thin' }
		};
		worksheet.addRows(setting.sampleData);
		return worksheet;
	}

	async getDataFromFile<T = any>(
		workbook: Workbook,
		module: ExcelModuleType,
		file: Express.Multer.File
	): Promise<T> {
		const setting = EXCEL_CONSTANTS[module];
		const data: any[] = [];

		try {
			await workbook.xlsx.load(file.buffer); // Load the workbook from the buffer
			const worksheet = workbook.getWorksheet(setting.sheetName)!; // Read the first worksheet

			worksheet.eachRow((row, rowNumber) => {
				if (rowNumber > 1) {
					const values: any[] = (row.values as any).slice(1);
					const headers = {};
					values.forEach((value, i) => {
						headers[setting.columns[i].key!] = value;
					});
					data.push(headers);
				}
			});

			return data as any;
		} catch (error) {
			throw new Error(`Error reading Excel file: ${error.message}`);
		}
	}
}
