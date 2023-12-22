import { debounce } from './debounce.js';
import { Event } from './Event.js';
import { ChatList } from './ChatList.js';
import { SettingsDialog } from './SettingsDialog.js';
import { LocalStorage } from './models/LocalStorage.js';

export class Sidebar {
  constructor(chats) {
    this.chats = chats;
    this.settings = new LocalStorage();
    this.settingsDialog = new SettingsDialog();
    this.chatList = new ChatList(this.chats);
    this.element = document.getElementById('sidebar');
    this.newChatButton = this.element.querySelector('#new-chat-button');
    this.settingsButton = this.element.querySelector('#settings-button');
    this.clearButton = this.element.querySelector('#clear-button');
    this.hamburgerButton = document.getElementById('hamburger-menu');
    this.searchButton = document.getElementById('search-button');
    this.searchRow = document.getElementById('search-row');
    this.searchInput = document.getElementById('search-input');
    if (this.settings.get('sidebar-collapsed') == true) {
      this.element.classList.add('collapsed');
    }
    this.bindEventListeners();
  }

  render() {
    this.chatList.render();
  }

  bindEventListeners() {
    Event.listen('chatSelected', this.handleChatSelected);
    this.searchButton.addEventListener('click', this.toggleSearch.bind(this));
    this.searchInput.addEventListener('keypress', debounce(this.performSearch.bind(this), 50));
    this.searchInput.addEventListener('keyup', debounce(this.performSearch.bind(this), 50));
    this.newChatButton.addEventListener('click', this.handleNewChat.bind(this));
    this.settingsButton.addEventListener('click', this.handleSettings.bind(this));
    this.clearButton.addEventListener('click', this.handleClear.bind(this));
    this.hamburgerButton.addEventListener('click', this.toggle.bind(this));

  }

  // TODO: Fix
  handleChatSelected = (chat) => {
    const listItem = this.element.querySelector(`chat${chat.id}`);
    listItem.scrollIntoView({
      behavior: "smooth",
      block: "start",     // "start" will bring the top of the element into view
      inline: "nearest"   // "nearest" will scroll to the nearest edge if partially visible
    });
  }

  toggleSearch() {
    const searchRow = document.getElementById('search-row');
    searchRow.classList.toggle('hidden');
    this.searchInput.focus();
  }

  performSearch(event) {
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters
    }

    const query = escapeRegExp(this.searchInput.value.trim()).replace(/\s+/g, '.*');
    const regex = new RegExp(query, 'i'); // 'i' for case-insensitive matching
    const chatItems = this.element.querySelectorAll('.chat-list-item');
    chatItems.forEach(function(item) {
      const title = item.querySelector('.chat-title').textContent.toLowerCase();
      const match = regex.test(title);
      // console.log(`Search ${regex} ${title}`)
      if (match) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  toggle() {
    this.element.classList.toggle('collapsed');
    if (this.element.classList.contains('collapsed')) {
      this.settings.set('sidebar-collapsed', true);
    } else {
      this.settings.set('sidebar-collapsed', false);
    }
  }

  handleNewChat() {
    const chatId = this.chats.add(null, '');
  }

  handleSettings() {
    this.settingsDialog.show();
  }

  handleClear() {
    this.chats.clearData();
    this.chatList.render();
  }
}
