import { PaginationMeta } from '@lib/base/dto';

export interface IResponse {
	statusCode: number;
	message: string;
	success: boolean;
	path: string;
	duration: string;
	data: any;
}

export interface IListResponse {
	statusCode: number;
	message: string;
	success: boolean;
	path: string;
	duration: string;
	data: any[];
	meta?: PaginationMeta;
}
