import { StatusCodes } from "http-status-codes";

// import { object } from "zod";
import { customErrorResponse } from "../common/customResponse.js";

export const validate=(schema)=>{
    return async (req,res,next)=>{
       try {
        await schema.parseAsync(req.body);
        next();
       } catch (error) {
        console.log("validation error in zod",error);
        let explanation = [];
        error.errors.forEach(key => {
            explanation.push(key.message);
        });
        res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse({
            message:"Validation Error",
            explanation:explanation
        }))
       }
    }
}