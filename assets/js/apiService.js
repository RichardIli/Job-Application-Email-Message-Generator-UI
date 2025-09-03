// js/apiService.js

// Define the base URL for your API

const API_BASE_URL = 'http://localhost:3000/api';


/**
 * Handles the API call to compose an email.
 * @param {File | null} uploadedFile The file to upload, or null if text is used.
 * @param {string} jobDetailsText The job details text.
 * @param {string} additionalNotesText The additional notes text.
 * @returns {Promise<object>} A promise that resolves with the composed email data.
 */
export const composeEmail = async (uploadedFile, jobDetailsText, additionalNotesText) => {
    const formData = new FormData();
    if (uploadedFile) {
        formData.append('jobDetailsFile', uploadedFile);
    } else {
        formData.append('jobDetails', jobDetailsText);
    }
    formData.append('notes', additionalNotesText);

    const response = await fetch(`${API_BASE_URL}/compose-email`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

/**
 * Handles the API call to send an email.
 * @param {object} emailData The email data to send.
 * @param {string} emailData.to The recipient's email address.
 * @param {string} emailData.subject The email subject.
 * @param {string} emailData.text The email body.
 * @returns {Promise<void>} A promise that resolves when the email is successfully sent.
 */
export const sendEmail = async (emailData) => {
    const response = await fetch(`${API_BASE_URL}/sendEmail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
};