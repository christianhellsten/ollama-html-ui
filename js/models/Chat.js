import { BaseModel } from './BaseModel.js';
import { ChatMessage } from './ChatMessage.js';

export class Chat extends BaseModel {
  async addMessage(data) {
    data.chatId = this.id;
    await new ChatMessage(data).create();
  }

  async getMessages() {
    const messages = await ChatMessage.getAllByChatId(this.id);
    this.messages = messages;
    return this.messages;
  }

  static async initialize() {
    await this.database('ChatApp', ['chats']);
  }

  static async clear() {
    await ChatMessage.clear();
    await super.clear();
  }

  static async get(id) {
    const chat = await super.get(id);

    if (chat) {
      // Fetch all messages for this chat
      const messages = await ChatMessage.getAllByChatId(id);
      chat.messages = messages;
    }

    return chat;
  }

  static async delete(id) {
    // Delete the chat instance
    await super.delete(id);

    // Delete all associated messages
    const messages = await ChatMessage.getAllByChatId(id);
    for (const message of messages) {
      await message.delete();
    }
  }
}
