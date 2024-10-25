import users from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const getUser = async (req, res)=>{
    try {
        const user = await users.findOne({
            email:req.user.email
        });

        return res.status(200).json({
            message:user,
            valid:true
        });
    } catch (err) {
        return res.status(500).json({
            message:"Internal Server Error",
            valid:false
        });
    }
}

const signupUser = async (req, res) => {
    try {
        // console.log(req.body);
        const {name, email, mobile, password} = req.body;

        if(!name?.trim() || !email?.trim() || !password?.trim()){
            return res.status(400).json({
                message:"All fields are required!",
                valid:false
            })
        };
        if(mobile && mobile.length!=10){
            return res.status(400).json({
                message:"Please provide correct mobile number.",
                valid:false
            })
        }

        const userFind = await users.findOne({
            email:email
        });

        if(userFind){
            return res.status(400).json({
                message:"User already present, Please login!",
                valid:false
            })
        }

        // const hashedPassword = await bcrypt.hash(password, 10);

        // console.log(hashedPassword)
        const user = await users.create({
            name,
            email,
            mobile,
            password
        });

        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

        return res.status(200).json({
            message:"Signup successfull!",
            token,
            valid:true
        });

    } catch (err) {
        console.log("Error in signupUser", err.message);
        return res.status(500).json({
            message:"Internal Server Error",
            valid:false
        })
    }
}

const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body;

        if(!email.trim() || !password.trim()){
            return res.status(400).json({
                message:"All fields are required!",
                valid:false
            })
        }

        const user = await users.findOne({
            email:email
        });

        if(!user){
            return res.status(400).json({
                message:"User not found!",
                valid:true
            })
        }

        const validatePassword = await bcrypt.compare(password, user.password);
        // console.log(validatePassword)

        if(!validatePassword){
            return res.status(400).json({
                message:"Wrong password!",
                valid:true
            })
        }

        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);

        return res.status(200).json({
            message:"Login Successfull!",
            valid:true,
            token:token
        })
    } catch (err) {
        return res.status(500).json({
            message:"Internal Server Error",
            valid:false
        })
    }
}

export {getUser, signupUser, loginUser}