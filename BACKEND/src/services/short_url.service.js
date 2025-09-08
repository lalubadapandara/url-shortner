import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutUser = async (url) => {
  try {
    const shortUrl = await generateNanoId(7);
    await saveShortUrl(shortUrl, url);
    return shortUrl;
  } catch (err) {
    throw new Error("Failed to create short URL: " + err.message);
  }
};

export const createShortUrlWithUser = async (url, userId) => {
  try {
    const shortUrl = await generateNanoId(7);
    await saveShortUrl(shortUrl, url, userId);
    return shortUrl;
  } catch (err) {
    throw new Error("Failed to create short URL for user: " + err.message);
  }
};
