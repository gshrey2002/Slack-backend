
import mongoose from "mongoose";

import { DEV_MONGO_URL, NODE_ENV } from "./serverConfig.js";


export default async function connectDb() {

    try {
         if(NODE_ENV==="development"){
            await mongoose.connect(DEV_MONGO_URL);
            console.log(DEV_MONGO_URL);
            console.log("connected to Dev DB");
        }else if(NODE_ENV==="production"){
            await mongoose.connect(process.env.PROD_MONGO_URL);
            console.log("connected to Prod db");
        }
        console.log(`connected to DB from ${NODE_ENV}`);
    } catch (error) {
        console.log(error);
    }
}