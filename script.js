const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(`Cannot find the element ${selector}`);
};
const form = selectElement("form");
const input = selectElement("input");
const result = selectElement(".result");
const hamburger = selectElement(".hamburger");
const navMenu = selectElement(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});


form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = input.value.trim();

  if (!url) return alert("Please enter a URL");

  const shortUrl = await shortenUrl(url);

  if (!shortUrl) return;

  const newUrl = document.createElement("div");
  newUrl.classList.add("item");
  newUrl.innerHTML = `
    <p>${shortUrl}</p>
    <button class="newUrl-btn">Copy</button>
  `;

  result.prepend(newUrl);

  const copyBtn = newUrl.querySelector(".newUrl-btn");
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(shortUrl);
    copyBtn.textContent = "Copied!";
  });

  input.value = "";
});

async function shortenUrl(longUrl) {
  const accessToken = "a33a494dd7d20ef517f699a476d8709ed4cbe972";
  const apiUrl = "https://api-ssl.bitly.com/v4/shorten";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        long_url: longUrl,
        domain: "bit.ly",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to shorten URL");
    }

    const data = await response.json();
    return data.link; // shortened URL
  } catch (error) {
    console.error("ERROR:", error);
    alert("Something went wrong! Please check the URL or your connection.");
    return null;
  }
}