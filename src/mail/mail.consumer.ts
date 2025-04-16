import { Logging } from '@common/decorators';
import { NodemailerService } from '@core/nodemailer';
import { RABBITMQ_PATTERNS } from '@core/rabbitmq';
import { SendMailEventPayload } from '@modules/mail';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
@Logging()
export class MailConsumer {
	constructor(private readonly nodemailerService: NodemailerService) {}

	@EventPattern(RABBITMQ_PATTERNS.SEND_MAIL)
	async onSendMail(@Payload() payload: SendMailEventPayload, @Ctx() context: RmqContext) {
		const channel = context.getChannelRef();
		const originalMessage = context.getMessage();
		await this.nodemailerService.sendHello({
			to: 'test@gmail.com',
			message: 'Hello World'
		});
		channel.ack(originalMessage);
	}
}
