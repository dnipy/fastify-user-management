import fastifyRateLimit from '@fastify/rate-limit';
import { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export const GlobalPluginRegister = async (fastify: FastifyInstance) => {

    // ! rate limit 
    fastify.register(fastifyRateLimit, {
        max: 120,
        timeWindow: '1 minute',
        keyGenerator: (req) => req.ip,
        errorResponseBuilder: (req, context) => {
            return {
                statusCode: 429,
                error: 'Too Many Requests',
                message: `You have exceeded the limit of ${context.max} requests in ${context}`,
            };
        },
    });

    // ! swagger
    fastify.register(swagger, {
        swagger: {
            info: {
                title: 'User API',
                description: 'API documentation for user management',
                version: '1.0.0',
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here',
            },
            host: `localhost:${process?.env?.FASTIFY_PORT}`,
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
    });

    // ! UI for swagger
    fastify.register(swaggerUi, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'list',
            deepLinking: false,
        },
        staticCSP: true,
        transformSpecification: (swaggerObject, req, reply) => {
            return swaggerObject;
        },
        transformSpecificationClone: true,
    });

}

export * from './db'
export * from './db/cleanTests'