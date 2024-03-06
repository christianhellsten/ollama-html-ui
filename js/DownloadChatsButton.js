import { Chat } from './models/Chat.js';
import { ChatMessage } from './models/ChatMessage.js';

export class DownloadChatsButton {
  constructor() {
    this.button = document.querySelector('#export-button');
    this.bindEventListeners();
  }

  bindEventListeners() {
    this.button.addEventListener('click', () => {
      this.exportChat();
      this.exportChatMessages();
    });
  }

  async exportChat() {
    const request = await Chat.export();

    request.onsuccess = function () {
      let data = request.result;

      // Convert the data to JSON format
      let jsonData = JSON.stringify(data, 2);

      // Export the JSON data by creating a file to download
      let blob = new Blob([jsonData], { type: 'application/json' });
      let url = URL.createObjectURL(blob);

      let a = document.createElement('a');
      a.href = url;
      a.download = 'chats.json';
      a.click();
      URL.revokeObjectURL(url);
    };

    request.onerror = function (event) {
      console.error('Error reading data: ', event.target.errorCode);
    };
  }

  async exportChatMessages() {
    const request = await ChatMessage.export();

    request.onsuccess = function () {
      let data = request.result;

      // Convert the data to JSON format
      let jsonData = JSON.stringify(data, 2);

      // Export the JSON data by creating a file to download
      let blob = new Blob([jsonData], { type: 'application/json' });
      let url = URL.createObjectURL(blob);

      let a = document.createElement('a');
      a.href = url;
      a.download = 'chat_messages.json';
      a.click();
      URL.revokeObjectURL(url);
    };

    request.onerror = function (event) {
      console.error('Error reading data: ', event.target.errorCode);
    };
  }
}
