
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
            age: { type: 'number', minimum: 1 , maximum : 120 },
            email: { type: 'string' },
            username: { type: 'string', minLength: 3 },
        },
        required: [`phone`]
    }
}

const user_edit_schema = {
    description: 'edit existing user',
    tags: ['Users'],
    body: {
        type: 'object',
        properties: {
            // phone: { type: 'string', pattern: '^09[0-9]{9}$' },
            age: { type: 'number', minimum: 1 , maximum : 120 },
            email: { type: 'string' },
            username: { type: 'string', minLength: 3 },
        },
        // required: [`phone`]
    },
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' } 
        },
        required: ['id']
    }
}


const user_edit_profile_schema = {
    description: 'edit existing user profile section',
    tags: ['Users'],
    body: {
        type: 'object',
        properties: {
            first_name: { type: 'string', },
            last_name: { type: 'string', },
            bio: { type: 'string',  },
            address: { type: 'string',  },
        },
    },
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' } 
        },
        required: ['id']
    }
}



const user_delete_schema = {
    description: 'Delete an existing user',
    tags: ['Users'],
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' } 
        },
        required: ['id']
    }
};


const user_find_schema = {
    description: 'find an existing user',
    tags: ['Users'],
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' } 
        },
        required: ['id']
    }
};
export {
    user_all_schema,
    user_add_schema,
    user_delete_schema,
    user_find_schema,
    user_edit_schema,
    user_edit_profile_schema
}