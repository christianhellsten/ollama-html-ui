import { Event } from './Event.js';
import { Chats } from './models/Chats.js';

export class Controller {
  constructor() {
    not in use
    this.chats = new Chats();
    Event.listen('deleteChat', this.deleteChat.bind(this));
    Event.listen('updateChat', this.deleteChat.bind(this));
  }

  deleteChat(chatId) {
    console.log(chatId);
    this.chats.delete(chatId);
    var elements = document.querySelectorAll(`.chat${chatId}`);
    elements.forEach(function(element) {
      element.remove();
    });
  }
}
