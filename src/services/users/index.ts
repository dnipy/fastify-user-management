import { Prisma } from "../../plugins";


/**
 * use DI (dependency Injection) for cleaner arch !
 * @param  skip: string; 
 * @param take: string 
 * @param prismaClient 
 * @returns Prisma orm response
 */
const get_all_users = async (
    { skip, take }: { skip?: string; take?: string },
    prismaClient: typeof Prisma
) => {
    return await prismaClient.user.findMany({
        skip: Number(skip) || 0,
        take: Number(take) || 10,
        select: {
            id: true,
            username: true,
            phone: true,
            email: true,
            createdAt: true,
        },
        where: {
            AND: [{ isActive: true }, { isDeleted: false }],
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};

/**
 * get user records (count) exists in db
 * @param prismaClient 
 * @returns Prisma orm response
 */
const get_user_count = async (prismaClient: typeof Prisma) => {
    return await prismaClient.user.count()
}

const get_user_by_id = async (phone: string, prismaClient: typeof Prisma) => {
    return await prismaClient.user.findFirst({ where: { phone } })
}


const add_user = async (phone: string, prismaClient: typeof Prisma) => {
    return await prismaClient.user.create({
        data: {
            phone,
            profile: {
                create: {}
            }
        }
    })
}

export {
    get_all_users,
    get_user_count,
    add_user,
    get_user_by_id
}