import { PrismaClient } from "@prisma/client";

/**
 * prima client init options 
 */
const prisma_client_options = {}

/**
 * @db : Prisma client generate
 * @singleton : use Singleton design pattern to ensure we ony have one prisma instance !!!
 */
class PrismaInstance {
    private static instance: PrismaClient;

    static getInstance(): PrismaClient {
        if (!PrismaInstance.instance) {
            PrismaInstance.instance = new PrismaClient(prisma_client_options);
        }
        return PrismaInstance.instance;
    }
}

// generate prisma insrance
const Prisma = PrismaInstance.getInstance();

export { Prisma };