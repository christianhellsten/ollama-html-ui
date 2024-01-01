import { Event } from './Event.js';
import { AppController } from './AppController.js';

export class ChatTitle {
  constructor() {
    this.defaultTitle = 'Untitled';
    this.element = document.getElementById('chat-title');
    this.bindEventListeners();
    this.render();
  }

  render() {
    AppController.getCurrentChat().then((chat) => {
      this.chat = chat;
      this.setTitle(chat?.title);
    });
  }

  setTitle(title) {
    this.element.textContent = title || this.defaultTitle;
  }

  focus() {
    const hasFocus = document.activeElement === this.element;
    if (!hasFocus) {
      this.element.focus();
    }
  }

  bindEventListeners() {
    Event.listen('chatDeleted', this.handleChatDeleted.bind(this));
    Event.listen('chatSelected', this.handleChatSelected.bind(this));
    this.element.addEventListener('blur', this.handleSave.bind(this));
    this.element.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.element.blur();
      }
    });
  }

  handleChatSelected(chat) {
    this.chat = chat;
    this.setTitle(chat.title);
  }

  handleChatDeleted(chat) {
    if (chat.id === this.chat.id) {
      this.setTitle(this.defaultTitle);
    }
  }

  async handleSave() {
    let title = this.element.textContent.trim();
    if (title.length === 0) {
      title = this.defaultTitle;
      this.element.classList.add('error');
    } else {
      this.element.classList.remove('error');
    }
    const chat = await AppController.getCurrentChat();
    if (chat) {
      await AppController.updateChat(chat, { title });
    } else {
      await AppController.createChat({ title });
    }
  }
}
