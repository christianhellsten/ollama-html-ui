import { Models } from './models/Models.js'
import { UINotification } from './UINotification.js'
import { Settings } from './models/Settings.js'
import { Event } from './Event.js'
import { DOM } from './Dom.js'
import { Chats } from './models/Chats.js'
import { Sidebar } from './Sidebar.js'
import { CopyButton } from './CopyButton.js'
import { OllamaApi } from './OllamaApi.js'
import { DownloadButton } from './DownloadButton.js'
import { DropDownMenu } from './DropDownMenu.js'
import { SettingsDialog } from './SettingsDialog.js'
import { ChatSettingsDialog } from './ChatSettingsDialog.js'
// import { MarkdownFormatter } from './MarkdownFormatter.js'
import { ChatArea } from './ChatArea.js'

// TODO: Review and refactor
export class App {
  static run () {
    UINotification.initialize()
    const app = new App()
    Models.load()
    return app
  }

  constructor () {
    this.chats = new Chats()
    this.sidebar = new Sidebar(this.chats)
    this.chatArea = new ChatArea(this.chats)
    this.ollamaApi = new OllamaApi()
    this.settingsDialog = new SettingsDialog(this.chats)
    this.chatSettingsDialog = new ChatSettingsDialog(this.chats)
    this.downloadButton = new DownloadButton()
    this.copyButton = new CopyButton()
    this.dropDownMenu = new DropDownMenu()
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
    const msg = `~~~\nChat UI\n~~~
Model: ${Settings.getModel()}
URL:   ${Settings.getUrl()}
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
    this.ollamaApi.abort()
    this.enableForm()
    console.log('Request aborted')
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.sendMessage()
    }
  }

  enableForm () {
    DOM.showElement(this.sendButton)
      .hideElement(this.abortButton)
      .enableInput(this.messageInput)
    this.messageInput.focus()
  }

  disableForm () {
    DOM.hideElement(this.sendButton)
      .showElement(this.abortButton)
      .disableInput(this.messageInput)
  }

  // https://github.com/jmorganca/ollama/blob/main/docs/api.md#generate-a-completion
  async sendMessage () {
    const message = this.messageInput.value.trim()
    const chat = this.chats.getCurrentChat()
    const model = chat?.model || Settings.getModel()
    this.messageInput.value = ''

    if (message) {
      this.disableForm()
      this.createMessageDiv(message, 'user')
      const systemPrompt = Settings.getSystemPrompt()
      const modelParameters = Settings.getModelParameters()
      const responseDiv = this.createMessageDiv('', 'system')
      const data = {
        prompt: message,
        model
      }
      // Add system prompt
      if (systemPrompt) {
        data.system = systemPrompt
      }
      // Add model parameters
      if (modelParameters) {
        data.options = modelParameters
      }
      // Show spinner
      responseDiv.innerHTML = '<div class="spinner"></div>'
      // Make request
      this.ollamaApi.send(
        data,
        (response) => this.handleResponse(response, responseDiv),
        (error) => this.handleResponseError(error, responseDiv),
        (response) => this.handleDone(response, responseDiv)
      )
    }
  }

  createMessageDiv = (text, sender) => {
    // Get the template and its content
    const template = document.getElementById('chat-message-template')
    const messageClone = template.content.cloneNode(true)

    // Find the div and span elements within the cloned template
    const messageDiv = messageClone.querySelector('div')
    const textSpan = messageClone.querySelector('.message-text')

    // Set the class for sender and text content
    messageDiv.classList.add(`${sender}-message`)
    textSpan.textContent = text

    // Set initialResponse property
    messageDiv.initialResponse = true
    // Disable built-in spellchecker
    messageDiv.spellcheck = false

    // Append to chatHistory and adjust scroll
    this.chatHistory.appendChild(messageDiv)
    // this.chatHistory.scrollTop = this.chatHistory.scrollHeight
    this.chatArea.scrollToEnd()

    return messageDiv
  }

  handleResponse (response, responseDiv) {
    // Update the response div with the received response
    const sanitizedContent = this.sanitizeContent(response)
    if (responseDiv.initialResponse) {
      responseDiv.textContent = sanitizedContent
      responseDiv.initialResponse = false
    } else {
      responseDiv.textContent += sanitizedContent
    }
    this.chatArea.scrollToEnd()
  }

  handleResponseError (error, responseDiv) {
    // Ignore "Abort" button
    if (error.name !== 'AbortError') {
      console.error(`Error: ${error.message}`)
      responseDiv.initialResponse = false
    }
    this.chatArea.scrollToEnd()
    this.enableForm()
  }

  handleDone (response, responseDiv) {
    console.log('Done')
    const chat = this.chats.getCurrentChat()
    const content = this.chatHistory.innerHTML
    if (chat !== null) {
      this.chats.update(chat.id, chat.title, content)
    } else {
      this.chats.add(null, content)
    }
    this.chats.saveData()
    this.enableForm()
  }

  sanitizeContent = (content) => {
    // TODO: Sanitization logic here
    return content
  }

  getIdParam = () => {
    return new URL(window.location.href).pathname.split('/').pop()
  }
}
