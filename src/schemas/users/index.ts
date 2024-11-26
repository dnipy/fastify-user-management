const user_all_schema = {
    querystring: {
        type: 'object',
        properties: {
            skip: { type: 'string', pattern: '^[0-9]*$' },
            take: { type: 'string', pattern: '^[0-9]*$' },
        },
        required: []
    }
}


export {
    user_all_schema
}