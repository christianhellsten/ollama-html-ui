import { UINotification } from './UINotification.js';
import { AppController } from './AppController.js';
import { ExportChat } from './ExportChat.js';
import { Event } from './Event.js';
import { Hoverable } from './Hoverable.js';
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
    this.exportChatButton = document.getElementById('export-chat-button');
    AppController.getCurrentChat().then((chat) => {
      this.chat = chat;
      this.render();
    });
    this.bindEventListeners();
  }

  render() {
    // Clear history view
    this.chatHistory.innerText = '';
    if (this.chat) {
      this.chat // Render chat history
        .getMessages()
        .then((messages) => {
          messages.forEach((message) => {
            this.createMessageDiv(message);
          });
        });
      this.scrollToEnd();
    }
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
    this.exportChatButton.addEventListener('click', () => {
      ExportChat.exportChat(this.chat, `chat-${this.chat.id}.json`);
    });
    this.currentMessage = this.chatHistory.querySelector('.selected');
    // Select chat message with arrow up and arrow down keys
    document.addEventListener('keydown', (event) => {
      let next, previous;

      if (event.key === 'ArrowDown') {
        next = this.currentMessage
          ? this.currentMessage.nextElementSibling
          : this.chatHistory.firstElementChild;
        if (next) {
          if (this.currentMessage)
            this.currentMessage.classList.remove('hover');
          next.classList.add('hover');
          this.currentMessage = next; // Update currentMessage
          this.currentMessage.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          }); // Scroll into view
        }
      } else if (event.key === 'ArrowUp') {
        previous = this.currentMessage
          ? this.currentMessage.previousElementSibling
          : this.chatHistory.lastElementChild;
        if (previous) {
          if (this.currentMessage)
            this.currentMessage.classList.remove('hover');
          previous.classList.add('hover');
        }
        this.currentMessage = previous; // Update currentMessage
        this.currentMessage.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        }); // Scroll into view
      }
    });
  }

  createMessageDiv(message) {
    const domId = `chat-message-${message.id}`;
    const role = message.role;
    const content = message.content;
    // Get the template and its content
    const template = document.getElementById('chat-message-template');
    const messageClone = template.content.cloneNode(true);
    // Find the div and span elements within the cloned template
    const messageDiv = messageClone.querySelector('.chat-message');
    const textSpan = messageClone.querySelector('.chat-message-text');
    const deleteButton = messageClone.querySelector(
      '.delete-chat-message-button',
    );
    const copyButton = messageClone.querySelector(
      '.copy-chat-message-button .copy-button',
    );
    const goodButton = messageClone.querySelector('.good-chat-message-button');
    const badButton = messageClone.querySelector('.bad-chat-message-button');
    const flagButton = messageClone.querySelector('.flag-chat-message-button');

    if (message.quality == 'bad') {
      badButton.classList.add('selected');
    } else if (message.quality == 'good') {
      goodButton.classList.add('selected');
    } else if (message.quality == 'flagged') {
      flagButton.classList.add('selected');
    }

    // Set the class for role and text content
    messageDiv.classList.add(`${role}-chat-message`);
    messageDiv.id = domId;
    textSpan.textContent = content;
    messageDiv.spellcheck = false;

    // Append to chatHistory and adjust scroll
    this.chatHistory.appendChild(messageDiv);
    messageDiv.dataset['id'] = message.id;
    new Hoverable(messageDiv);
    deleteButton.addEventListener('click', async () => {
      await AppController.deleteChatMessage(message.id);
      messageDiv.remove();
    });
    copyButton.dataset['target'] = domId;
    flagButton.addEventListener('click', async () => {
      UINotification.show('Flagged message').autoDismiss();
      message.quality = 'flagged';
      await message.save();
    });
    goodButton.addEventListener('click', async () => {
      UINotification.show('Marked message as good').autoDismiss();
      message.quality = 'good';
      await message.save();
    });
    badButton.addEventListener('click', async () => {
      UINotification.show('Marked message as bad').autoDismiss();
      message.quality = 'bad';
      await message.save();
    });
    return { element: messageDiv, textElement: textSpan };
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
