import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import ShortUrl from "./src/models/shorturl.model.js";

dotenv.config({ path: "./.env" });

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST route — Create short URL
app.post("/api/create", async (req, res) => {
  try {
    const { url } = req.body; // ✅ expects { "url": "https://..." }

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortUrl = nanoid(7);

    const newUrl = new ShortUrl({
      full_url: url, // ✅ only the string
      short_url: shortUrl,
    });

    const saved = await newUrl.save();

    res.status(201).json({
      message: "Short URL created successfully",
      shortUrl: saved.short_url,
      fullUrl: saved.full_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/:id" ,async(req,res)=>{
    const {id} =req.params
    const url= await ShortUrl.findOne({short_url:id})
    if(url){
        res.redirect(url.full_url)
    }else{
        res.status(404).send("Not Found")
    }
})



// Start server
app.listen(5000, () => {
  connectDB();
  console.log("🚀 Server is running on port 5000");
});
