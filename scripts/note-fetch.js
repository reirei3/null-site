async function loadNoteArticles(targetId) {
  const RSS_URL = "/api/rss";

  try {
    const res = await fetch(RSS_URL);
    const xmlText = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");

    const items = Array.from(xml.getElementsByTagName("item")).slice(0, 12);
    const area = document.getElementById(targetId);

    area.innerHTML = items.map(item => {
      const title = item.getElementsByTagName("title")[0]?.textContent ?? "No title";
      const link = item.getElementsByTagName("link")[0]?.textContent ?? "#";
      const date = new Date(item.getElementsByTagName("pubDate")[0]?.textContent);

      // ★ 修正したサムネイル取得
      const thumbTag = item.getElementsByTagName("media:thumbnail")[0];
      const thumbnail = thumbTag ? thumbTag.getAttribute("url") : "assets/images/no-image.png";

      // ★ 修正した著者アイコン/著者名
      const creatorName = item.getElementsByTagName("note:creatorName")[0]?.textContent ?? "unknown";
      const creatorImage = item.getElementsByTagName("note:creatorImage")[0]?.textContent
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
              <span>${creatorName}</span>
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

