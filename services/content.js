(function () {
  const searchTerm = "Fantastic Four Omnibus";

  const input = document.querySelector('input[name="substring"]');
  if (input) {
    input.value = searchTerm;
    input.dispatchEvent(new Event("input", { bubbles: true }));

    // Find the form element
    const form = input.closest("form");
    if (form) {
      form.submit();  // Submits the search form!
      console.log("✅ Form submitted with search term:", searchTerm);
    } else {
      console.warn("⚠️ Could not find form to submit.");
    }
  } else {
    console.warn("⚠️ Search input field not found.");
  }
})();
