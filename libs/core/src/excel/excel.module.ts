import { Global, Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelServiceImp } from './excel-imp.service';

@Global()
@Module({
	providers: [
		{
			provide: ExcelService,
			useClass: ExcelServiceImp
		}
	],
	exports: [ExcelService]
})
export class ExcelModule {}
