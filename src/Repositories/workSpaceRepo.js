import workSpace from "../Schema/workSpace.js";
// import user from "../Schema/userSchema.js";
import crudRepo from "./crudRepo.js";
import clientError from "../Utils/Errors/clientError.js";
import { StatusCodes } from "http-status-codes";
import user from "../Schema/userSchema.js";
import channelRepository from "./channelRepo.js";
// import channel from "../Schema/channel.js";

const workSpaceRepository={
...crudRepo(workSpace),
getWorkSpaceByName:async function (name){
    const workSpace=await workSpace.findOne({name});

    if(!workSpace){ 
        throw new clientError({
            explanation:"invalid data sent from client",
            message:"Work space not found with this name",
            statusCode:StatusCodes.NOT_FOUND,
            error:["Work space not found"]
        });
    }
    return workSpace


} ,
getWorkSpaceByJoinCode:async function (joinCode){
    const workSpace=await workSpace.findOne({JoinCode:joinCode});
    if(!workSpace){ 
        throw new clientError({
            explanation:"invalid data sent from client",
            message:"Work space not found with this JOIN CODE",
            statusCode:StatusCodes.NOT_FOUND,
            error:["Work space not found"]
        });
    }
    return workSpace
},
addMemberToWorkSpace:async function (workSpaceId,memberId,role){
    const workSpace=await workSpace.findById(workSpaceId);
    if(!workSpace){
        throw new clientError({
            explanation:"invalid data sent from client",
            message:"Work space not found",
            statusCode:StatusCodes.NOT_FOUND,
            error:["Work space not found"]
        })
    }
    const memberid=await user.findById(memberId);
    if(!memberid){
        throw new clientError({
            explanation:"invalid data sent from client",
            message:"Member not found",
            statusCode:StatusCodes.NOT_FOUND,
            error:["Member not found"]
        })
    }
    const userAlreadyExit=workSpace.members.find((member)=>
         member.memberId==memberId
    )
    if(userAlreadyExit){
        throw new clientError({
            explanation:"invalid data sent from client",
            message:"Member already exist",
            statusCode:StatusCodes.FORBIDDEN,
            error:["Member already exist"]
        })
    }
    workSpace.members.push({memberId,role});
    await workSpace.save();
    return workSpace;
},

fetchAllworkspaceByMemberId:async function (memberId){
    const workSpace=await workSpace.find({members:{$elemMatch:{memberId}}});
    if(!workSpace){
        throw new clientError({
            explanation:"invalid data sent from client",
            message:"member not found",
            statusCode:StatusCodes.NOT_FOUND,
            error:["member not found"]
        })
    }
    return workSpace;
},
addChannelToWorkSpace:async function (workSpaceId,channelName){
    const workSpace=await workSpace.findById(workSpaceId).populate("channels");
    if(!workSpace){
        throw new clientError({
            explanation:"invalid data sent from client",
            message:"Work space not found",
            statusCode:StatusCodes.NOT_FOUND,
            error:["Work space not found"]
        })
    }

    const isChannelExist=workSpace.channels.find((channel)=>
         channel.name==channelName
    )
    if(isChannelExist){
        throw new clientError({
            explanation:"invalid data sent from client",
            message:"Channel already exist",
            statusCode:StatusCodes.FORBIDDEN,
            error:["Channel already exist"]
        })
    }
    const channel=await channelRepository.create({name:channelName});
    workSpace.channels.push(channel);
    await workSpace.save();
    return workSpace;
},
fetchAllWorkspaceByMemberId:async function (memberId){
    const member=await user.findById(memberId);
    if(!member){
        throw new clientError({
            explanation:"invalid data sent from client",
            message:"Member not found",
            statusCode:StatusCodes.NOT_FOUND,
})}
const workspace=await workSpace.find({
    "members.memberId":memberId
}).populate("members.memberId","username avatar email");

return workspace;
}


}

export default workSpaceRepository