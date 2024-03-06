import { Modal } from './Modal.js';
import { UINotification } from './UINotification.js';
import { ModelsList } from './ModelsList.js';
import { Models } from './models/Models.js';
import { Settings } from './models/Settings.js';

export class SettingsDialog extends Modal {
  constructor(options) {
    super(options);
    this.showButton = document.getElementById(options.buttonId);
    this.urlInput = this.modal.querySelector('#input-url');
    this.modelInput = this.modal.querySelector('#input-model');
    this.systemPromptInput = this.modal.querySelector('#input-system-prompt');
    this.modelParametersInput = this.modal.querySelector(
      '#input-model-parameters',
    );
    this.refreshModelsButton = this.modal.querySelector(
      '.refresh-models-button',
    );
    this.modelList = new ModelsList(this.modal.querySelector('#model-list'));
    this.bindEventListeners();
  }

  getSelected() {
    return Settings.getModel();
  }

  bindEventListeners() {
    this.urlInput.addEventListener('blur', this.handleUrlUpdated.bind(this));
    this.systemPromptInput.addEventListener(
      'blur',
      this.handleSystemPromptUpdated.bind(this),
    );
    this.modelParametersInput.addEventListener('blur', () =>
      this.handleModelParametersUpdated.bind(this),
    );
    this.modelList.onClick(this.handleModelUpdated.bind(this));
    this.showButton.addEventListener('click', this.show.bind(this));
    this.refreshModelsButton.addEventListener(
      'click',
      this.refreshModels.bind(this),
    );
    this.closeButton.addEventListener('click', this.hide.bind(this));
  }

  handleSystemPromptUpdated() {
    Settings.setSystemPrompt(this.systemPromptInput.value.trim());
  }

  handleModelUpdated() {
    Settings.setModel(this.modelList.getSelected());
  }

  handleModelParametersUpdated() {
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
  }

  handleUrlUpdated() {
    const value = this.urlInput.value.trim();
    Settings.setUrl(value);
  }

  show() {
    this.loadSettings();
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
    this.modelList.setSelected(this.getSelected());
    this.urlInput.value = Settings.getUrl();
    const modelParameters = Settings.getModelParameters();
    if (modelParameters) {
      this.modelParametersInput.value = JSON.stringify(modelParameters, 2);
    }
  }
}
