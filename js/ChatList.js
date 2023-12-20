import { Event } from './Event.js';
import { ChatListItem } from './ChatListItem.js';

export class ChatList {
  constructor(chats) {
    this.chats = chats;
    this.chatListElement = document.getElementById('chat-list');
    this.template = document.getElementById('chat-list-item-template').content;
    // Update list when a chat is updated
    ['chatCreated', 'chatDeleted', 'chatUpdated'].forEach(name => {
      Event.listen(name, this.render.bind(this));
    });
  }

  selectChat(chatId) {
    this.chats.setCurrentChat(chatId);
  }

  deleteChat(chatId) {
    this.chats.delete(chatId);
    this.render();
  }

  render() {
    this.chatListElement.innerHTML = '';
    this.chats.getChats().forEach(chat => {
      const chatListItem = new ChatListItem(chat, this);
      this.chatListElement.appendChild(chatListItem.element);
    });
  }
}
