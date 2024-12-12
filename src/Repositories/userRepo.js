import user from "../Schema/userSchema";
import crudRepo from "./crudRepo";

export const getUserByEmail=async(email)=>{
    const User=await user.findOne({email});
    return User;
}

export const getUserByName=async(name)=>{
    const User=await user.findOne({username:name});
    return User;
}

const crudMethod=crudRepo(user);

export default crudMethod;

