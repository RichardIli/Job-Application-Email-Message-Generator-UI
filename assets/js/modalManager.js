// js/modalManager.js

const composeModal = document.getElementById('composeModal');
const emailToInput = document.getElementById('emailTo');
const emailSubjectInput = document.getElementById('emailSubject');
const emailTextarea = document.getElementById('emailText');
const actionNeededElement = document.getElementById('actionNeededMessage');

/**
 * Fills and opens the compose email modal.
 * @param {object} data The email data to populate the modal with.
 * @param {string} data.to The recipient's email address.
 * @param {string} data.subject The email subject.
 * @param {string} data.text The email body.
 * @param {string} [data.actionNeeded] Optional action needed message.
 */
export const openComposeModal = (data) => {
    emailToInput.value = data.to || '';
    emailSubjectInput.value = data.subject || '';
    emailTextarea.value = data.text || '';

    // Check for and display the actionNeeded message
    if (data.actionNeeded) {
        actionNeededElement.textContent = `Action Needed: ${data.actionNeeded}`;
        actionNeededElement.classList.remove('hidden');
    } else {
        actionNeededElement.textContent = '';
        actionNeededElement.classList.add('hidden');
    }

    composeModal.classList.remove('hidden');
};

/**
 * Closes a specified modal.
 * @param {string} modalId The ID of the modal element to close.
 */
export const closeModal = (modalId) => {
    document.getElementById(modalId).classList.add('hidden');
};