import { Prisma } from "../../plugins";
import { UserAddDataSchema, UserProfileDataSchema } from "../../types";


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

/**
 * 
 * @param phone 
 * @param prismaClient 
 * @logic find user by id
 */
const get_user_by_phone_or_id = async (phone_or_id: string, prismaClient: typeof Prisma) => {
    return await prismaClient.user.findFirst({ 
        where: { 
            OR : [
                {
                    phone : phone_or_id
                },
                {
                    id : phone_or_id
                }
            ]    
        } 
    })
}

/**
 * 
 * @param data_schema 
 * @param prismaClient 
 * @logic create user in database
 */
const add_user = async (data_schema : UserAddDataSchema, prismaClient: typeof Prisma) => {
    return await prismaClient.user.create({
        data: {
            ...data_schema,
            isTest : process?.env?.NODE_ENV === 'test' ? true : false,
            profile: {
                create: {}
            }
        }
    })
}

/**
 * @param id
 * @param data_schema 
 * @param prismaClient 
 * @logic edit user in database
 */
const edit_user = async (id : string, data_schema : Partial<Pick<UserAddDataSchema ,"age"|"email"|"username">>, prismaClient: typeof Prisma) => {
    return await prismaClient.user.update({
        where : {
            id
        },
        data: {
            age : data_schema?.age ,
            username : data_schema?.username ,
            email : data_schema?.email ,
            isTest : process?.env?.NODE_ENV === 'test' ? true : false,
        }
    })
}


/**
 * @param id
 * @param data_schema 
 * @param prismaClient 
 * @logic edit user in database
 */
const edit_user_profile = async (id : string, data_schema : UserProfileDataSchema, prismaClient: typeof Prisma) => {
    return await prismaClient.user.update({
        where : {
            id
        },
        data: {
            profile : {
                update :{
                    ...data_schema,
                    isTest : process?.env?.NODE_ENV === 'test' ? true : false,
                }
            },
            isTest : process?.env?.NODE_ENV === 'test' ? true : false,
        }
    })
}



/**
 * 
 * @param id 
 * @param prismaClient 
 * @logic soft delete user by id
 */
const delete_user = async (id : string, prismaClient: typeof Prisma) => {
    return await prismaClient.user.update({
        where : {id},
        data : {isDeleted : true}
    })
}


/**
 * 
 * @param id 
 * @param prismaClient 
 * @logic find user by id
 */
const get_user_by_id = async (id : string, prismaClient: typeof Prisma) => {
    return await prismaClient.user.findUnique({
        where : {
            id,
            isActive : true,
            isDeleted : false
        },
        include : {
            profile : {
                select : {
                    id : true,
                    address : true,
                    bio : true,
                    first_name : true,
                    last_name : true,
                    banners : {
                        select : {
                            id : true,
                            src : true,
                        }
                    }
                }
            },
            avatar : {
                select : {
                    id : true,
                    src : true
                }
            }
        },
    })
}
export {
    get_all_users,
    get_user_count,
    get_user_by_phone_or_id,
    get_user_by_id,
    add_user,
    edit_user,
    edit_user_profile,
    delete_user,
}