chrome.commands.onCommand.addListener(function(command) {
  if (command === "save-job-link") {
    console.log("Save job link command received");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let url = tabs[0].url;

      // Only save LinkedIn URLs
      if (url.includes("linkedin.com")) {
        console.log("Current LinkedIn URL:", url);

        fetch('http://127.0.0.1:5000/save-job', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({url: url}),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "showNotification", 
            message: "LinkedIn job link saved successfully!"
          });
        })
        .catch((error) => {
          console.error('Error:', error);
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "showNotification", 
            message: "Error saving LinkedIn job link."
          });
        });
      } else {
        console.log("Not a LinkedIn URL, ignoring.");
      }
    });
  }
});
