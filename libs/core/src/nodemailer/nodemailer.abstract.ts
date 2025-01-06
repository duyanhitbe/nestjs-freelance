import { SendGmailOptions } from './nodemailer.interface';

export abstract class NodemailerService {
	abstract sendHello(options: SendGmailOptions): Promise<void>;
}
