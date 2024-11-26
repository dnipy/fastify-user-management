import { FastifyInstance } from 'fastify';
import { Prisma } from '../../plugins';
import { user_all_schema } from '../../schemas/users';
import { get_all_users } from '../../services/users';


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
            schema: user_all_schema
        },
        async (req, rep) => {
            const { skip, take } = req.query as { skip?: string, take?: string }

            try {
                const count = await Prisma.user.count()
                const data = await get_all_users({ skip, take })

                if (count && data) {
                    return rep.send({
                        data,
                        count
                    })
                }
            }
            catch (e) {
                console.error(e);
                return rep.status(500).send({ error: 'Internal Server Error' });
            }
        })

}