import { FastifyInstance } from 'fastify';
import { user_add_schema, user_all_schema, user_delete_schema, user_edit_profile_schema, user_edit_schema, user_find_schema } from '../../schemas/users';
import { USER_CONTROLLER } from '../../controllers';

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
        {schema: user_all_schema},
        USER_CONTROLLER.GET_ALL_USERS
    )


    /**
     * @logic : find existing user with id
     */
    fastify.get(
        '/:id',
        {schema: user_find_schema},
        USER_CONTROLLER.GET_USER_BY_ID
    )


    /**
     * @logic : create new user with phone
     */
    fastify.post(
        '/add',
        {schema: user_add_schema},
        USER_CONTROLLER.CREATE_USER
    )


    /**
     * @logic : edit existing user by id
     */
    fastify.put(
        '/:id',
        {schema: user_edit_schema},
        USER_CONTROLLER.EDIT_USER
    )

 
    /**
     * @logic : delete existing user with id
     */
    fastify.delete(
        '/:id',
        {schema: user_delete_schema},
        USER_CONTROLLER.DELETE_USER
    )


        /**
     * @logic : update user profile by id
     */
        fastify.put(
            '/:id/profile',
            {schema: user_edit_profile_schema},
            USER_CONTROLLER.EDIT_USER_PROFILE
            
        )
}