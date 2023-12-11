import { Chat, Chats } from './Chats.js';
import { LocalStorage } from './LocalStorage.js';

// Configuration and DOM elements
const storage = new LocalStorage();
const ollamaModel = storage.get('model', 'mistral');
const ollamaHost = storage.get('url', 'http://localhost:11434');
const url = `${ollamaHost}/api/generate`;
const chats = new Chats();

// App implements all UI functionality
export class App {
  constructor() {
    this.controller = null;

    // Elements
    this.newChatButton = document.getElementById('new-chat-button');
    this.sendButton = document.getElementById('send-button');
    this.abortButton = document.getElementById('abort-button');
    this.messageInput = document.getElementById('message-input');
    this.clearButton = document.getElementById('clear-button');
    this.chatHistory = document.getElementById('chat-history');
    this.chatList = document.getElementById('chat-list');
    this.chatTitle = document.getElementById('chat-title');

    // Render
    this.render();

    // Bind event listeners
    this.bindEventListeners();
  }

  render() {
    this.renderChatArea();
    this.renderChatList();
  }

  renderChatArea() {
    // Restore current chat on load
    this.chatHistory.innerHTML = chats.getCurrentChat()?.content || '';
    this.chatTitle.innerHTML = chats.getCurrentChat()?.title || 'New chat';
  }

  renderChatList() {
    this.chatList.innerHTML = '';
    // Restore chat list
    chats.getChats().forEach(chat => {
      const listItem = document.createElement('li');
      const chatLink = document.createElement('a');
      listItem.classList.add('chat-list-item', `chat${chat.id}`);
      chatLink.classList.add('chat-link');
      chatLink.textContent = chat.title;
      chatLink.href = "#";
      chatLink.addEventListener("click", () => {
        chats.setCurrentChat(chat.id);
        this.render();
        this.messageInput.focus();
      });
      listItem.appendChild(chatLink);
      this.chatList.appendChild(listItem);
    });
  }

  bindEventListeners() {
    this.sendButton.addEventListener('click', () => this.sendMessage());
    this.abortButton.addEventListener("click", () => {
      if (this.controller) {
        this.controller.abort();
        this.enableInput();
        console.log("Request aborted");
      }
    });
    this.messageInput.addEventListener('keypress', event => {
      if (event.key === 'Enter' && !event.shiftKey) {
        this.sendMessage();
      }
    });
    this.messageInput.focus();

    this.newChatButton.addEventListener("click", () => {
      const chatId = chats.add('New chat', '');
      this.currentChatId = chatId;
      this.render();
      this.messageInput.focus();
    });

    this.clearButton.addEventListener("click", () => {
      chats.clearData();
      this.render();
    });

    this.chatTitle.addEventListener('blur', () => {
      const currentChat = chats.getCurrentChat();
      if (currentChat) {
        const title = this.chatTitle.innerText;
        currentChat.title = title;
        chats.saveData();
        this.renderChatList();
        console.log('New chat title:', title);
      }
    });

    this.chatTitle.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevents line breaks
        this.blur(); // Triggers the blur event
      }
    });
  }

  enableInput() {
    this.show(this.sendButton);
    this.hide(this.abortButton);
    this.enable(this.messageInput);
    this.messageInput.focus();
  }

  disableInput() {
    this.hide(this.sendButton);
    this.show(this.abortButton);
    this.disable(this.messageInput);
  }

  // Helper methods for showing and hiding elements
  show(element) {
    element.style.display = 'block';
  }

  hide(element) {
    element.style.display = 'none';
  }

  enable(element) {
    element.removeAttribute('disabled');
  }

  disable(element) {
    element.setAttribute('disabled', 'disabled');
  }

  // Send message and handle response
  async sendMessage() {
    const message = this.messageInput.value.trim();
    this.messageInput.value = '';
    if (message && message.length > 0) {
      this.disableInput()
      const requestDiv = this.createMessageDiv(message, 'user');
      const responseDiv = this.createMessageDiv('...', 'system');
      responseDiv.innerHTML = '<div class="spinner"></div>';

      try {
        // TODO: Hardcoded to use mistral
        const data = { model: "mistral", prompt: message };
        const response = await this.postMessage(data);
        this.handleResponse(response, responseDiv);
      } catch (error) {
        this.updateChat(responseDiv, `Error: ${error.message}`, 'system');
      }
    }
  }

  // Create a div for displaying a message
  createMessageDiv(text, sender) {
    const div = document.createElement('div');
    div.initialResponse = true;
    div.classList.add('message', `${sender}-message`);
    div.textContent = text;
    this.chatHistory.appendChild(div);
    this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    return div;
  }

  // Post message to the server
  async postMessage(data) {
    this.controller = new AbortController();
    const signal = this.controller.signal;
    const response = await fetch(url, {
      signal,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  }

  // Handle response stream and update UI
  async handleResponse(response, responseDiv) {
    const reader = response.body.getReader();
    let partialLine = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          this.enableInput();
          break;
        }

        const textChunk = new TextDecoder().decode(value);
        const lines = (partialLine + textChunk).split('\n');
        partialLine = lines.pop();

        lines.forEach(line => {
          if (line.trim()) {
            this.updateChat(responseDiv, JSON.parse(line).response, 'system');
          }
        });
      }

      if (partialLine.trim()) {
        updateChat(responseDiv, partialLine);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        // Handle other errors
        this.updateChat(responseDiv, `Error: ${error.message}`, 'system');
      }
    } finally {
      this.enableInput();
    }
  }

  // Update response div with new content
  //
  // Example content:
  //
  //   Object { model: "mistral", created_at: "2023-12-09T17:36:20.24176Z", response: "Hello", done: false }
  //
  updateChat(div, content) {
    // TODO: Sanitize
    //const sanitizedContent = sanitize(content); // Sanitize content
    const sanitizedContent = content;
    if (div.initialResponse == true) {
      div.innerHTML = sanitizedContent; // Replace content
      div.initialResponse = false
    } else {
      div.innerHTML += sanitizedContent; // Append content
    }
    chats.updateCurrentChat(this.chatHistory.innerHTML);
  }
}
