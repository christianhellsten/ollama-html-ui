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
    this.messageInput = document.getElementById('message-input');
  }

  render() {
    this.chatHistory.innerHTML = this.chats.getCurrentChat()?.content || '';
    this.chatTitle.render();
    this.messageInput.focus();
    // Edit chat
    const editChatButton = document.getElementById('edit-chat-button').addEventListener("click", (event) => {
      this.chatTitle.focus();
      event.stopPropagation();
    });
    // Delete chat
    const deleteChatButton = document.getElementById('delete-chat-button').addEventListener("click", (event) => {
      const chat = this.chats.getCurrentChat();
      if(chat) {
        this.chats.delete(chat.id);
        this.chatHistory.innerHTML = '';
        Event.emit('deleteChat', chat.id)
      }
      event.stopPropagation();
    });
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
