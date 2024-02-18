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

function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

function extractContacts() {
  const contacts = [];
  const sidePane = document.getElementById("pane-side");

  // Function to fill contacts
  function fillContacts() {
    const contactElements = document.querySelector(
      'div[aria-label="Chat list"]'
    ).childNodes;

    contactElements.forEach((element) => {
      const contactTitle = element.querySelector("span[title]").innerText;
      if (!contacts.includes(contactTitle)) {
        contacts.push(contactTitle);
      }
    });
  }

  // Function to scroll and fill contacts
  function scrollAndFillContacts() {
    sidePane.scrollTop += 650; // Adjust the scroll amount as needed

    // Wait for a brief moment for contacts to load
    setTimeout(() => {
      fillContacts();
      // Check if more contacts have been loaded
      console.log(contacts);
      if (
        sidePane.scrollTop < sidePane.scrollHeight &&
        sidePane.scrollTop < sidePane.scrollHeight - 1000
      ) {
        // If more contacts are expected, scroll and fill contacts again
        scrollAndFillContacts();
      } else {
        // If all contacts are loaded, log and return contacts
        console.log("Titles array:", contacts);
      }
    }, 1000); // Adjust the delay according to your page loading time
  }

  // Create a MutationObserver to detect changes in the side panel
  const observer = new MutationObserver((mutationsList) => {
    // Fill contacts when mutations occur
    fillContacts();
  });

  // Start observing mutations in the side panel
  observer.observe(sidePane, { childList: true, subtree: true });

  // Start scrolling and filling contacts
  scrollAndFillContacts();

  return contacts;
}
