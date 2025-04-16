import { I18nExceptionServiceImp } from '@core/i18n/i18n-exception.service';
import { I18nExceptionService, TranslateService } from '@core/i18n/i18n.service';
import { TranslateServiceImp } from '@core/i18n/translate.service';
import { DynamicModule, Module } from '@nestjs/common';
import { HeaderResolver, I18nModule as NestI18nModule } from 'nestjs-i18n';
import * as path from 'path';

@Module({})
export class I18nModule {
	static forRoot(): DynamicModule {
		return {
			module: I18nModule,
			global: true,
			imports: [
				NestI18nModule.forRoot({
					fallbackLanguage: 'vi',
					loaderOptions: {
						path: path.join(__dirname, '../i18n/'),
						watch: true
					},
					resolvers: [new HeaderResolver(['x-lang'])]
				})
			],
			providers: [
				{
					provide: I18nExceptionService,
					useClass: I18nExceptionServiceImp
				},
				{
					provide: TranslateService,
					useClass: TranslateServiceImp
				}
			],
			exports: [I18nExceptionService, TranslateService]
		};
	}
}
