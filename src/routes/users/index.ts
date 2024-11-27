import { FastifyInstance, FastifyRequest } from 'fastify';
import { Prisma } from '../../plugins';
import { user_add_schema, user_all_schema } from '../../schemas/users';
import { add_user, get_all_users, get_user_by_id, get_user_count } from '../../services/users';


/**
 * @base_url  /api/v1/users
 * @description handle user module logic
 */
export async function UserRoutes(fastify: FastifyInstance) {


    /**
     * @logic : return list of users
     */
    fastify.get(
        '/',
        {
            schema: user_all_schema,
        },
        async (req: FastifyRequest<{ Querystring: { skip?: string; take?: string } }>, rep) => {
            const { skip, take } = req.query

            try {
                const count = await get_user_count(Prisma)
                const data = await get_all_users({ skip, take }, Prisma)

                if (count && data) {
                    return rep.send({
                        success: true,
                        data,
                        count
                    })
                }
            }
            catch (e) {
                console.error(e);
                return rep.status(500).send({ success: false, error: 'Internal Server Error' });
            }
        }
    )



    /**
     * @logic : create new user with phone
     */
    fastify.post(
        '/add',
        {
            schema: user_add_schema
        },
        async (req: FastifyRequest<{ Body: { phone: string } }>, rep) => {
            const { phone } = req.body
            try {
                const check_user_phone = await get_user_by_id(phone, Prisma)
                if (check_user_phone) {
                    return rep.code(400).send({ msg: 'user exists' })
                }
                else {
                    const user = await add_user(phone, Prisma)
                    return rep.code(200).send({ success: true, user })
                }
            }
            catch (e) {
                console.error(e);
                return rep.status(500).send({ success: false, error: 'Internal Server Error' });
            }
        }
    )

}