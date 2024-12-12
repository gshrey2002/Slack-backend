import user from "../Schema/userSchema.js";
import crudRepo from "./crudRepo.js";

// export const getUserByEmail=async(email)=>{
//     const User=await user.findOne({email});
//     return User;
// }

// export const getUserByName=async(name)=>{
//     const User=await user.findOne({username:name});
//     return User;
// }

// const crudMethod=crudRepo(user);

// export default crudMethod;

function newUserRepo(){
    crudRepo.call(this,user);
}

export default new newUserRepo();