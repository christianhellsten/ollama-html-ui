export class Chat {
  constructor(id, title, content) {
    this.id = id;
    this.title = title; // New title attribute
    this.content = content;
  }
}

export class Chats {
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
    const dataJSON = localStorage.getItem('chats');
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
    localStorage.setItem('chats', dataJSON);
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
      this.saveData();
    } else {
      console.error('Chat not found');
    }
  }

  // Set the current chat
  setCurrentChat(id) {
    //const chatExists = this.chats.some(chat => chat.id === id);
    //if (chatExists) {
    this.currentChatId = id;
    this.saveData();
    //} else {
    console.log(`Set current chat ${id}`);
    //}
  }

  // Get the current chat
  getCurrentChat() {
    let currentChat = this.chats.find(chat => chat.id === this.currentChatId) || null;
    return currentChat;
  }

  // Update the current chat or add a new one if no current chat is selected
  updateCurrentChat(content) {
    if (this.currentChatId !== null) {
      const chat = this.getCurrentChat();
      this.update(chat.id, chat.title, content);
    } else {
      this.add('New chat', content);
    }
  }

  // Method to get all chats
  getChats() {
    return this.chats;
  }
}
