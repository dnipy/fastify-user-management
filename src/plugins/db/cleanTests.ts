import { Prisma } from '.';


/**
 * @function 
 * delete all data generated while testing
 */
export const cleanupTestDatabase = async () => {
    try {
        // Base delete object
        const q = {
            where: {
                isTest: true,
            },
        };

        // Execute deletions concurrently
        await Promise.all([
            Prisma.user.deleteMany(q),
            Prisma.file.deleteMany(q),
            Prisma.profile.deleteMany(q),
        ]);

        console.log('Test database cleanup successful!');

    } catch (error) {
        // Re-throw or handle as needed
        console.error('Error cleaning up test database:', error);
        throw error; 
    }
};