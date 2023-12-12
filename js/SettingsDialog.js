import { Models } from './Models.js';
import { LocalStorage } from './LocalStorage.js';
import { List } from './List.js';

export class SettingsDialog {
    constructor() {
        this.models = new Models();
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
        this.modelInput = document.getElementById('input-ollama-model');
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
        const url = this.storage.get('url', 'http://localhost:11434');
        const model = this.storage.get('model', 'mistral');
        this.urlInput.value = url;
        this.modelInput.value = model;
        this.models.load().then(() => {
            console.log(this.models.getAllModelNames()); // This will log the model names once they are loaded
            const modelList = new List('input-ollama-models', this.models.getAllModelNames())
            modelList.onClick(model => {
                console.log(model)
                this.modelInput.value = model;
                this.storage.set('model', model);
            });
        });
    }
}
