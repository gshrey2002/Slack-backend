import {z} from "zod"
export const userSchemaValidator=z.object({
    email:z.string().email(),
    password:z.string().min(8),
    username:z.string().min(4),
})