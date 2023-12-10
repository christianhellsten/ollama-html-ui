/*
 * We have the following use cases:
 *
 *  - Send message
 *  - Abort response
 *  - Edit chat title
 *  - New chat
 *  - Clear chats
 *
 * We have the following elements:
 *
 * - Chat input
 *
 *   - Message input
 *   - Send button
 *   - Abort button
 *
 * - Chat area
 *
 *   - Chat header
 *   - Chat history
 *
 * - Sidebar
 *
 *   - New chat button
 *   - Clear chats button
 *
 */

// Classes
class LocalStorageWrapper {
  // Set a value in localStorage
  set(key, value) {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  // Get a value from localStorage, return defaultValue if key doesn't exist
  get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? JSON.parse(value) : defaultValue;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return defaultValue;
    }
  }

  // Remove a value from localStorage
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage', e);
    }
  }
}

class Chats {
  constructor() {
    this.loadData();
    if (!this.chats) {
      this.chats = [];
    }
    if (!this.nextId) {
      this.nextId = this.chats.length > 0 ? Math.max(...this.chats.map(chat => chat.id)) + 1 : 1;
    }
  }

  // Load the whole Chats object from local storage
  loadData() {
    const dataJSON = localStorage.getItem('chatsData');
    const data = dataJSON ? JSON.parse(dataJSON) : null;

    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this[key] = data[key];
        }
      }
      // If chats array is part of the data, ensure Chat objects are properly instantiated
      if (this.chats) {
        this.chats = this.chats.map(chat => new Chat(chat.id, chat.title, chat.content));
      }
    }
  }

  // Save chats to local storage
  saveData() {
    const dataJSON = JSON.stringify(this);
    localStorage.setItem('chatsData', dataJSON);
  }

  // Clear saved data
  clearData() {
    this.chats = [];
    this.currentChatId = null;
    this.nextId = 1;
    this.saveData();
  }

  // Add a new chat with title
  add(title, content) {
    const newChat = new Chat(this.nextId++, title, content);
    this.chats.push(newChat);
    this.setCurrentChat(newChat.id);
    this.saveData();
    return newChat.id;
  }

  // Update an existing chat by id
  update(id, title, newContent) {
    const chatIndex = this.chats.findIndex(chat => chat.id === id);
    if (chatIndex !== -1) {
      this.chats[chatIndex].title = title;
      this.chats[chatIndex].content = newContent;
      this.saveData();
    } else {
      console.error('Chat not found');
    }
  }

  // Remove a chat by id
  remove(id) {
    if (this.currentChatId === id) {
      this.currentChatId = null;
    }
    const chatIndex = this.chats.findIndex(chat => chat.id === id);
    if (chatIndex !== -1) {
      this.chats.splice(chatIndex, 1);
      this.saveChats();
    } else {
      console.error('Chat not found');
    }
  }

  // Set the current chat
  setCurrentChat(id) {
    const chatExists = this.chats.some(chat => chat.id === id);
    if (chatExists) {
      this.currentChatId = id;
    } else {
      console.error('Chat not found');
    }
  }

  // Get the current chat
  getCurrentChat() {
    let currentChat = this.chats.find(chat => chat.id === this.currentChatId) || null;
    return currentChat;
  }

  // Update the current chat or add a new one if no current chat is selected
  updateCurrentChat(content) {
    if (this.currentChatId !== null) {
      this.update(this.currentChatId, '', content);
    } else {
      this.add('', content);
    }
  }

  // Method to get all chats
  getChats() {
    return this.chats;
  }
}

class Chat {
  constructor(id, title, content) {
    this.id = id;
    this.title = title; // New title attribute
    this.content = content;
  }
}

// App implements all UI functionality
class App {
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


// Configuration and DOM elements
const storage = new LocalStorageWrapper();
const ollamaModel = storage.get('model', 'mistral');
const ollamaHost = storage.get('url', 'http://localhost:11434');
const chats = new Chats();
const url = `${ollamaHost}/api/generate`;

// Instantiate the App class
const app = new App();
