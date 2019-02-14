chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    var displayProp = request.cleanEndScreen ? 'none' : 'block';

    document.querySelectorAll('.ytp-ce-element').forEach(function(node){
    	node.style.display = displayProp;
    });

    sendResponse({result: "success"});
});
