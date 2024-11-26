import fastify from 'fastify';
import { Bootstrap } from './lib';
import { LoadEnv } from './lib/loadEnv';
import { BaseRouter } from '.';

const app = fastify({ logger: true });

console.log(process.env.LOG_LEVEL)

LoadEnv()
    .then(() => {
        Bootstrap(app);
        app.register(BaseRouter);
    })
    .catch(() => {
        console.log('error while loading .env[ "development" | "production" ]')
    })