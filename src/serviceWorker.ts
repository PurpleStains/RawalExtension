import { initializeStorageWithDefaults } from './storage';

chrome.runtime.onInstalled.addListener(async () => {
  // Here goes everything you want to execute after extension initialization

  await initializeStorageWithDefaults({});

  console.log('Extension successfully installed!');
});

// Log storage changes, might be safely removed
chrome.storage.onChanged.addListener((changes) => {
  for (const [key, value] of Object.entries(changes)) {
    console.log(
      `"${key}" changed from "${value.oldValue}" to "${value.newValue}"`,
    );
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "log") {
      console.log("Log", request.value)
      return true;
  }
});

// Run content script
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const matches = [
      "https://panel-g.baselinker.com/orders.php",
      "https://panel-e.baselinker.com/orders.php"
  ];

  if (changeInfo.status === "complete" && matches.some((match) => tab.url?.includes(match))) {
      // Replace 'example.com' with your target domain
      console.log("Page loaded:", tab.url);
      // You can inject the content script dynamically if needed
      chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["contentScript.js"],
      });
  }
});