import { Column } from 'exceljs';

export type ExcelModuleType = 'TICKET';

type ExcelModuleValue = {
	sheetName: string;
	columns: Partial<Column & { required: boolean }>[];
	sampleData: any[];
};

export const EXCEL_CONSTANTS: Record<ExcelModuleType, ExcelModuleValue> = {
	TICKET: {
		sheetName: 'Import vé',
		columns: [
			{
				header: 'Mã thông tin vé',
				key: 'ticketInfoCode',
				required: true
			},
			{
				header: 'Mã vé',
				key: 'ticketCode',
				required: true
			}
		],
		sampleData: [
			{
				ticketInfoCode: 'INFO001',
				ticketCode: 'CODE001'
			}
		]
	}
};
