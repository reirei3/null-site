async function loadNoteArticles(targetId) {
  const RSS_URL = "https://note.com/1807692t2/rss";

  const res = await fetch(RSS_URL);
  const xmlText = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "text/xml");

  const items = Array.from(xml.querySelectorAll("item")).slice(0, 12);

  const area = document.getElementById(targetId);

  area.innerHTML = items.map(item => {
    const title = item.querySelector("title").textContent;
    const link = item.querySelector("link").textContent;
    const date = new Date(item.querySelector("pubDate").textContent);

    return `
      <a href="${link}" target="_blank" class="card">
        <h3>${title}</h3>
        <p>${date.toLocaleDateString()}</p>
      </a>
    `;
  }).join("");
}
