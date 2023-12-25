export class Settings {
  // Static method to set a value in localStorage
  static set (key, value) {
    try {
      const stringValue = JSON.stringify(value)
      localStorage.setItem(key, stringValue)
    } catch (e) {
      console.error('Error saving to localStorage', e)
    }
  }

  // Static method to get a value from localStorage
  static get (key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key)
      return value !== null ? JSON.parse(value) : defaultValue
    } catch (e) {
      console.error('Error reading from localStorage', e)
      return defaultValue
    }
  }

  // Static method to remove a value from localStorage
  static remove (key) {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error('Error removing from localStorage', e)
    }
  }

  static getUrl (uri) {
    const baseUrl = Settings.get('url')
    if (uri) {
      return new URL(uri, baseUrl).href
    } else {
      return baseUrl
    }
  }

  static setUrl (url) {
    Settings.set('url', url)
  }

  static getModel () {
    return Settings.get('model')
  }

  static setModel (model) {
    Settings.set('model', model)
  }

  static getCurrentChat () {
    return Settings.get('currentChatId')
  }

  static setCurentChat (chat) {
    Settings.set('currentChatId', chat.id)
  }

  static getChats () {
    return Settings.get('chats')
  }

  static setChats (chats) {
    Settings.set('chats', chats)
  }

  static getMessageUrl () {
    return Settings.getUrl('/api/generate')
  }

  static getModelsUrl () {
    return Settings.getUrl('/api/tags')
  }
}
