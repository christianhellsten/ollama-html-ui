import { debounce } from './debounce.js';
import { Event } from './Event.js';
import { Chat } from './models/Chat.js';
import { AppController } from './AppController.js';
import { ChatList } from './ChatList.js';
import { DownloadChatsButton } from './DownloadChatsButton.js';
import { LocalStorage } from './models/LocalStorage.js';

export class Sidebar {
  constructor() {
    this.settings = new LocalStorage();
    this.chatList = new ChatList();
    this.element = document.getElementById('sidebar');
    this.newChatButton = this.element.querySelector('#new-chat-button');
    this.clearButton = this.element.querySelector('#clear-button');
    this.hamburgerButton = document.getElementById('hamburger-menu');
    this.searchButton = document.getElementById('search-button');
    this.downloadChatsButton = new DownloadChatsButton();
    this.searchRow = document.getElementById('search-row');
    this.searchInput = document.getElementById('search-input');
    if (this.settings.get('sidebar-collapsed') === true) {
      this.element.classList.add('collapsed');
    }
    this.bindEventListeners();
    this.render();
  }

  render() {
    this.chatList.render();
  }

  bindEventListeners() {
    Event.listen('chatSelected', this.handleChatSelected);
    this.searchButton.addEventListener('click', this.toggleSearch.bind(this));
    this.searchInput.addEventListener(
      'keypress',
      debounce(this.performSearch.bind(this), 50),
    );
    this.searchInput.addEventListener(
      'keyup',
      debounce(this.performSearch.bind(this), 50),
    );
    this.newChatButton.addEventListener('click', this.handleNewChat.bind(this));
    this.clearButton.addEventListener('click', this.handleClear.bind(this));
    this.hamburgerButton.addEventListener('click', this.toggle.bind(this));
  }

  // TODO: Fix
  handleChatSelected = (chat) => {
    const listItem = this.element.querySelector(`chat${chat.id}`);
    if (listItem) {
      listItem.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // "start" will bring the top of the element into view
        inline: 'nearest', // "nearest" will scroll to the nearest edge if partially visible
      });
    }
  };

  toggleSearch() {
    const searchRow = document.getElementById('search-row');
    searchRow.classList.toggle('hidden');
    this.searchInput.focus();
  }

  performSearch() {
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters
    }
    const query = escapeRegExp(this.searchInput.value.trim()).replace(
      /\s+/g,
      '.*',
    );
    const queryContent = query.length > 2; // Nobody wants to query content based on one character?
    const regex = new RegExp(query, 'i'); // 'i' for case-insensitive matching
    console.log(`Search ${query}`);
    Chat.getAll().then((chats) => {
      const matches = chats
        .filter((chat) => {
          let match = regex.test(chat.title);
          if (queryContent) {
            match ||= regex.test(chat.content);
          }
          return match;
        })
        .map((chat) => chat.id);
      this.element.querySelectorAll('.chat-list-item').forEach((item) => {
        if (matches.includes(item.data.id)) {
          // Now matches the type
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  }

  toggle() {
    this.element.classList.toggle('collapsed');
    this.hamburgerButton.classList.toggle('collapsed');
    if (this.element.classList.contains('collapsed')) {
      this.settings.set('sidebar-collapsed', true);
    } else {
      this.settings.set('sidebar-collapsed', false);
    }
  }

  async handleNewChat() {
    await AppController.createChat();
  }

  async handleClear() {
    await AppController.clearChats();
  }
}
