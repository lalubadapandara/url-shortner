import ShortUrl from "../models/shorturl.model.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  try {
    const newUrl = new ShortUrl({
      full_url: longUrl,
      short_url: shortUrl,
    });

    if (userId) {
      newUrl.userId = userId;
    }

    await newUrl.save();
  } catch (err) {
    throw new Error("Failed to save URL: " + err.message);
  }
};

export const getShortUrl = async (shortUrl) => {
  try {
    const url = await ShortUrl.findOneAndUpdate(
      { short_url: shortUrl },
      { $inc: { clicks: 1 } }
    );
    if (!url) {
      throw new Error("Short URL not found");
    }
    return url;
  } catch (err) {
    throw new Error("Failed to retrieve URL: " + err.message);
  }
};
