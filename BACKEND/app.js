import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import ShortUrl from "./src/models/shorturl.model.js";
import short_url from "./src/routes/short_url.route.js"
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
dotenv.config({ path: "./.env" });

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST route — Create short URL
app.use("/api/create",short_url)

app.get("/:id" ,redirectFromShortUrl)



// Start server
app.listen(5000, () => {
  connectDB();
  console.log("🚀 Server is running on port 5000");
});
