import { UINotification } from './UINotification.js';
import { Settings } from './models/Settings.js';
import { Event } from './Event.js';
import { DOM } from './Dom.js';
import { Sidebar } from './Sidebar.js';
import { AppController } from './AppController.js';
import { CopyButton } from './CopyButton.js';
import { OllamaApi } from './OllamaApi.js';
import { DownloadButton } from './DownloadButton.js';
import { DropDownMenu } from './DropDownMenu.js';
import { SettingsDialog } from './SettingsDialog.js';
import { ChatSettingsDialog } from './ChatSettingsDialog.js';
// import { MarkdownFormatter } from './MarkdownFormatter.js'
import { ChatArea } from './ChatArea.js';

// TODO: Review and refactor
export class App {
  static run() {
    UINotification.initialize();
    const app = new App();
    return app;
  }

  constructor() {
    this.sidebar = new Sidebar();
    this.chatArea = new ChatArea();
    this.ollamaApi = new OllamaApi();
    this.settingsDialog = new SettingsDialog();
    this.chatSettingsDialog = new ChatSettingsDialog();
    this.downloadButton = new DownloadButton();
    this.copyButton = new CopyButton();
    this.dropDownMenu = new DropDownMenu();
    this.initializeElements();
    this.bindEventListeners();
    this.logInitialization();
    this.render();
  }

  initializeElements() {
    // this.sendButton = document.getElementById('send-button');
    this.abortButton = document.getElementById('abort-button');
    this.messageInput = document.getElementById('message-input');
    this.chatHistory = document.getElementById('chat-history');
  }

  logInitialization() {
    const msg = `~~~~\nChat\n~~~~
Model:       ${Settings.getModel()}
URL:         ${Settings.getUrl()}
Chat:        ${Settings.getCurrentChatId()}
Parameters:  ${JSON.stringify(Settings.getModelParameters())}
`;
    console.log(msg);
  }

  render() {
    this.sidebar.render();
    this.chatArea.render();
  }

  bindEventListeners() {
    Event.listen('chatSelected', this.handleChatSelected);
    // this.sendButton.addEventListener('click', this.sendMessage.bind(this));
    this.abortButton.addEventListener('click', this.handleAbort.bind(this));
    this.messageInput.addEventListener(
      'keypress',
      this.handleKeyPress.bind(this),
    );
  }

  handleChatSelected = (chat) => {
    window.history.pushState({}, '', `/chats/${chat.id}`);
  };

  handleAbort = () => {
    this.ollamaApi.abort();
    this.enableForm();
    console.log('Request aborted');
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.sendMessage();
    }
  };

  enableForm() {
    DOM.hideElement(this.abortButton).enableInput(this.messageInput);
    this.messageInput.focus();
  }

  disableForm() {
    DOM.showElement(this.abortButton).disableInput(this.messageInput);
  }

  // https://github.com/jmorganca/ollama/blob/main/docs/api.md#generate-a-completion
  async sendMessage() {
    const userPrompt = this.messageInput.value.trim();
    // Get the current chat
    let chat = await AppController.getCurrentChat();
    const url = Settings.getUrl('/api/chat');
    if (!url) {
      UINotification.show(
        'Please update the URL in the settings to continue. ',
      );
      return null;
    }
    if (userPrompt) {
      // Reset input
      this.messageInput.value = '';
      // Create new chat
      if (!chat) {
        chat = await AppController.createChat({
          title: 'Untitled',
          model: Settings.getModel(),
        });
      }
      // Store user message
      const userMessage = await chat.addMessage({
        role: 'user',
        content: userPrompt,
      });
      const systemMessage = await chat.addMessage({
        role: 'assistant',
        content: '',
      });
      const systemPrompt = Settings.getSystemPrompt();
      const modelParameters = Settings.getModelParameters();
      // Disable form
      this.disableForm();
      // Create user message
      this.createChatMessage(userMessage);
      // Create system message container
      const responseElement = this.createChatMessage(systemMessage);
      const requestContext = {
        chat,
        userMessage,
        systemMessage,
        responseElement,
      };
      const requestData = {
        prompt: userMessage,
        model: chat.model,
        messages: (await chat.getMessages()).map((message) => ({
          role: message.role,
          content: message.content,
        })),
      };
      // Add system prompt
      if (systemPrompt) {
        requestData.system = systemPrompt;
      }
      // Add model parameters
      if (modelParameters) {
        requestData.options = modelParameters;
      }
      // Show spinner
      responseElement.textElement.innerHTML = '<div class="waiting"></div>';
      // Make request
      this.ollamaApi.send(
        url,
        requestData,
        (request, response) =>
          this.handleResponse(request, response, requestContext),
        (request, error) => this.handleResponseError(request, error),
        (request, response) =>
          this.handleDone(request, response, requestContext),
      );
    }
  }

  createChatMessage(message) {
    return this.chatArea.createMessageDiv(message);
  }

  handleResponse(request, response, context) {
    const responseElement = context.responseElement;
    const sanitizedContent = this.sanitizeContent(response);
    // Remember original response
    context.systemMessage.content += sanitizedContent;
    responseElement.textElement.textContent += sanitizedContent;
    this.chatArea.scrollToEnd();
  }

  handleResponseError(request, error) {
    // Ignore "Abort" button
    if (error.name !== 'AbortError') {
      console.error(`Error: ${error.message}`);
    }
    this.chatArea.scrollToEnd();
    this.enableForm();
  }

  async handleDone(request, response, context) {
    const chat = context.chat;
    console.log(`Chat ${chat.id} done`);
    await context.systemMessage.save();
    this.enableForm();
  }

  sanitizeContent = (content) => {
    // TODO: Sanitization logic here
    return content;
  };

  getIdParam = () => {
    return new URL(window.location.href).pathname.split('/').pop();
  };
}
