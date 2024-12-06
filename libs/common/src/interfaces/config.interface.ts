export interface Env {
	NODE_ENV: string;
	PORT: string;
	BASE_URL: string;
	IS_DEBUG: string;
	TYPEORM_DEBUG: string;
	POSTGRES_HOST: string;
	POSTGRES_PORT: string;
	POSTGRES_USER: string;
	POSTGRES_PASSWORD: string;
	POSTGRES_DB: string;
	JWT_SECRET: string;
	RABBIT_MQ_URL: string;
	REDIS_HOST: string;
	REDIS_PORT: string;
	REDIS_USER: string;
	REDIS_PASSWORD: string;
	REDIS_DB: string;
}
