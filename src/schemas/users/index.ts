
/**
 * 
 */
const user_all_schema = {
    description: 'get all users',
    tags: ['Users'],
    querystring: {
        type: 'object',
        properties: {
            skip: { type: 'string', pattern: '^[0-9]*$' },
            take: { type: 'string', pattern: '^[0-9]*$' },
        },
        required: []
    }
}

const user_add_schema = {
    description: 'add new user',
    tags: ['Users'],
    body: {
        type: 'object',
        properties: {
            phone: { type: 'string', pattern: '^09[0-9]{9}$' },
        },
        required: [`phone`]
    }
}
export {
    user_all_schema,
    user_add_schema
}