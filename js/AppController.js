import { UINotification } from './UINotification.js';
import { Event } from './Event.js';
import { Chat } from './models/Chat.js';
import { ChatMessage } from './models/ChatMessage.js';
import { Settings } from './models/Settings.js';

// TODO: Move all actions here?
export class AppController {
  static async updateChat(chat, data) {
    Object.assign(chat, data);
    await chat.save();
    // TODO: Move to BaseModel
    Event.emit('chatUpdated', chat);
  }

  static async createChat(data) {
    if (!data) {
      data = {};
    }
    if (!data.title) {
      data.title = 'Untitled';
    }
    if (!data.model) {
      data.model = Settings.getModel();
    }
    const chat = await new Chat(data).create();
    Settings.setCurrentChatId(chat.id);
    Event.emit('chatCreated', chat);
    Event.emit('chatSelected', chat);
    return chat;
  }

  static async deleteChatMessage(messageId) {
    UINotification.show('Deleted message').autoDismiss();
    const message = await ChatMessage.get(messageId);
    message.delete();
  }

  static async deleteChat(chat) {
    await chat.delete();
    if (Settings.getCurrentChatId() === chat.id) {
      Settings.setCurrentChatId(null);
    }
    Event.emit('chatDeleted', chat);
  }

  static async getCurrentChat() {
    const chatId = this.getCurrentChatId();
    if (chatId) {
      return await Chat.get(chatId);
    }
    return null;
  }

  static getCurrentChatId() {
    return Settings.get('currentChatId');
  }

  static async setCurrentChat(chat) {
    Settings.setCurrentChatId(chat.id);
    Event.emit('chatSelected', chat);
  }

  static async setCurrentChatId(chatId) {
    const chat = await Chat.get(chatId);
    if (chat) {
      await this.setCurrentChat(chat);
    }
  }

  static async clearChats() {
    Settings.setCurrentChatId(null);
    await Chat.clear();
    Event.emit('chatsCleared');
  }
}
