import dotenv from 'dotenv'

/**
 * @function 
 *  load env file based on project phase (dev or prod)
 */
const LoadEnv = async () => {
    try {
        const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
        dotenv.config({ path: envFile });
    }
    catch (e) {
        console.log({
            desciption: 'error',
            e
        })
    }
}

export {
    LoadEnv
}