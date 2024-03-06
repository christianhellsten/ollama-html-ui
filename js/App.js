import { Event } from './Event.js'
import { Chats } from './models/Chats.js'
import { LocalStorage } from './models/LocalStorage.js'
import { Sidebar } from './Sidebar.js'
import { ChatArea } from './ChatArea.js'

// Configuration and DOM elements
const storage = new LocalStorage()

export class App {
  static run () {
    const app = new App()
    return app
  }

  constructor () {
    this.controller = null
    this.chats = new Chats()
    this.sidebar = new Sidebar(this.chats)
    this.chatArea = new ChatArea(this.chats)
    this.initializeElements()
    this.bindEventListeners()
    this.logInitialization()
    this.render()
  }

  initializeElements () {
    this.sendButton = document.getElementById('send-button')
    this.abortButton = document.getElementById('abort-button')
    this.messageInput = document.getElementById('message-input')
    this.chatHistory = document.getElementById('chat-history')
  }

  logInitialization () {
    const msg = `~~~\nOllama HTML UI\n~~~
Model: ${storage.get('model')}
URL:   ${storage.get('url')}
Chat:  ${this.chats.getCurrentChat()?.id}
`
    console.log(msg)
  }

  render () {
    this.sidebar.render()
    this.chatArea.render()
  }

  bindEventListeners () {
    Event.listen('chatSelected', this.handleChatSelected)
    this.sendButton.addEventListener('click', this.sendMessage.bind(this))
    this.abortButton.addEventListener('click', this.handleAbort.bind(this))
    this.messageInput.addEventListener('keypress', this.handleKeyPress.bind(this))
  }

  handleChatSelected = (chat) => {
    window.history.pushState({}, '', `/chats/${chat.id}`)
    this.chatArea.render()
    this.sidebar.render()
  }

  handleAbort = () => {
    if (this.controller) {
      this.controller.abort()
      this.enableInput()
      console.log('Request aborted')
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.sendMessage()
    }
  }

  enableInput () {
    this.show(this.sendButton)
    this.hide(this.abortButton)
    this.enable(this.messageInput)
    this.messageInput.focus()
  }

  disableInput () {
    this.hide(this.sendButton)
    this.show(this.abortButton)
    this.disable(this.messageInput)
  }

  show = (element) => {
    element.style.display = 'block'
  }

  hide = (element) => {
    element.style.display = 'none'
  }

  enable = (element) => {
    element.removeAttribute('disabled')
  }

  disable = (element) => {
    element.setAttribute('disabled', 'disabled')
  }

  getModel = () => {
    return storage.get('model')
  }

  async sendMessage () {
    const message = this.messageInput.value.trim()
    this.messageInput.value = ''
    if (message) {
      this.disableInput()
      this.createMessageDiv(message, 'user')
      const responseDiv = this.createMessageDiv('', 'system')
      responseDiv.innerHTML = this.getSpinner()
      try {
        const data = { model: this.getModel(), prompt: message }
        const response = await this.postMessage(data, responseDiv)
        this.handleResponse(response, responseDiv)
      } catch (error) {
        this.updateResponse(responseDiv, `Error: ${error.message}`, 'system')
      }
    }
  }

  createMessageDiv = (text, sender) => {
    const div = document.createElement('div')
    div.classList.add('message', `${sender}-message`)
    div.textContent = text
    div.initialResponse = true
    this.chatHistory.appendChild(div)
    this.chatHistory.scrollTop = this.chatHistory.scrollHeight
    return div
  }

  getSpinner = () => {
    return '<div class="spinner"></div>'
  }

  async postMessage (data, responseDiv) {
    this.controller = new AbortController()
    const url = `${storage.get('url')}/api/generate`
    const { signal } = this.controller
    const response = await fetch(url, {
      signal,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      this.enableInput()
      throw new Error(`POST ${url} status ${response.status}`)
    }
    return response
  }

  async handleResponse (response, responseDiv) {
    const reader = response.body.getReader()
    let partialLine = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          this.handleDone()
          break
        }

        const textChunk = new TextDecoder().decode(value)
        const lines = (partialLine + textChunk).split('\n')
        partialLine = lines.pop()

        lines.forEach(line => {
          if (line.trim()) {
            this.updateResponse(responseDiv, JSON.parse(line).response)
          }
        })
      }

      if (partialLine.trim()) {
        this.updateResponse(responseDiv, partialLine)
      }
    } catch (error) {
      this.handleResponseError(error, responseDiv)
    } finally {
      this.enableInput()
    }
  }

  handleResponseError = (error, responseDiv) => {
    // Ignore "Abort" button
    if (error.name !== 'AbortError') {
      this.updateResponse(responseDiv, `Error: ${error.message}`, 'system')
    }
  }

  updateResponse = (div, content) => {
    const sanitizedContent = this.sanitizeContent(content)
    if (div.initialResponse) {
      div.innerHTML = sanitizedContent
      div.initialResponse = false
    } else {
      div.innerHTML += sanitizedContent
    }
  }

  sanitizeContent = (content) => {
    // TODO: Sanitization logic here
    return content
  }

  handleDone = () => {
    const chat = this.chats.getCurrentChat()
    const content = this.chatHistory.innerHTML
    if (chat !== null) {
      this.chats.update(chat.id, chat.title, content)
    } else {
      this.chats.add(null, content)
    }
    this.chats.saveData()
  }

  getIdParam = () => {
    return new URL(window.location.href).pathname.split('/').pop()
  }
}
