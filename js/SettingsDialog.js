import { ModelsList } from './ModelsList.js'
import { Models } from './models/Models.js'
import { Settings } from './models/Settings.js'

export class SettingsDialog {
  constructor () {
    this.domId = 'settings-dialog'
    this.createDialogElements()
    this.bindEventListeners()
    this.loadSettings()
  }

  show () {
    this.modal.classList.add('show')
  }

  hide () {
    this.modal.classList.remove('show')
  }

  createDialogElements () {
    this.modal = document.getElementById(this.domId)
    this.urlInput = document.getElementById('input-url')
    this.modelInput = document.getElementById('input-model')
    this.refreshModelsButton = document.getElementById('refresh-models-button')
    this.closeButton = document.getElementById('button-close-settings')
    this.modelList = new ModelsList('model-list')
  }

  bindEventListeners () {
    this.urlInput.addEventListener('blur', () => {
      console.log(this.urlInput.value)
      Settings.setUrl(this.urlInput.value)
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
