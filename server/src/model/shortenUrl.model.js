import mongoose from "mongoose";

const shortenUrl = new mongoose.Schema({
    originalUrl:{
        type:String,
        requied:true
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    countClick:{
        type:Number,
        default:0
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export default mongoose.model('url', shortenUrl);