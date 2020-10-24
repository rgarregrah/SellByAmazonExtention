let status = true;

chrome.browserAction.onClicked.addListener((tab) => {
    if (status) {
        chrome.browserAction.setIcon({ path: "../icon/32-off.png" });
    } else {
        chrome.browserAction.setIcon({ path: "../icon/32-on.png" });
    }
    status = !status;

    if (urlCheck(tab.url)) {
        if (status) {
            chrome.tabs.update(tab.id, { url: tab.url + "&rh=p_6%3AAN1VRQENFRJN5" });
        } else {
            let tmpUrl = tab.url;
            tmpUrl = tmpUrl.replace(/&rh=p_6%3AAN1VRQENFRJN5/g, "");
            chrome.tabs.update(tab.id, { url: tmpUrl });
        }
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== "loading") {
        return;
    }
    if (status) {
        if (urlCheck(tab.url) && queryCheck(tab.url)) {
            chrome.tabs.update(tab.id, { url: tab.url + "&rh=p_6%3AAN1VRQENFRJN5" });
        }
    }
});

const urlCheck = (url) => {
    if (url.match(/https?:\/\/www\.amazon\.co\.jp\/s/) === null) {
        return false;
    }
    return true;
};

const queryCheck = (url) => {
    if (url.match(/&rh=p_6%3AAN1VRQENFRJN5/) !== null) {
        return false;
    }
    return true;
};