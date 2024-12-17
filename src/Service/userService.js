import bcrypt from "bcrypt"
import { StatusCodes } from "http-status-codes";

import { createToken } from "../common/authUtils.js";
import userRepository from "../Repositories/userRepo.js"
import clientError from "../Utils/Errors/clientError.js";
import validationError from "../Utils/Errors/validationError.js";

export const signUpService=async (data)=>{
    try {
        const newUser=await userRepository.create(data);
        return newUser;
    } catch (error) {
        console.log("user Service error",error);
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
                    error:["A user with same email or username already exists"]
                },
                "A user with same email or username already exists"
                );
        }
    }

}

export const signInService=async (data)=>{
    try {
        const user=await userRepository.getByEmail(data.email);
    if(!user){
        throw new clientError(
            {
                explanation:"invalid data sent from client",
                message:"User not found with this email",
                statusCode:StatusCodes.NOT_FOUND,
                error:["User not found"]
            },
            );      
    }
    const isMatch=bcrypt.compareSync(data.password,user.password);
    if(!isMatch){
        throw new clientError(
            {
                explanation:"invalid data sent from client",
                message:"Password is incorrect",
                statusCode:StatusCodes.BAD_REQUEST,
                error:["Password is incorrect"]
            },
            );      
    }
    
    return {
        username:user.username,
        email:user.email,
        avatar:user.avatar,
        // _id:user._id
        token:createToken({id:user._id,email:user.email})
    }

    } catch (error) {
        console.log("user service error",error);
        throw error
    }



}