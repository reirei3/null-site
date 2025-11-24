import { fetch } from 'undici';

export default async function handler(req, res) {
  const rssUrl = "https://note.com/1807692t2/rss";

  try {
    const response = await fetch(rssUrl);
    const text = await response.text();

    res.setHeader("Content-Type", "application/xml; charset=UTF-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(text);
  } catch (error) {
    console.error("RSS fetch failed:", error);
    res.status(500).json({ error: "Failed to fetch RSS" });
  }
}
