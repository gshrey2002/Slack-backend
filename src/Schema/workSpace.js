import mongoose from "mongoose";

const workSpaceSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Work space name is required"],
        unique: true
        },
    description:{
        type:String,
        // required:[true,"Work space description is required"]
    },
    members:[{
        memberId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",

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
            // required:[true,"Join code is required"]
        },
    channels:{
            type:[mongoose.Schema.Types.ObjectId],
            ref:"Channel"
        }

},
// {
//     timestamps: true,
//     toJSON: { virtuals: true, getters: true },
//     toObject: { virtuals: true, getters: true },
// }

)


const workSpace=mongoose.model("WorkSpace",workSpaceSchema);
workSpace.syncIndexes();
export default workSpace