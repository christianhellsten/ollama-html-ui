import { AppController } from './AppController.js'
import { Event } from './Event.js'
import { Modal } from './Modal.js'
import { ModelsList } from './ModelsList.js'

export class ChatSettingsDialog extends Modal {
  constructor () {
    super('chat-settings-dialog')
    this.showButton = document.getElementById('chat-settings-button')
    this.bindEventListeners()
  }

  bindEventListeners () {
    this.showButton.addEventListener('click', this.show.bind(this))
    Event.listen('chatSelected', this.handleChatSelected.bind(this))
  }

  show () {
    AppController.getCurrentChat().then(chat => {
      this.handleChatSelected(chat)
      this.handleShow()
    })
  }

  handleChatSelected (chat) {
    this.modelList = new ModelsList('chat-model-list', chat.model)
    this.modelList.onClick(async model => {
      chat.model = model
      await chat.save()
    })
  }
}
