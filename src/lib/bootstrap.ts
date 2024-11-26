import { FastifyInstance } from "fastify";

const Bootstrap = async (app: FastifyInstance) => {
    const PORT = Number(process.env.FASTIFY_PORT) || 8000
    try {
        await app.listen({
            port: PORT,
        });
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};


export { Bootstrap }