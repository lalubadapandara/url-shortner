import ShortUrl from "../models/shorturl.model.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    const newUrl = new ShortUrl({
        full_url: longUrl,  // ✅ use longUrl
        short_url: shortUrl,
    });

    if (userId) {
        newUrl.userId = userId;
    }

    await newUrl.save(); // ✅ always await save for async consistency
}

export const getShortUrl = async (shortUrl) => {
    return await ShortUrl.findOneAndUpdate(
        { short_url: shortUrl },
        { $inc: { clicks: 1 } }
    );
}
