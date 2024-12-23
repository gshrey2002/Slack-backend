// import bcrypt from "bcrypt"
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        body:{
            type:String,
            required:[true,"body is required"],

        },
        image:{
            type:String,
            
        },
        channelId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Channel",
            required:[true,"ChannelId is required"],
            
        },
        senderId:{
            required:[true,"senderId is required"],
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        workspaceId:{
            required:[true,"workspaceId is required"],
            type:mongoose.Schema.Types.ObjectId,
            ref:"WorkSpace"
        }

},{timestamps:true});


const message=mongoose.model("Message",messageSchema);

export default message