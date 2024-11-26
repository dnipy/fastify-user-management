import { Prisma } from "../../plugins"

const get_all_users = async ({ skip, take }: { skip?: string, take?: string }) => {
    return await Prisma.user.findMany({
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
            isActive: true,
            isDeleted: false,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
}

export {
    get_all_users
}