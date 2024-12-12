import userRepository from "../Repositories/userRepo.js"
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