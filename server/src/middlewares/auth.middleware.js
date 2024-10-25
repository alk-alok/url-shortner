import jwt from "jsonwebtoken";
import users from "../model/user.model.js";

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    // console.log(token);
    if (!token) {
      return res.status(400).json({
        message: "Token missing!",
        valid: false,
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await users.findOne({
        _id:decodedToken._id
    }); 
    // console.log(decodedToken)

    if (!user) {
      return res.status(401).json({
        message: "User not found!",
        valid: false,
      });
    }
    req.user=user;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Invalid Token!",
      valid: false,
    });
  }
}

export default auth;
