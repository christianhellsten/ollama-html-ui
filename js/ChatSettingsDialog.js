import { Modal } from './Modal.js'
import { ModelsList } from './ModelsList.js'

export class ChatSettingsDialog extends Modal {
  constructor (chats) {
    super('chat-settings-dialog')
    this.chats = chats
    this.showButton = document.getElementById('chat-settings-button')
    this.modelList = new ModelsList('chat-model-list', this.chats.getCurrentChat()?.model)
    // this.systemPromptInput = this.modal.querySelector('#input-system-prompt')
    this.bindEventListeners()
  }

  bindEventListeners () {
    this.showButton.addEventListener('click', this.show.bind(this))
    this.modelList.onClick(model => {
      const chatId = this.chats.getCurrentChat()?.id
      this.chats.updateModel(chatId, model)
    })
    // this.systemPromptInput.addEventListener('blur', () => {
    // console.log(this.urlInput.value)
    // Settings.setUrl(this.urlInput.value)
    // })
  }
}
