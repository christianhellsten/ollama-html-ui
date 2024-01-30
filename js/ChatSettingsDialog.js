import { AppController } from './AppController.js';
import { SettingsDialog } from './SettingsDialog.js';
import { Settings } from './models/Settings.js';

export class ChatSettingsDialog extends SettingsDialog {
  constructor(options) {
    super(options);
  }

  getSelected() {
    return this.chat?.model;
  }

  async handleSystemPromptUpdated() {
    this.chat.systemPrompt = this.systemPromptInput.value.trim();
    await this.chat.save();
  }

  async handleModelUpdated() {
    this.chat.model = this.modelList.getSelected();
    await this.chat.save();
  }

  async handleModelParametersUpdated() {
    this.chat.modelParameters = this.modelParametersInput.value.trim();
    await this.chat.save();
  }

  async handleUrlUpdated() {
    this.chat.url = this.urlInput.value.trim();
    await this.chat.save();
  }

  loadSettings() {
    AppController.getCurrentChat().then((chat) => {
      this.modelList.setSelected(chat.model);
      this.chat = chat;
      this.urlInput.value = this.chat.url || Settings.getUrl();
      const modelParameters =
        this.chat.modelParameters || Settings.getModelParameters();
      if (modelParameters) {
        this.modelParametersInput.value = JSON.stringify(modelParameters, 2);
      }
    });
  }
}
