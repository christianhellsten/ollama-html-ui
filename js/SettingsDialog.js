import { Modal } from './Modal.js';
import { UINotification } from './UINotification.js';
import { ModelsList } from './ModelsList.js';
import { Models } from './models/Models.js';
import { Settings } from './models/Settings.js';

export class SettingsDialog extends Modal {
  constructor() {
    super('settings-dialog');
    this.showButton = document.getElementById('settings-button');
    this.urlInput = document.getElementById('input-url');
    this.modelInput = document.getElementById('input-model');
    this.systemPromptInput = this.modal.querySelector('#input-system-prompt');
    this.modelParametersInput = this.modal.querySelector(
      '#input-model-parameters',
    );
    this.refreshModelsButton = this.modal.querySelector(
      '.refresh-models-button',
    );
    this.modelList = new ModelsList('model-list', Settings.getModel());
    this.bindEventListeners();
    this.loadSettings();
  }

  bindEventListeners() {
    this.urlInput.addEventListener('blur', () => {
      const value = this.urlInput.value.trim();
      Settings.setUrl(value);
    });
    this.systemPromptInput.addEventListener('blur', () => {
      Settings.setSystemPrompt(this.systemPromptInput.value.trim());
    });
    this.modelParametersInput.addEventListener('blur', () => {
      const value = this.modelParametersInput.value.trim();
      if (value === '') {
        return;
      }
      try {
        const parsedValue = JSON.parse(value);
        const prettyJSON = JSON.stringify(parsedValue, 2);
        Settings.setModelParameters(parsedValue);
        this.modelParametersInput.value = prettyJSON;
        this.modelParametersInput.classList.remove('error');
      } catch (error) {
        if (error.name === 'SyntaxError') {
          this.modelParametersInput.classList.add('error');
        } else {
          console.error(error);
        }
      }
    });
    this.modelList.onClick(() => {
      Settings.setModel(this.modelList.getSelected());
    });
    this.showButton.addEventListener('click', this.show.bind(this));
    this.refreshModelsButton.onclick = () => this.refreshModels();
    this.closeButton.onclick = () => this.hide();
  }

  show() {
    Models.load();
    this.handleShow();
  }

  refreshModels() {
    if (!Models.getUrl()) {
      UINotification.show('Please update the URL in the settings to continue.');
    } else {
      Models.load();
    }
  }

  loadSettings() {
    this.urlInput.value = Settings.getUrl();
    const modelParameters = Settings.getModelParameters();
    if (modelParameters) {
      this.modelParametersInput.value = JSON.stringify(modelParameters, 2);
    }
  }
}
