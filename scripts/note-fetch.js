async function loadNoteArticles(targetId) {
  const RSS_URL = "/api/rss"; // serverless API

  try {
    const res = await fetch(RSS_URL);
    const xmlText = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");

    const items = Array.from(xml.querySelectorAll("item")).slice(0, 12);
    const area = document.getElementById(targetId);

    area.innerHTML = items.map(item => {
      const title = item.querySelector("title")?.textContent ?? "No title";
      const link = item.querySelector("link")?.textContent ?? "#";
      const date = new Date(item.querySelector("pubDate")?.textContent);

      const thumbnail = item.querySelector("media\\:thumbnail")?.getAttribute("url")
        ?? "assets/images/no-image.png";

      const creator = item.querySelector("note\\:creatorName")?.textContent ?? "unknown";
      const creatorImage = item.querySelector("note\\:creatorImage")?.textContent 
        ?? "assets/images/default-icon.png";

      return `
        <a href="${link}" target="_blank" class="note-card">
          <div class="thumb">
            <img src="${thumbnail}" alt="">
          </div>
          <div class="info">
            <h3>${title}</h3>
            <div class="meta">
              <img src="${creatorImage}" class="avatar">
              <span>${creator}</span>
              ・<span>${date.toLocaleDateString()}</span>
            </div>
            <div class="actions">
              <span>♡ 0</span>
              <span>🔖 0</span>
              <span>💬 0</span>
            </div>
          </div>
        </a>
      `;
    }).join("");

  } catch (err) {
    console.error("RSS fetch failed:", err);
  }
}


