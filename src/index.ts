import { FastifyInstance } from 'fastify';
import { ApiRouter } from './routes';

export async function BaseRouter(fastify: FastifyInstance) {
    fastify.get('/', async (req, rep) => {
        const agent = req.headers['user-agent']
        return rep.status(200).send({
            phase: process.env.NODE_ENV,
            route: '/',
            from: req.ip,
            agent,

        })
    })

    fastify.get('/health', async (req, rep) => {
        return rep.status(200).send({ status: 'ok' });
    });

    fastify.register(ApiRouter, { prefix: 'api/v1' })
}