
console.log('Background script loaded');

const API_ENDPOINT = 'http://127.0.0.1:5000/api/job'; // Update this with your actual server endpoint



function sendToServer(data) {
    return fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(result => {
        console.log('Job details sent successfully:', result);
        return result;
    })
    .catch(error => {
        console.error('Error sending job details to server:', error);
        throw error;
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveJobDetails") {
        sendToServer(message.data)
            .then((serverResponse) => {
                console.log('Server response:', serverResponse);
                sendResponse({ success: true, data: serverResponse });
            })
            .catch((error) => {
                console.error('Error in saveJobDetails:', error);
                sendResponse({ success: false, error: error.message });
            });
        return true; // Indicates that the response will be sent asynchronously
    }
});

// Optional: Log when the background script is loaded
console.log('Background script (worker.js) loaded');