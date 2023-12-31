import { BaseModel } from './BaseModel.js'

export class Chat extends BaseModel {
  static async initialize () {
    await this.database('ChatApp', 'chats')
  }
}
