export interface Env {
	NODE_ENV: string;
	PORT: string;
	BASE_URL: string;
	IS_DEBUG: string;
	IS_DEBUG_HTTP_RESPONSE: string;
	IS_DEBUG_REDIS: string;
	IS_DEBUG_TYPEORM: string;
	POSTGRES_HOST: string;
	POSTGRES_PORT: string;
	POSTGRES_USER: string;
	POSTGRES_PASSWORD: string;
	POSTGRES_DB: string;
	JWT_SECRET: string;
	SESSION_SECRET: string;
	RABBIT_MQ_URL: string;
	REDIS_HOST: string;
	REDIS_PORT: string;
	REDIS_USER: string;
	REDIS_PASSWORD: string;
	REDIS_DB: string;
	GMAIL_USER: string;
	GMAIL_PASS: string;
}
