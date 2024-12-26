import { v4 as uuidv4 } from 'uuid';

import workSpaceRepository from "../Repositories/workSpaceRepo.js";
import validationError from "../Utils/Errors/validationError.js";

export const creatWorkSpaceService=async (data)=>{
    try {
        const JoinCode=uuidv4().substring(0,6).toUpperCase();
        // console.log(joinCode);
        const newWorkSpace=await workSpaceRepository.create({
            name:data.name,
            description:data.description,
            JoinCode
        });

        await workSpaceRepository.addMemberToWorkSpace(
            newWorkSpace._id,
            data.owner,
            "Admin"
        )

        const updatedworkspace=await workSpaceRepository.addChannelToWorkSpace(
            newWorkSpace._id,
            "general",
            );

        return updatedworkspace;
    } catch (error) {
        console.log("Error in createWorkSpaceService:", error);

        if(error.name==="ValidationError"){
            throw new validationError(
                {
                    error:error.errors
                },
                error.message
                );

        }   

        if(error.code===11000 && error.name==="MongoServerError"){

            throw new validationError(
                {
                    error:["A workspace with same details already exists"]
                },
                "A workspace with same details already exists"
                );
        }
    }
}