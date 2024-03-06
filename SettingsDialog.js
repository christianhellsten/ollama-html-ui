import { LocalStorage } from './LocalStorage.js';

export class SettingsDialog {
    constructor() {
        this.domId = 'settings-dialog';
        this.storage = new LocalStorage();
        this.createDialogElements();
        this.attachEventListeners();
        this.loadSettings();
    }

    show() {
        this.modal.classList.add('show');
    }

    hide() {
        this.modal.classList.remove('show');
    }

    createDialogElements() {
        this.modal = document.getElementById(this.domId);
        this.urlInput = document.getElementById('input-ollama-url');
        this.saveButton = document.getElementById('button-save-settings');
        this.saveButton.onclick = () => this.saveSettings();
        this.closeButton = document.getElementById('button-close-settings');
        this.closeButton.onclick = () => this.hide();
    }

    attachEventListeners() {
        // Optional: Implement event listeners if needed (e.g., keyboard shortcuts)
    }

    saveSettings() {
        this.storage.set('url', this.urlInput.value);
        this.hide();
    }

    loadSettings() {
        const url = this.storage.get('url', '');
        this.urlInput.value = url;
    }
}
