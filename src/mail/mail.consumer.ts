import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RABBITMQ_PATTERNS } from '@lib/core/rabbitmq';
import { Logging } from '@lib/common/decorators';
import { NodemailerService } from '@lib/core/nodemailer';
import { SendMailEventPayload } from '@lib/modules/mail';

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
