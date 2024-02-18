//this script will run in an isolated environment
console.log("this is the content script");
// alert("hello");

// Function to extract contacts from the WhatsApp Web DOM

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Check if the action is to run the content script
  if (message.action === "runContentScript") {
    // Call your function to run the content script here
    runContentScript();
  }
});

// Function to run the content script
function runContentScript() {
  // Your content script logic goes here
  console.log("Content script is running!");
  // Send extracted contacts to the background script
  chrome.runtime.sendMessage({
    action: "extractContacts",
    contacts: extractContacts(),
  });
}
// function timeout() {
//   let data = [];
//   setTimeout(() => (data = extractContacts()), 10000);
//   return data;
// }
function extractContacts() {
  const chatListDiv = document.querySelector('div[aria-label="Chat list"]');
  const contacts = [];
  chatListDiv.childNodes.forEach((element) => {
    contacts.push(element.querySelector("span[title]").innerText);
  });
  console.log("titles array", contacts);

  return contacts;
}
