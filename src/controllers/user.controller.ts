import { FastifyReply } from "fastify"
import { add_user_req_type, delete_user_req_type, edit_user_req_type, edit_userprofile_req_type, get_all_users_req_type, get_user_by_id_req_type } from "../types"
import { add_user, delete_user, edit_user, edit_user_profile, get_all_users, get_user_by_id, get_user_by_phone_or_id, get_user_count } from "../services"
import { Prisma } from "../plugins"

export const GET_ALL_USERS = async (req: get_all_users_req_type, rep : FastifyReply) => {
    const { skip, take } = req.query

    try {
        const count = await get_user_count(Prisma)
        const data = await get_all_users({ skip, take }, Prisma)

        if (typeof count === 'number' && data) {
            return rep.send({
                success: true,
                data,
                count
            })
        }
        else{
            return rep.send({
                success : false
            })
        }
    }
    catch (e) {
        console.error(e);
        return rep.status(500).send({ success: false, error: 'Internal Server Error' });
    }
}

export const CREATE_USER = async (req: add_user_req_type, rep : FastifyReply) => {
    try {
        const check_user_phone = await get_user_by_phone_or_id(req.body.phone, Prisma)
        if (check_user_phone) {
            return rep.code(422).send({ msg: 'user exists' })
        }
        else {
            await add_user(req.body, Prisma)
                .then(user=>{
                    return rep.code(201).send({ success: true, user })
                })
                .catch(error=>{
                    return rep.send({success : false , error : error?.meta ? error.meta : error})
                })
        }
    }
    catch (e) {
        console.error(e);
        return rep.status(500).send({ success: false, error: 'Internal Server Error' });
    }
}

export const EDIT_USER = async (req: edit_user_req_type, rep : FastifyReply) => {
    try {
        const check_user = await get_user_by_phone_or_id(req.params.id, Prisma)
        if (!check_user?.id) {
            return rep.code(404).send({ msg: 'user not exist!' })
        }
        else {
            await edit_user(req.params.id ,req.body, Prisma)
                .then(user=>{
                    return rep.code(201).send({ success: true, user })
                })
                .catch(error=>{
                    return rep.send({success : false , error : error?.meta ? error.meta : error})
                })
        }
    }
    catch (e) {
        console.error(e);
        return rep.status(500).send({ success: false, error: 'Internal Server Error' });
    }
}

export const EDIT_USER_PROFILE = async (req: edit_userprofile_req_type, rep : FastifyReply) => {
    console.log(req.body)
    try {
        const check_user_phone = await get_user_by_phone_or_id(req.params.id, Prisma)
        console.log(check_user_phone)
        if (!check_user_phone?.id) {
            return rep.code(404).send({ msg: 'user not exist!' })
        }
        else {
            await edit_user_profile(
                req.params.id ,
                {
                    first_name : req.body?.first_name,
                    last_name : req.body?.last_name,
                    bio : req.body?.bio,
                    address : req.body?.address,
                }, 
                Prisma
            )
                .then(data=>{
                    return rep.code(201).send({ success: true, data  })
                })
                .catch(error=>{
                    return rep.send({success : false , error : error?.meta ? error.meta : error})
                })
        }
    }
    catch (e) {
        console.error(e);
        return rep.status(500).send({ success: false, error: 'Internal Server Error' });
    }
}

export const DELETE_USER = async (req: delete_user_req_type, rep : FastifyReply) => {
    try {

            await delete_user(req.params.id, Prisma)
                .then(()=>{
                    return rep.code(200).send({ success: true, deleted : req.params.id })
                })
                .catch(error=>{
                    return rep.send({success : false , error : error?.meta ? error.meta : error , msg : 'unknown user'})
                })
    }
    catch (e) {
        console.error(e);
        return rep.status(500).send({ success: false, error: 'Internal Server Error' });
    }
}

export const GET_USER_BY_ID = async (req: get_user_by_id_req_type, rep :FastifyReply) => {
    try {
            await get_user_by_id(req.params.id, Prisma)
                .then((data)=>{
                    if (data) {
                        return rep.code(200).send({ success: true, data })
                    }
                    else {
                        return rep.code(404).send({ success: false})
                    }
                })
                .catch(error=>{
                    return rep.send({success : false , error : error?.meta ? error.meta : error , msg : 'unknown user'})
                })
    }
    catch (e) {
        console.error(e);
        return rep.status(500).send({ success: false, error: 'Internal Server Error' });
    }
}