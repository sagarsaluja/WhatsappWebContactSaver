// background.js

// Listener for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extractContacts") {
    // Perform further actions with the extracted contacts
    console.log("hehehe");
    console.log("Extracted contacts:", message.contacts);
    // You can save the contacts to storage or send them to a server here
  }
});
