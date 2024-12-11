import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:[true,"Email is required"],
            unique:[true,"Email already exists"],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],

        },
        password:{
            type:String,
            required:[true,"Password is required"],
            // unique:[true,"Password already exists"],
        },
        username:{
            type:String,
            required:[true,"Username is required"],
            unique:[true,"Username already exists"],
            match:[/^[a-zA-Z0-9]+$/, 'Please fill a valid username'],
        },
        avatar:{
            type:String
        }

},{timestamps:true});

userSchema.pre("save",function saveUser(next){
const user=this;
 user.avatar=`https://robohash.org/${user.username}.png`;
 next();
});

const user=mongoose.model("User",userSchema);

export default user