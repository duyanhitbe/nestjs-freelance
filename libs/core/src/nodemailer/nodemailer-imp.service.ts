import { Injectable, Logger } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { InjectNodemailer } from './nodemailer.decorator';
import { SendMailOptions, Transporter } from 'nodemailer';
import { join } from 'path';
import { readFileSync } from 'fs';
import * as handlebars from 'handlebars';
import { SendGmailOptions } from '@lib/core/nodemailer/nodemailer.interface';

@Injectable()
export class NodemailerServiceImp extends NodemailerService {
	private readonly logger = new Logger(this.constructor.name);

	constructor(@InjectNodemailer() private readonly transporter: Transporter) {
		super();
	}

	private async send(options: SendMailOptions) {
		try {
			await this.transporter.sendMail(options);
		} catch (error) {
			this.logger.error(error);
		}
	}

	private loadTemplate(name: string, data?: any): string {
		const path = join(__dirname, '..', 'public', name + '.hbs');
		const templateFile = readFileSync(path, 'utf8');
		const template = handlebars.compile(templateFile);
		return template(data);
	}

	async sendHello(options: SendGmailOptions): Promise<void> {
		const from = '"No Reply" <noreply@yourdomain.com>';
		const subject = 'Hello World';
		const html = this.loadTemplate('mail');
		return this.send({
			from,
			to: options.to,
			subject,
			html
		});
	}
}
