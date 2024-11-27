import { FastifyInstance } from "fastify";
import { InitApp } from "./initApp";
import { GlobalPluginRegister } from "../plugins";
import { BaseRouter } from "..";


/**
 * @param app 
 * @step_one init app
 * @step_two register global plugins and middlewares
 * @step_three register router (all routes)
 */
export const bootstrap = (app: FastifyInstance) => {
    try {
        InitApp(app);
        GlobalPluginRegister(app)
        app.register(BaseRouter);
    }
    catch (e) {
        console.log({
            e,
            message: 'error while bootstraping app!',
            code: '500'
        })
    }
}