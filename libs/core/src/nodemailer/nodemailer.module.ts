import { DynamicModule, Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.abstract';
import { NodemailerServiceImp } from './nodemailer.service';
import { NODEMAILER_TRANSPORT } from './nodemailer.constant';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Env } from '@lib/common/interfaces';

@Module({})
export class NodemailerModule {
	static forRoot(): DynamicModule {
		return {
			module: NodemailerModule,
			global: true,
			providers: [
				{
					provide: NODEMAILER_TRANSPORT,
					inject: [ConfigService],
					useFactory: (configService: ConfigService<Env>) =>
						nodemailer.createTransport({
							service: 'gmail',
							host: 'smtp.gmail.com',
							port: 587,
							secure: false,
							auth: {
								user: configService.getOrThrow('GMAIL_USER'),
								pass: configService.getOrThrow('GMAIL_PASS')
							}
						})
				},
				{
					provide: NodemailerService,
					useClass: NodemailerServiceImp
				}
			],
			exports: [NodemailerService]
		};
	}
}
