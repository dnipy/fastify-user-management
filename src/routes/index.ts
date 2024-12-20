import { FastifyInstance } from 'fastify';
import {UserRoutes} from './users'


export async function ApiRouter(fastify: FastifyInstance) {
    fastify.get('/', async (req, rep) => {
        const agent = req.headers['user-agent']
        return rep.status(200).send({
            phase: process.env.NODE_ENV,
            route: '/api',
            from: req.ip,
            agent,

        })
    })

    fastify.register(UserRoutes, { prefix: 'user' })
}