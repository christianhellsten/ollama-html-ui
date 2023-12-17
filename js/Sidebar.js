import { ChatList } from './ChatList.js';
import { SettingsDialog } from './SettingsDialog.js';

export class Sidebar {
  constructor(chats) {
    this.chats = chats;
    this.settings = new SettingsDialog();
    this.chatList = new ChatList(this.chats);
    this.sidebarElement = document.getElementById('sidebar');
    this.newChatButton = this.sidebarElement.querySelector('#new-chat-button');
    this.settingsButton = this.sidebarElement.querySelector('#settings-button');
    this.clearButton = this.sidebarElement.querySelector('#clear-button');

    // Bind event listeners
    this.bindEventListeners();
    this.chatList.render();
  }

  bindEventListeners() {
    this.newChatButton.addEventListener('click', this.handleNewChat.bind(this));
    this.settingsButton.addEventListener('click', this.handleSettings.bind(this));
    this.clearButton.addEventListener('click', this.handleClear.bind(this));
  }

  handleNewChat() {
    const chatId = this.chats.add('New chat', '');
  }

  handleSettings() {
    this.settings.show();
  }

  handleClear() {
    this.chats.clearData();
    this.chatList.render();
  }
}
