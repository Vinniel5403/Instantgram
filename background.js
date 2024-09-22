chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchInstagram",
    title: "Search on Instagram: '%s'",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchInstagram" && info.selectionText) {
    const query = info.selectionText.trim();
    const url = `https://www.instagram.com/${encodeURIComponent(query)}`;

    const popupWidth = 600;  
    const popupHeight = 616;  

    
    chrome.windows.getCurrent({}, (currentWindow) => {
      const screenWidth = currentWindow.width;
      const screenHeight = currentWindow.height;

      
      const top = Math.max(0, Math.round((screenHeight - popupHeight) / 2));
      const left = Math.max(0, Math.round((screenWidth - popupWidth) / 2));

    
      chrome.windows.create({
        url: url,
        type: "popup",
        width: popupWidth,
        height: popupHeight,
        top: top,
        left: left,
      });
    });
  }
});
