import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlWithoutUser } from "../services/short_url.service.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      res.status(400);
      throw new Error("URL is required");
    }

    const shortUrl = await createShortUrlWithoutUser(url);
    res.status(201).json({ shortUrl: `${process.env.APP_URL}/${shortUrl}` });

  } catch (err) {
    next(err);
  }
};

export const redirectFromShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = await getShortUrl(id);
    res.redirect(url.full_url);
  } catch (err) {
    next(err);
  }
};
