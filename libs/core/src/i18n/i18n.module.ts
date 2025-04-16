import { DynamicModule, Module } from '@nestjs/common';
import * as path from 'path';
import { HeaderResolver, I18nModule as NestI18nModule } from 'nestjs-i18n';
import { I18nExceptionService, TranslateService } from '@lib/core/i18n/i18n.service';
import { I18nExceptionServiceImp } from '@lib/core/i18n/i18n-exception.service';
import { TranslateServiceImp } from '@lib/core/i18n/translate.service';

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
