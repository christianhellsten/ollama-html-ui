import { Event } from './Event.js';
import { AppController } from './AppController.js';

export class ChatModelInfo {
  constructor() {
    this.element = document.getElementById('chat-model-info');
    this.nameElement = this.element.querySelector('.chat-model-name');
    this.bindEventListeners();
    AppController.getCurrentChat().then((chat) => {
      this.chat = chat;
      this.render();
    });
  }

  render() {
    this.nameElement.textContent = this.chat?.model;
  }

  bindEventListeners() {
    // Event.listen('chatDeleted', this.handleChatDeleted.bind(this));
    Event.listen('chatSelected', this.handleChatSelected.bind(this));
  }

  handleChatSelected(chat) {
    this.chat = chat;
    this.render();
  }
}
