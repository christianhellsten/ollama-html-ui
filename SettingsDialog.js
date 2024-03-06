import { LocalStorage } from './LocalStorage.js';

export class SettingsDialog {
    constructor() {
        this.storage = new LocalStorage();
        this.createDialogElements();
        this.attachEventListeners();
        this.loadSettings();
    }

    createDialogElements() {
        this.modal = document.createElement('div');
        this.modal.className = 'modal';

        this.modalContent = document.createElement('div');
        this.modalContent.className = 'modal-content';

        this.urlInput = document.createElement('input');
        this.urlInput.type = 'text';
        this.urlInput.placeholder = 'Enter URL';

        this.saveButton = document.createElement('button');
        this.saveButton.textContent = 'Save';
        this.saveButton.onclick = () => this.saveSettings();

        this.closeButton = document.createElement('button');
        this.closeButton.textContent = 'Close';
        this.closeButton.onclick = () => this.hideDialog();

        this.modalContent.appendChild(this.urlInput);
        this.modalContent.appendChild(this.saveButton);
        this.modalContent.appendChild(this.closeButton);
        this.modal.appendChild(this.modalContent);
        document.body.appendChild(this.modal);
    }

    attachEventListeners() {
        // Optional: Implement event listeners if needed (e.g., keyboard shortcuts)
    }

    showDialog() {
        this.modal.classList.add('show');
    }

    hideDialog() {
        this.modal.classList.remove('show');
    }

    saveSettings() {
        this.storage.set('settingsUrl', this.urlInput.value);
        this.hideDialog();
    }

    loadSettings() {
        const url = this.storage.get('settingsUrl', '');
        this.urlInput.value = url;
    }
}
