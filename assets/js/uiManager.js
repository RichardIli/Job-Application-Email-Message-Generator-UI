// js/uiManager.js

const composeBtn = document.getElementById('composeBtn');
const composeBtnText = document.getElementById('composeBtnText');
const composeIcon = document.getElementById('composeIcon');
const composeLoader = document.getElementById('composeLoader');
const statusMessage = document.getElementById('statusMessage');

const sendBtn = document.getElementById('sendBtn');
const sendBtnText = document.getElementById('sendBtnText');
const sendIcon = document.getElementById('sendIcon');
const sendLoader = document.getElementById('sendLoader');

const sendResultModal = document.getElementById('sendResultModal');
const sendResultTitle = document.getElementById('sendResultTitle');
const sendResultMessage = document.getElementById('sendResultMessage');
const sendResultIconSuccess = document.getElementById('sendResultIconSuccess');
const sendResultIconError = document.getElementById('sendResultIconError');

/**
 * Updates the state of the compose button based on user input.
 * @param {File | null} uploadedFile The currently uploaded file.
 * @param {string} jobDetailsText The text in the job details textarea.
 */
export const updateComposeButtonState = (uploadedFile, jobDetailsText) => {
    const isInputReady = uploadedFile || jobDetailsText.trim() !== '';
    composeBtn.disabled = !isInputReady;
};

/**
 * Sets the UI state for the compose process.
 * @param {'initial' | 'loading' | 'loaded' | 'error'} state The state to set.
 */
export const setComposeState = (state) => {
    switch (state) {
        case 'initial':
            composeIcon.classList.remove('hidden');
            composeLoader.classList.add('hidden');
            composeBtnText.textContent = 'Compose Email';
            statusMessage.textContent = 'Ready to compose your email.';
            statusMessage.classList.remove('text-red-500');
            break;
        case 'loading':
            composeBtn.disabled = true;
            composeIcon.classList.add('hidden');
            composeLoader.classList.remove('hidden');
            composeBtnText.textContent = 'Composing...';
            statusMessage.textContent = '';
            statusMessage.classList.remove('text-red-500');
            break;
        case 'loaded':
            composeBtn.disabled = false;
            composeIcon.classList.remove('hidden');
            composeLoader.classList.add('hidden');
            composeBtnText.textContent = 'Compose Email';
            statusMessage.textContent = 'Email drafted. Review and send.';
            break;
        case 'error':
            composeBtn.disabled = false;
            composeIcon.classList.remove('hidden');
            composeLoader.classList.add('hidden');
            composeBtnText.textContent = 'Compose Email';
            statusMessage.textContent = 'Failed to compose email. Please check the API and try again.';
            statusMessage.classList.add('text-red-500');
            break;
    }
};

/**
 * Sets the UI state for the sending process.
 * @param {'initial' | 'loading' | 'success' | 'error'} state The state to set.
 */
export const setSendState = (state) => {
    switch (state) {
        case 'initial':
            sendBtn.disabled = false;
            sendIcon.classList.remove('hidden');
            sendLoader.classList.add('hidden');
            sendBtnText.textContent = 'Send Email';
            break;
        case 'loading':
            sendBtn.disabled = true;
            sendIcon.classList.add('hidden');
            sendLoader.classList.remove('hidden');
            sendBtnText.textContent = 'Sending...';
            break;
        case 'success':
            sendResultIconSuccess.classList.remove('hidden');
            sendResultIconError.classList.add('hidden');
            sendResultTitle.textContent = 'Email Sent Successfully!';
            sendResultMessage.textContent = 'Your application email has been sent.';
            sendResultModal.classList.remove('hidden');
            break;
        case 'error':
            sendResultIconSuccess.classList.add('hidden');
            sendResultIconError.classList.remove('hidden');
            sendResultTitle.textContent = 'Failed to Send Email';
            sendResultMessage.textContent = 'There was an error sending your email. Please try again.';
            sendResultModal.classList.remove('hidden');
            break;
    }
};