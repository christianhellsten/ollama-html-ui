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
    try {
      const baseUrl = Settings.get('url')
      if (uri) {
        return new URL(uri, baseUrl).href
      } else {
        return baseUrl
      }
    } catch (error) {
      return null
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

  static getSystemPrompt () {
    return Settings.get('system-prompt')
  }

  static setSystemPrompt (systemPrompt) {
    if (systemPrompt === '') {
      systemPrompt = null
    }
    Settings.set('system-prompt', systemPrompt)
  }

  static getModelParameters () {
    return Settings.get('model-parameters')
  }

  static setModelParameters (modelParameters) {
    if (modelParameters === '') {
      modelParameters = null
    }
    Settings.set('model-parameters', modelParameters)
  }

  static getCurrentChatId () {
    return Settings.get('currentChatId')
  }

  static setCurrentChatId (chatId) {
    if (chatId === undefined) {
      chatId = null
    }
    Settings.set('currentChatId', chatId)
  }
}
