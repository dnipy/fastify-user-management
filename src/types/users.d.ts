
import { FastifyRequest } from "fastify"

export interface UserAddDataSchema {
    phone : string
    username?:string
    email?:string
    age?:number
}

export interface UserProfileDataSchema {
    first_name ?: string
    last_name  ?: string
    bio        ?: string
    address    ?: string
}

export type get_all_users_req_type = FastifyRequest<{
     Querystring: { 
        skip?: string; 
        take?: string 
    } 
}>

export type get_user_by_id_req_type = FastifyRequest<{ 
    Params: {
        id : string
    } 
}>

export type add_user_req_type = FastifyRequest<{ 
    Body: UserAddDataSchema 
}>

export type edit_user_req_type = FastifyRequest<{ 
    Params: {
        id : string     
    } 
    Body: Partial<Pick<UserAddDataSchema,"age"|"email"|"username">>
}>

export type edit_userprofile_req_type = FastifyRequest<{ 
    Params: {
        id : string     
    } 
    Body: UserProfileDataSchema
}>

export type delete_user_req_type = FastifyRequest<{ 
    Params: {
        id : string     
    } 
}>