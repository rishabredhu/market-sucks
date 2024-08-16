chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.message === "getUrl") {

        for (var elements = document.querySelectorAll("a:link:not([href^=javascript])"), links = new Array(elements.length), i = 0; i < elements.length; i++) links[i] = {
            hash: elements[i].hash,
            host: elements[i].host,
            hostname: elements[i].hostname,
            href: elements[i].href,
            pathname: elements[i].pathname,
            search: elements[i].search,
            text: elements[i].text
        }
        sendResponse(links)
    }

})