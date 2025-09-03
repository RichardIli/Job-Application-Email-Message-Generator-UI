// js/fileHandler.js

const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const jobDetailsTextarea = document.getElementById('jobDetailsText');
const fileStatus = document.getElementById('fileStatus');

/**
 * Binds all file handling event listeners.
 * @param {function(File | null): void} setFileCallback Callback to set the uploaded file in the main app.
 * @param {function(): void} updateButtonCallback Callback to update the compose button state.
 */
export const setupFileListeners = (setFileCallback, updateButtonCallback) => {
    // Drag and Drop functionality
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('border-blue-500');
    });

    dropzone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('border-blue-500');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('border-blue-500');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            setFileCallback(file);
            jobDetailsTextarea.value = ''; // Clear text
            fileStatus.textContent = `File Selected: ${file.name}`;
            fileStatus.classList.remove('hidden');
            updateButtonCallback();
        }
    });

    // Paste functionality
    dropzone.addEventListener('paste', (e) => {
        e.preventDefault();
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        let fileFound = false;
        for (const item of items) {
            if (item.kind === 'file' && item.type.startsWith('image/')) {
                const file = item.getAsFile();
                if (file) {
                    setFileCallback(file);
                    jobDetailsTextarea.value = ''; // Clear text
                    fileStatus.textContent = `Pasted Image: ${file.name || 'Pasted Image'}`;
                    fileStatus.classList.remove('hidden');
                    updateButtonCallback();
                    fileFound = true;
                    break;
                }
            }
        }
    });

    // Click to browse functionality
    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            setFileCallback(file);
            jobDetailsTextarea.value = ''; // Clear text
            fileStatus.textContent = `File Selected: ${file.name}`;
            fileStatus.classList.remove('hidden');
            updateButtonCallback();
        }
    });

    // Textarea input event
    jobDetailsTextarea.addEventListener('input', () => {
        if (jobDetailsTextarea.value.trim() !== '') {
            setFileCallback(null); // Clear file
            fileStatus.classList.add('hidden');
        }
        updateButtonCallback();
    });
};