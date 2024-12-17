import  jwt from "jsonwebtoken"

import { JWT_EXPIRES_IN, JWT_SECRET } from "../Config/serverConfig.js"

export const createToken=(payload)=>{
    return jwt.sign(payload,JWT_SECRET,{
        expiresIn:JWT_EXPIRES_IN
    })
}