export class Migrations {
  static version = 2
  static upgrade (database, transaction, oldVersion) {
    console.debug(`Migration needed. Old version ${oldVersion}. New version ${this.version}.`)
    const funcName = `upgradeToVersion${this.version}`
    const upgradeFunc = this[funcName]
    if (!upgradeFunc) {
      throw new Error(`Upgrade function missing for ${funcName}`)
    }
    if (this.version >= oldVersion) {
      upgradeFunc(database, transaction)
    }
  }

  static upgradeToVersion2 (database, transaction) {
    // Create chats
    database.createObjectStore('chats', { keyPath: 'id', autoIncrement: true })
    // Create chat_messages
    const chatMessages = database.createObjectStore('chat_messages', { keyPath: 'id', autoIncrement: true })
    chatMessages.createIndex('by_chat', 'chatId', { unique: false })
  }
}
