import { FastifyInstance } from "fastify";

const InitApp = async (app: FastifyInstance) => {
    const PORT = Number(process.env.FASTIFY_PORT) || 8000
    try {
        await app.listen({
            port: PORT,
            host : '0.0.0.0'
        });
        console.log(`Server is running on 0.0.0.0:${PORT}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};


export { InitApp }