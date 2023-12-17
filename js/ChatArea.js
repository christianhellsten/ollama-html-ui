import { Event } from './Event.js';
import { ChatTitle } from './ChatTitle.js';
import { ChatForm } from './ChatForm.js';

export class ChatArea {
  constructor(chats) {
    this.chats = chats;
    this.chatTitle = new ChatTitle(this.chats);
    this.chatForm = new ChatForm();
    this.bindEventListeners();
    this.chatHistory = document.getElementById('chat-history');
    this.render();
  }

  render() {
    this.chatHistory.innerHTML = this.chats.getCurrentChat()?.content || '';
    this.chatTitle.render();
  }

  bindEventListeners() {
    Event.listen('chatSelected', this.handleChatSelected.bind(this));
    ['chatCreated', 'chatDeleted', 'chatUpdated'].forEach(name => {
      Event.listen(name, this.render.bind(this));
    });
  }

  handleChatSelected() {
    const chat = this.chats.getCurrentChat();
    this.chatTitle.setTitle(chat.title);
  }
}
