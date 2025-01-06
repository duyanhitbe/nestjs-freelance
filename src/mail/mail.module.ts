import { Module } from '@nestjs/common';
import { MailConsumer } from './mail.consumer';

@Module({
	controllers: [MailConsumer]
})
export class MailModule {}
