// app.js

import {
    composeEmail,
    sendEmail
} from './apiService.js';
import {
    updateComposeButtonState,
    setComposeState,
    setSendState
} from './uiManager.js';
import {
    openComposeModal,
    closeModal
} from './modalManager.js';
import {
    setupFileListeners
} from './fileHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const jobDetailsTextarea = document.getElementById('jobDetailsText');
    const additionalNotesTextarea = document.getElementById('additionalNotes');
    const composeBtn = document.getElementById('composeBtn');
    const sendBtn = document.getElementById('sendBtn');
    const closeComposeModalBtn = document.getElementById('closeComposeModal');
    const emailToInput = document.getElementById('emailTo');
    const emailSubjectInput = document.getElementById('emailSubject');
    const emailTextarea = document.getElementById('emailText');

    // --- State Variables ---
    let uploadedFile = null;
    let composedEmailData = null;

    // --- Helper Functions to bridge modules ---
    const setUploadedFile = (file) => {
        uploadedFile = file;
    };

    const handleComposeButtonState = () => {
        updateComposeButtonState(uploadedFile, jobDetailsTextarea.value);
    };

    // --- Event Handlers ---
    const handleComposeEmail = async () => {
        setComposeState('loading');
        try {
            const data = await composeEmail(uploadedFile, jobDetailsTextarea.value, additionalNotesTextarea.value);
            composedEmailData = data;
            setComposeState('loaded');
            openComposeModal(data);
        } catch (error) {
            console.error('Failed to compose email:', error);
            setComposeState('error');
        }
    };

    const handleSendEmail = async () => {
        setSendState('loading');

        const dataToSend = {
            to: emailToInput.value,
            subject: emailSubjectInput.value,
            text: emailTextarea.value,
        };

        try {
            await sendEmail(dataToSend);
            setSendState('success');
            // closeModal('composeModal'); // <-- Add this line here
        } catch (error) {
            console.error('Failed to send email:', error);
            setSendState('error');
        }
    };

    // clear the details after closoing the modal
    const clearInputs = () => {
        uploadedFile = null;
        jobDetailsTextarea.value = '';
        additionalNotesTextarea.value = '';
        document.getElementById('fileInput').value = ''; // Reset the file input
        document.getElementById('fileStatus').classList.add('hidden');
        handleComposeButtonState(); // Update the button state after clearing
    };

    // --- Initialization ---
    // Pass state management functions to the file handler
    setupFileListeners(setUploadedFile, handleComposeButtonState);

    // Button click events
    composeBtn.addEventListener('click', handleComposeEmail);
    sendBtn.addEventListener('click', handleSendEmail);
    closeComposeModalBtn.addEventListener('click', () => {
        closeModal('composeModal');
        setComposeState('initial');
    });

    // The global `closeModal` function
    window.closeModal = (modalId) => {
        closeModal(modalId);
        // Reset states after modal is closed
        if (modalId === 'composeModal') {
            setComposeState('initial');
        }
        setSendState('initial');

        // clear the inputs if the send result modal is closed
        if (modalId === 'sendResultModal') {
            clearInputs();
        }
    };

    // Initial state update
    handleComposeButtonState();
});