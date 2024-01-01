import { Models } from './models/Models.js'
import { UINotification } from './UINotification.js'
import { Settings } from './models/Settings.js'
import { Event } from './Event.js'
import { DOM } from './Dom.js'
import { Sidebar } from './Sidebar.js'
import { AppController } from './AppController.js'
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
    this.sidebar = new Sidebar()
    this.chatArea = new ChatArea()
    this.ollamaApi = new OllamaApi()
    this.settingsDialog = new SettingsDialog()
    this.chatSettingsDialog = new ChatSettingsDialog()
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
Model:       ${Settings.getModel()}
URL:         ${Settings.getUrl()}
Chat:        ${Settings.getCurrentChatId()}
Parameters:  ${JSON.stringify(Settings.getModelParameters())}
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
    const userMessage = this.messageInput.value.trim()
    // Get the current chat
    let chat = await AppController.getCurrentChat()
    if (userMessage) {
      // Reset input
      this.messageInput.value = ''
      // Create new chat
      if (!chat) {
        chat = await AppController.createChat({
          title: 'Untitled',
          model: Settings.getModel()
        })
      }
      // Store user message
      await chat.addMessage({
        role: 'user',
        content: userMessage
      })
      const systemPrompt = Settings.getSystemPrompt()
      const modelParameters = Settings.getModelParameters()
      // Disable form
      this.disableForm()
      // Create user message
      this.createChatMessage(userMessage, 'user')
      // Create system message container
      const responseElement = this.createChatMessage('', 'system')
      const requestContext = {
        chat,
        content: '', // TODO: Move this to the response?
        responseElement
      }
      const requestData = {
        prompt: userMessage,
        model: chat.model,
        messages: (await chat.getMessages()).map(message => ({ role: message.role, content: message.content }))
      }
      // Add system prompt
      if (systemPrompt) {
        requestData.system = systemPrompt
      }
      // Add model parameters
      if (modelParameters) {
        requestData.options = modelParameters
      }
      // Show spinner
      responseElement.innerHTML = '<div class="spinner"></div>'
      // Make request
      this.ollamaApi.send(
        requestData,
        (request, response) => this.handleResponse(request, response, requestContext),
        (request, error) => this.handleResponseError(request, error, requestContext),
        (request, response) => this.handleDone(request, response, requestContext)
      )
    }
  }

  createChatMessage (content, sender) {
    return this.chatArea.createMessageDiv(content, sender)
  }

  /*
  createMessageDiv = (text, sender) => {
    // Get the template and its content
    const template = document.getElementById('chat-message-template')
    const messageClone = template.content.cloneNode(true)

    // Find the div and span elements within the cloned template
    const messageDiv = messageClone.querySelector('.chat-message')
    const textSpan = messageClone.querySelector('.chat-message-text')

    // Set the class for sender and text content
    messageDiv.classList.add(`${sender}-chat-message`)
    textSpan.textContent = text
    messageDiv.spellcheck = false

    // Append to chatHistory and adjust scroll
    this.chatHistory.appendChild(messageDiv)
    this.chatArea.scrollToEnd()

    return messageDiv
  }
  */

  handleResponse (request, response, context) {
    const responseElement = context.responseElement
    const sanitizedContent = this.sanitizeContent(response)
    // Remember original response
    context.content += sanitizedContent
    responseElement.textContent += sanitizedContent
    this.chatArea.scrollToEnd()
  }

  handleResponseError (request, error, context) {
    // Ignore "Abort" button
    if (error.name !== 'AbortError') {
      console.error(`Error: ${error.message}`)
    }
    this.chatArea.scrollToEnd()
    this.enableForm()
  }

  async handleDone (request, response, context) {
    const chat = context.chat
    console.log(`Chat ${chat.id} done`)
    await chat.addMessage({
      role: 'assistant',
      content: context.content
    })
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
