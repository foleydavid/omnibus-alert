chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const searchTerm = message.searchTerm?.toLowerCase();
  if (!searchTerm) return;

  console.log("Filtering for:", searchTerm);

  const productCells = document.querySelectorAll("li.product-cell");

  productCells.forEach((cell) => {
    const nameElement = cell.querySelector("a.fn.url");
    const title = nameElement?.innerText.toLowerCase() || "";

    if (!title.includes(searchTerm)) {
      cell.style.display = "none";
    }
  });
});
