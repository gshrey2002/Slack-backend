import { StatusCodes } from "http-status-codes"

import { customErrorResponse, internalErrorResponse, successResponse } from "../common/customResponse.js";
import { signUpService } from "../Service/userService.js";

export const signUpController=async (req,res)=>{
    try {
        const user=await signUpService(req.body);   
        return res.status(StatusCodes.CREATED).json(successResponse(user,"user created successfully"));
        
    } catch (error) {
        console.log("User controller error",error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error))
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}