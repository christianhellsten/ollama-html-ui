import { Event } from './Event.js'
import { ChatListItem } from './ChatListItem.js'
import { Chat } from './models/Chat.js'
import { AppController } from './AppController.js'

export class ChatList {
  constructor () {
    this.element = document.getElementById('chat-list')
    this.template = document.getElementById('chat-list-item-template').content
    this.bindEventListeners()
    AppController.getCurrentChat().then(chat => {
      this.chat = chat
    })
  }

  bindEventListeners () {
    Event.listen('chatCreated', this.handleChatCreated.bind(this))
    Event.listen('chatDeleted', this.handleChatDeleted.bind(this))
    Event.listen('chatsCleared', this.handleChatsCleared.bind(this))
    Event.listen('chatUpdated', this.handleChatUpdated.bind(this))
    Event.listen('chatSelected', this.handleChatSelected.bind(this))
  }

  async selectChat (chatId) {
    await AppController.setCurrentChatId(chatId)
  }

  handleChatCreated (chat) {
    this.appendChat(chat, true)
  }

  handleChatDeleted (chat) {
    if (this.chat?.id === chat.id) {
      this.chat = null
    }
    this.element.querySelector(`.chat${chat.id}`)?.remove()
  }

  handleChatsCleared (chat) {
    const elements = this.element.querySelectorAll('.chat-list-item')
    elements.forEach(element => element.remove())
  }

  handleChatUpdated (chat) {
    const listElement = this.element.querySelector(`.chat${chat.id} .chat-title`)
    if (listElement) {
      listElement.textContent = chat.title
    }
  }

  handleChatSelected (chat) {
    if (this.chat) {
      const previousListElement = this.element.querySelector(`.chat${this.chat.id}`)
      if (previousListElement) {
        previousListElement.classList.remove('selected')
      }
    }
    const newListElement = this.element.querySelector(`.chat${chat.id}`)
    if (newListElement) {
      newListElement.classList.add('selected')
    }
    // Remember selected chat
    this.chat = chat
  }

  render () {
    const currentChatId = AppController.getCurrentChatId()
    this.element.innerHTML = ''
    Chat.getAll().then((chats) => {
      chats.forEach(chat => {
        const selected = chat.id === currentChatId
        this.appendChat(chat, selected)
      })
    })
  }

  appendChat (chat, selected) {
    const chatListItem = new ChatListItem(chat, this, selected)
    this.element.appendChild(chatListItem.element)
  }
}
