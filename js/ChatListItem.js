export class ChatListItem {
  constructor (chat, chatList) {
    this.chat = chat
    this.chatList = chatList
    this.content = document.getElementById('chat-list-item-template').content.cloneNode(true)
    this.element = this.content.querySelector('.chat-list-item')
    this.element.title = this.chat.title
    this.element.data = { id: this.chat.id }
    this.element.classList.add(`chat${this.chat.id}`)
    if (this.chat.id === this.chatList.chats.getCurrentChat()?.id) {
      this.element.classList.add('selected')
      this.content.querySelector('.icon-selected').classList.remove('hidden')
    }
    this.setTitle()
    this.bindEventListeners()
  }

  render () {
  }

  bindEventListeners () {
    this.element.addEventListener('mouseover', this.onMouseover.bind(this))
    this.element.addEventListener('mouseout', this.onMouseout.bind(this))
    this.element.addEventListener('click', this.onClick.bind(this))
  }

  onMouseover () {
    this.element.classList.add('hover')
  }

  onMouseout () {
    this.element.classList.remove('hover')
  }

  onClick () {
    this.chatList.selectChat(this.chat.id)
  }

  setTitle () {
    const chatTitle = this.content.querySelector('.chat-title')
    chatTitle.textContent = this.chat.title
  }
}
