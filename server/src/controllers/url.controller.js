import urls from "../model/shortenUrl.model.js";
import { nanoid } from "nanoid";

async function shortUrl(req, res) {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl.trim()) {
      return res.status(400).json({
        message: "Please Enter a valid URL.",
        valid: false,
      });
    }

    const urlCode = nanoid(7);

    const url = new urls({
      originalUrl: originalUrl,
      shortUrl: urlCode,
      userId: req?.user?._id,
    });

    await url.save();

    return res.status(200).json({
      message: "Url created successfully",
      shortUrl: `http://localhost:8000/${urlCode}`,
      valid: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      valid: false,
    });
  }
}

async function redirectUrl(req, res) {
  try {
    const {shortUrl} = req.params;

    // console.log(shortUrl)

    const urlRecord = await urls.findOne({shortUrl:shortUrl});
    if(!urlRecord){
        return res.status(400).json({
            message:"Url not found!",
            valid:false
        })
    }

    urlRecord.countClick+=1;
    const newUrlRecord = new urls(urlRecord);
    newUrlRecord.save();

    return res.redirect(urlRecord.originalUrl);

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      Error: error.message,
      valid: false,
    });
  }
}

async function listOfLinks(req, res){
  try {
      const links = await urls.find({
        userId:req?.user?._id
      })

      const finalArr = [];
      for(let link of links){
        const obj = {
          originalUrl:link.originalUrl,
          shortUrl:`http://localhost:8000/${link.shortUrl}`,
          countClick:link.countClick
        }
        finalArr.push(obj);
      }

      return res.status(200).json({
        message:finalArr,
        valid:true
      })
  } catch (error) {
      return res.status(500).json({
          message:"Internal Server Error",
          error:error.message,
          valid:false
      })
  }
}

export { shortUrl, redirectUrl, listOfLinks };