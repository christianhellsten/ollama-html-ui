import { Event } from './Event.js'
import { ChatTitle } from './ChatTitle.js'
import { ChatForm } from './ChatForm.js'

export class ChatArea {
  constructor (chats) {
    this.chats = chats
    this.chatTitle = new ChatTitle(this.chats)
    this.chatForm = new ChatForm()
    this.chatHistory = document.getElementById('chat-history')
    this.messageInput = document.getElementById('message-input')
    this.editChatButton = document.getElementById('edit-chat-button')
    this.scrollToTopButton = document.getElementById('scroll-to-top-button')
    this.scrollToEndButton = document.getElementById('scroll-to-end-button')
    this.deleteChatButton = document.getElementById('delete-chat-button')
    this.bindEventListeners()
  }

  render () {
    const chat = this.chats.getCurrentChat()
    this.chatHistory.innerHTML = chat?.content || ''
    this.chatTitle.render()
    this.messageInput.focus()
  }

  bindEventListeners () {
    Event.listen('chatSelected', this.handleChatSelected.bind(this));
    ['chatCreated', 'chatDeleted', 'chatUpdated'].forEach(name => {
      Event.listen(name, this.render.bind(this))
    })
    this.scrollToTopButton.addEventListener('click', this.scrollToTop.bind(this))
    this.scrollToEndButton.addEventListener('click', this.scrollToEnd.bind(this))
    this.editChatButton.addEventListener('click', this.handleEditChat.bind(this))
    this.deleteChatButton.addEventListener('click', this.handleDeleteChat.bind(this))
  }

  handleChatSelected () {
    const chat = this.chats.getCurrentChat()
    this.chatTitle.setTitle(chat.title)
    // this.modelList.setSelected(chat.model)
  }

  handleEditChat () {
    this.chatTitle.focus()
    event.stopPropagation()
  }

  handleDeleteChat () {
    const chat = this.chats.getCurrentChat()
    if (chat) {
      this.chats.delete(chat.id)
      this.chatHistory.innerHTML = ''
      Event.emit('deleteChat', chat.id)
    }
    event.stopPropagation()
  }

  scrollToTop () {
    this.chatHistory.scrollTop = 0
  }

  scrollToEnd () {
    this.chatHistory.scrollTop = this.chatHistory.scrollHeight
  }
}
