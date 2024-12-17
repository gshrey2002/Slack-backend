import user from "../Schema/userSchema.js";
// import user from "../Schema/userSchema.js";
import crudRepo from "./crudRepo.js";

const userRepository={
...crudRepo(user),
getByEmail:async function (email){
    const User=await user.findOne({email});
    return User;

},
getByUsername:async function (username){
    const User=await user.findOne({username}).select("-password");
    return User;
}, 
}

export default userRepository