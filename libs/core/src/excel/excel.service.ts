import { Workbook, Worksheet } from 'exceljs';
import { ExcelModuleType } from './excel.constant';

export abstract class ExcelService {
	abstract newSheet(workbook: Workbook, module: ExcelModuleType): Worksheet;

	abstract getDataFromFile<T = any>(
		workbook: Workbook,
		module: ExcelModuleType,
		file: Express.Multer.File
	): Promise<T>;
}
