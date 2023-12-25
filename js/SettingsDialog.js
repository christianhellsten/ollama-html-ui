import { Modal } from './Modal.js'
import { ModelsList } from './ModelsList.js'
import { Models } from './models/Models.js'
import { Settings } from './models/Settings.js'

export class SettingsDialog extends Modal {
  constructor () {
    super('settings-dialog')
    this.showButton = document.getElementById('settings-button')
    this.urlInput = document.getElementById('input-url')
    this.modelInput = document.getElementById('input-model')
    this.systemPromptInput = this.modal.querySelector('#input-system-prompt')
    this.refreshModelsButton = this.modal.querySelector('.refresh-models-button')
    this.modelList = new ModelsList('model-list', Settings.getModel())
    this.bindEventListeners()
    this.loadSettings()
  }

  bindEventListeners () {
    this.showButton.addEventListener('click', this.show.bind(this))
    this.urlInput.addEventListener('blur', () => {
      Settings.setUrl(this.urlInput.value)
    })
    this.systemPromptInput.addEventListener('blur', () => {
      Settings.setSystemPrompt(this.systemPromptInput.value)
    })
    this.closeButton.onclick = () => this.hide()
    this.modelList.onClick(model => {
      Settings.setModel(this.modelList.getSelected())
    })
    this.refreshModelsButton.onclick = () => this.refreshModels()
  }

  refreshModels () {
    Models.load()
  }

  loadSettings () {
    const url = Settings.getUrl()
    this.urlInput.value = url
  }
}
