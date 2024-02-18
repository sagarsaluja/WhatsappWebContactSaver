// popup.js

document.addEventListener("DOMContentLoaded", function () {
  const runContentScriptButton = document.getElementById("runContentScript");
  console.log("loaded");

  // Add click event listener to the button
  runContentScriptButton.addEventListener("click", function () {
    console.log("button clicked");
    // Send a message to the content script to run
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "runContentScript" });
    });
  });
});
