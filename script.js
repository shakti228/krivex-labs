function copyText(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert("Command copied!");
    })
    .catch(() => {
      alert("Copy failed. Please copy manually.");
    });
}
