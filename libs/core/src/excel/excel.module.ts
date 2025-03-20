import { Global, Module } from '@nestjs/common';
import { ExcelService } from './excel.abstract';
import { ExcelServiceImp } from './excel.service';

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
