chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "extract_job_details") {
        // Define the selectors for different platforms
        let jobDetails = {};
        const workdaySelectors = {
            title: 'h2[data-automation-id="jobPostingTitle"]',
            company: 'div[data-automation-id="company"]',
            description: 'div[data-automation-id="jobDescription"]'
        };
        const jobLevelSelectors = {
            title: 'h1.job-title',
            company: 'div.company-name',
            description: 'div.job-description'
        };
        const greenhouseSelectors = {
            title: 'h1.title',
            company: 'div.company',
            description: 'div.description'
        };
        const indeedSelectors = {
            title: 'h1.jobsearch-JobInfoHeader-title',
            company: 'div.icl-u-lg-mr--sm.icl-u-xs-mr--xs',
            description: 'div#jobDescriptionText'
        };

        // Function to extract details based on selectors
        function extractDetails(selectors) {
            return {
                title: document.querySelector(selectors.title)?.textContent.trim(),
                company: document.querySelector(selectors.company)?.textContent.trim(),
                description: document.querySelector(selectors.description)?.textContent.trim()
            };
        }

        // Determine which platform we're on by checking for unique elements
        if (document.querySelector(workdaySelectors.title)) {
            jobDetails = extractDetails(workdaySelectors);
        } else if (document.querySelector(jobLevelSelectors.title)) {
            jobDetails = extractDetails(jobLevelSelectors);
        } else if (document.querySelector(greenhouseSelectors.title)) {
            jobDetails = extractDetails(greenhouseSelectors);
        } else if (document.querySelector(indeedSelectors.title)) {
            jobDetails = extractDetails(indeedSelectors);
        }

        // Check if all details were successfully extracted
        if (jobDetails.title && jobDetails.company && jobDetails.description) {
            sendResponse({success: true, data: jobDetails});
        } else {
            sendResponse({success: false});
        }

        return true; // Keeps the message channel open for asynchronous response
    }
});
