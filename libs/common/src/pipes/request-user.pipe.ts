import { Inject, Injectable, PipeTransform } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class RequestUserPipe implements PipeTransform {
	constructor(@Inject(REQUEST) private readonly req: Request) {}

	transform(value: any) {
		value.user = this.req['user'];
		return value;
	}
}
