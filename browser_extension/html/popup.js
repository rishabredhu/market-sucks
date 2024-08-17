//receives message from content.js and listens for user actions
document.addEventListener('DOMContentLoaded', function() {
    const extractBtn = document.getElementById('extractBtn');
    const statusElement = document.getElementById('status');
    const previewForm = document.getElementById('previewForm');
    const confirmBtn = document.getElementById('confirmBtn');



    extractBtn.addEventListener('click', function() {
        statusElement.textContent = 'User Initiating Job Details Extraction...';
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const activeTab = tabs[0];

            //sending message to content.js
            chrome.tabs.sendMessage(activeTab.id, {"message": "extract_job_details"}, function(response) {
                if (chrome.runtime.lastError) {
                    statusElement.textContent = 'Error: ' + chrome.runtime.lastError.message;
                } else if (response && response.success) {
                    statusElement.textContent = 'Job details extracted. Please review and confirm.';
                    document.getElementById('jobTitle').value = response.data.title || '';
                    document.getElementById('location').value = response.data.location || '';
                    document.getElementById('description').value = response.data.fullDescription || '';
                    extractBtn.classList.add('hidden');
                    previewForm.classList.remove('hidden');
                } else {
                    statusElement.textContent = 'Failed to extract job details.', response.error || '';
                }
            });

        });
    });


    //previewing and reviewing the job details
    previewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const jobDetails = {
            title: document.getElementById('jobTitle').value,
            location: document.getElementById('location').value,
            description: document.getElementById('description').value,
            url: '' // We'll need to get this from the active tab
        };

        statusElement.textContent = 'Saving job details...';
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            jobDetails.url = tabs[0].url;
            chrome.runtime.sendMessage({action: "saveJobDetails", data: jobDetails}, function(response) {
                if (response && response.success) {
                    statusElement.textContent = 'Job details saved successfully!';
                    previewForm.classList.add('hidden');
                    extractBtn.classList.remove('hidden');
                    extractBtn.textContent = 'Extract Another Job';
                } else {
                    statusElement.textContent = 'Failed to save job details: ' + (response ? response.error : 'Unknown error');
                }
            });
        });
    });
});
