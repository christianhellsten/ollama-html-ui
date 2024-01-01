import { AppController } from './AppController.js';
import { Event } from './Event.js';
import { ChatTitle } from './ChatTitle.js';
import { ChatForm } from './ChatForm.js';

export class ChatArea {
  constructor() {
    this.chatTitle = new ChatTitle();
    this.chatForm = new ChatForm();
    this.chatHistory = document.getElementById('chat-history');
    this.messageInput = document.getElementById('message-input');
    this.editChatButton = document.getElementById('edit-chat-button');
    this.scrollToTopButton = document.getElementById('scroll-to-top-button');
    this.scrollToEndButton = document.getElementById('scroll-to-end-button');
    this.deleteChatButton = document.getElementById('delete-chat-button');
    AppController.getCurrentChat().then((chat) => {
      this.chat = chat;
      this.render();
    });
    this.bindEventListeners();
  }

  render() {
    // Clear history view
    this.chatHistory.innerText = '';
    // Render chat history
    this.chat?.getMessages()?.then((messages) => {
      messages.forEach((message) => {
        this.createMessageDiv(message.content, message.role);
      });
    });
    this.messageInput.focus();
  }

  bindEventListeners() {
    Event.listen('chatSelected', this.handleChatSelected.bind(this));
    Event.listen('chatDeleted', this.handleChatDeleted.bind(this));
    this.scrollToTopButton.addEventListener(
      'click',
      this.scrollToTop.bind(this),
    );
    this.scrollToEndButton.addEventListener(
      'click',
      this.scrollToEnd.bind(this),
    );
    this.editChatButton.addEventListener(
      'click',
      this.handleEditChat.bind(this),
    );
    this.deleteChatButton.addEventListener(
      'click',
      this.handleDeleteChat.bind(this),
    );
  }

  createMessageDiv(text, role) {
    // Get the template and its content
    const template = document.getElementById('chat-message-template');
    const messageClone = template.content.cloneNode(true);

    // Find the div and span elements within the cloned template
    const messageDiv = messageClone.querySelector('.chat-message');
    const textSpan = messageClone.querySelector('.chat-message-text');

    // Set the class for role and text content
    messageDiv.classList.add(`${role}-chat-message`);
    textSpan.textContent = text;
    messageDiv.spellcheck = false;

    // Append to chatHistory and adjust scroll
    this.chatHistory.appendChild(messageDiv);
    this.scrollToEnd();

    return messageDiv;
  }

  handleChatDeleted(chat) {
    if (chat.id === this.chat?.id) {
      this.chat = null;
    } else {
      this.chat = chat;
    }
    this.render();
  }

  handleChatSelected(chat) {
    this.chat = chat;
    this.render();
  }

  handleEditChat() {
    this.chatTitle.focus();
    event.stopPropagation();
  }

  async handleDeleteChat() {
    const chat = await AppController.getCurrentChat();
    if (chat) {
      await AppController.deleteChat(chat);
    }
  }

  scrollToTop() {
    this.chatHistory.scrollTop = 0;
  }

  scrollToEnd() {
    this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
  }
}
