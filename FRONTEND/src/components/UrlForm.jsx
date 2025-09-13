import React, { useState } from "react";
import axios from "axios";
import { createShortUrl } from "../api/shortUrl.api";

const UrlForm = () => {
  const [url, setValue] = useState("https://www.google.com/");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await createShortUrl(url);
    setShortUrl(response.shortUrl); // <-- use property from backend
    setCopied(false);
  } catch (error) {
    console.error("Error shortening URL:", error);
  }
};




  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2s
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto mt-10">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
        🔗 Link Shortener
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="url"
            className="block text-gray-700 font-medium mb-2"
          >
            Enter your long URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={url}
            onChange={(event) => setValue(event.target.value)}
            placeholder="https://example.com/very/long/url"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition"
        >
          Shorten URL
        </button>
      </form>

      {/* Result just below button */}
      {shortUrl && (
        <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-lg flex items-center justify-between">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline break-all"
          >
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className="ml-3 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm"
          >
            {copied ? "✅ Copied" : "📋 Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
