import { BaseModel } from './BaseModel.js'

export class ChatMessage extends BaseModel {
  static async initialize () {
    await this.database('ChatApp', 'chat_messages')
  }

  static async getAllByChatId (chatId) {
    return this.getAllByIndexAndId('by_chat', chatId)
  }
}
