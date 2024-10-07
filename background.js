// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    sendDataToServer(message.data);
});

function sendDataToServer(data) {
    fetch('{enter your server url}', {  // If you want to get log data at server, revise this line.
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Click event logged successfully:', data);
        })
        .catch(error => {
            console.error('Error logging click event:', error);
        });
}
