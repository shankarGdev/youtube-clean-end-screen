chrome.browserAction.disable();

var cleanEndScreen = false;

chrome.browserAction.onClicked.addListener(function(tab) { 
	cleanEndScreen = !cleanEndScreen;
	 setEndScreen();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (tab.url.includes("youtube.com")) {
		chrome.browserAction.enable(tabId);
    	setEndScreen();
	}
	else{
    	chrome.browserAction.setBadgeText({ text: '' });
	}
});

function setEndScreen(){
	var badgeBg = cleanEndScreen ? 'green' : 'red';
	var badgeText = cleanEndScreen ? 'On' : 'Off';

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {cleanEndScreen: cleanEndScreen}, function(response) {
            chrome.browserAction.setBadgeBackgroundColor({ color: badgeBg }); 
    		chrome.browserAction.setBadgeText({ text: badgeText });
        });
    });
}