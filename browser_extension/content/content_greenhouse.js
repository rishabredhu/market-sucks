// content.js - Comprehensive Job Content Scraper for Labelbox job postings
console.log('Content script loaded for Greenhouse job board');
function scrapeJobContent() {
    const jobInfo = {};

    // Find the main job content div
    const jobContentDiv = document.querySelector('.job_content');

    if (jobContentDiv) {
        // Scrape job title
        jobInfo.title = jobContentDiv.querySelector('.job_title h1')?.textContent.trim() || 'Job Title Not Found';

        // Scrape location
        jobInfo.location = jobContentDiv.querySelector('.job_title .body--metadata')?.textContent.trim() || 'Location Not Found';

        // Scrape the entire job description
        jobInfo.fullDescription = '';
        const descriptionBody = jobContentDiv.querySelector('.job_description.body');
        if (descriptionBody) {
            jobInfo.fullDescription = Array.from(descriptionBody.childNodes)
                .map(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.tagName === 'UL') {
                            return Array.from(node.querySelectorAll('li'))
                                .map(li => '• ' + li.textContent.trim())
                                .join('\n');
                        } else {
                            return node.textContent.trim();
                        }
                    }
                    return '';
                })
                .filter(text => text.length > 0)
                .join('\n\n');
        }

        // Scrape any additional sections (like "Apply" button, if present)
        jobInfo.applyButton = jobContentDiv.querySelector('.btn.btn--pill')?.textContent.trim() || 'Apply button not found';
    } else {
        jobInfo.error = 'Job content div not found';
    }

    console.log('Scraped Job Information:', jobInfo);
    return jobInfo;
}

// Run the scraper when the page is fully loaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scrapeJobContent);
} else {
//     scrapeJobContent();
// }

// Listen for messages from the popup.js
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "extract_job_details") {
            const jobData = scrapeJobContent();
            sendResponse({success: true, data: jobData});
        }
        return true;// Indicates that the response will be sent asynchronously

    });

}