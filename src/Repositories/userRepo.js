import user from "../Schema/userSchema.js";
// import user from "../Schema/userSchema.js";
import crudRepo from "./crudRepo.js";

const userRepository={
...crudRepo(user),
getByEmail:async function (email){
    const user=await user.findOne({email});
    return user;

},
getByUsername:async function (username){
    const user=await user.findOne({username}).select("-password");
    return user;
}, 
}

export default userRepository