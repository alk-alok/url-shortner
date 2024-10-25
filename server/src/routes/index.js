import express from "express";
import { getUser, loginUser, signupUser } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";
import { listOfLinks, redirectUrl, shortUrl } from "../controllers/url.controller.js";

const router = express.Router();

router.get("/api", (req, res)=>{
    // console.log("Hi there! I am Alok Kumar.")
    return res.status(200).json({
        message:"Request is running!",
        valid:true
    })
})

router.post("/api/signup-user", signupUser);
router.post("/api/login-user", loginUser);
router.post("/api/short-url", auth, shortUrl);
router.get("/:shortUrl", redirectUrl);
router.get("/api/get-users", auth, getUser);
router.get("/api/list-of-links", auth, listOfLinks);

export default router;