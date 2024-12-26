import { StatusCodes } from "http-status-codes";

import {customErrorResponse, internalErrorResponse, successResponse} from "../common/customResponse.js";
import {creatWorkSpaceService} from "../Service/workSpaceService.js";
export const createWorkspaceController=async (req,res)=>{
    try {
        console.log(req.user);

        const response=await creatWorkSpaceService(
         {   ...req.body,
            owner:req.user
        }
            );
            console.log(response,"response");
        return res.status(StatusCodes.CREATED)
        .json(successResponse(response,"workSpace created successfully"));
        
    } catch (error) {
        console.log(error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error))
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error))
        
    }
}