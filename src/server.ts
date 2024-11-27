import fastify from 'fastify';
import { bootstrap, LoadEnv } from './lib';

const app = fastify({ logger: true });

LoadEnv()
    .then(() => {
        bootstrap(app)
    })
    .catch(() => {
        console.log('error while loading .env[ "development" | "production" ]')
    })