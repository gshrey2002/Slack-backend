import mongoose from "mongoose";

const workSpaceSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Work space name is required"]
    },
    description:{
        type:String,
        required:[true,"Work space description is required"]
    },
    members:[{
        memberId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users",

        },
        role:{
            type:String,
            enum:["Admin","Member"],
            default:"Member"

        }
            }
        ],
    JoinCode:{
            type:String,
            required:[true,"Join code is required"]
        },
    channels:{
            type:[mongoose.Schema.Types.ObjectId],
            ref:"Channels"
        }

})

const workSpace=mongoose.model("WorkSpace",workSpaceSchema);
export default workSpace