document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const input = document.getElementById("search-input");

  searchBtn.addEventListener("click", () => {
    const userInput = input.value.trim();

    if (!userInput) {
      alert("Please enter a search term.");
      return;
    }

    const encodedSearch = encodeURIComponent(userInput);
    const searchUrl = `https://cheapgraphicnovels.com/?target=search&mode=append&substring=${encodedSearch}&including=all&sortBy=translations.name&sortOrder=asc&itemsPerPage=200&filter_availability=HIDE%20OUT%20OF%20STOCK%20ITEMS!`;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;

      chrome.tabs.update(tabId, { url: searchUrl }, () => {
        chrome.tabs.onUpdated.addListener(function listener(updatedTabId, info) {
          if (updatedTabId === tabId && info.status === "complete") {
            chrome.tabs.onUpdated.removeListener(listener);

            chrome.scripting.executeScript({
              target: { tabId },
              files: ["filterProducts.js"]
            }, () => {
              chrome.tabs.sendMessage(tabId, { searchTerm: userInput });
            });
          }
        });
      });
    });
  });
});
