import { Event } from '../Event.js';
import { Chat } from './Chat.js';

export class Chats {
  constructor() {
    this.loadData();
    this.chats = this.chats || [];
    this.nextId = this.chats.length > 0
                 ? Math.max(...this.chats.map(chat => chat.id)) + 1
                 : 1;
  }

  // Load chats from local storage
  loadData() {
    const dataJSON = localStorage.getItem('chats');
    if (dataJSON) {
      const data = JSON.parse(dataJSON);
      Object.keys(data).forEach(key => {
        this[key] = data[key];
      });
      this.chats = this.chats.map(chat => new Chat(chat.id, chat.title, chat.content));
    }
  }

  // Save chats to local storage
  saveData() {
    localStorage.setItem('chats', JSON.stringify(this));
  }

  // Clear saved data
  clearData() {
    this.chats = [];
    this.currentChatId = null;
    this.nextId = 1;
    this.saveData();
    Event.emit('chatDeleted', this.chats);
  }

  // Add a new chat
  add(title, content) {
    const newChat = new Chat(this.nextId++, title, content);
    this.chats.push(newChat);
    this.setCurrentChat(newChat.id);
    this.saveData();
    Event.emit('chatCreated', newChat);
    return newChat.id;
  }

  // Update an existing chat
  update(id, title, content) {
    const chat = this.chats.find(chat => chat.id === id);
    if (chat) {
      Object.assign(chat, { title, content });
      this.saveData();
      Event.emit('chatUpdated', chat);
    } else {
      console.error('Chat not found for update:', id);
    }
  }

  // Update an existing chat's title
  updateTitle(id, title) {
    const chat = this.chats.find(chat => chat.id === id);
    if (chat) {
      Object.assign(chat, { title });
      this.saveData();
      Event.emit('chatUpdated', chat);
    } else {
      console.error('Chat not found for update:', id);
    }
  }

  // Delete a chat
  delete(id) {
    const chatIndex = this.chats.findIndex(chat => chat.id === id);
    if (chatIndex !== -1) {
      const chat = this.chats.splice(chatIndex, 1);
      this.currentChatId = this.currentChatId === id ? null : this.currentChatId;
      this.saveData();
      Event.emit('chatDeleted', chat);
    } else {
      console.error('Chat not found for removal:', id);
    }
  }

  // Set the current chat
  setCurrentChat(id) {
    if (this.chats.some(chat => chat.id === id)) {
      this.currentChatId = id;
      this.saveData();
      Event.emit('chatSelected', this.getCurrentChat());
    } else {
      console.warn(`Chat with ID ${id} not found.`);
    }
  }

  // Get the current chat
  getCurrentChat() {
    return this.chats.find(chat => chat.id === this.currentChatId) || null;
  }

  // Get all chats
  getChats() {
    return this.chats;
  }
}
