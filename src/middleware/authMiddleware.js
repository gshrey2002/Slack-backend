import { StatusCodes } from "http-status-codes";
import { customErrorResponse } from "../common/customResponse";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Config/serverConfig";
import userRepository from "../Repositories/userRepo";


export const isAuthenticated = async (req, res, next) => {
try {
    const token=req.headers[x-access-token];
    if(!token){
    return res.status(StatusCodes.FORBIDDEN).json(customErrorResponse({
        explanation:"invalid data sent from client",
        message:"Token not found",
    }))
    }
    const verifyToken=jwt.verify(token,JWT_SECRET);
    if(!verifyToken){
        return res.status(StatusCodes.FORBIDDEN).json(customErrorResponse({
            explanation:"invalid data sent from client",
            message:"invalid Token found",
        }))
    }
    const user=await userRepository.getById(verifyToken.id);
    req.user=user.id;
    next();
} catch (error) {
     console.log("auth middleware error",error);
     if(error.name==="JsonWebTokenError"){
        return res.status(StatusCodes.FORBIDDEN).json(customErrorResponse({
            explanation:"invalid data sent from client",
            message:"invalid Token found",
        }))
     }

return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));

}


}