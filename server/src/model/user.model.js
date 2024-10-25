import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:false
    }
}, {timestamps:true});

userSchema.pre("save", async function incryptPassword(next){
    if(this.isModified('password')){
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password=hashedPassword;
    }
    next();
});


export default mongoose.model('user', userSchema);