import { Event } from '../Event.js'
import { Settings } from './Settings.js'

export class Models {
  static models = []

  static load () {
    const url = Settings.getModelsUrl()
    if (url === undefined || url === '') {
      return
    }
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        Models.models = data.models
        Settings.set('models', Models.models)
        Event.emit('modelsLoaded', Models.models)
      })
      .catch(error => {
        console.error(`Please ensure the server is running at: ${Settings.getModelsUrl()}. Error code: 39847`)
        Models.models = []
        Event.emit('error', error)
        Event.emit('modelsLoaded', Models.models)
        Settings.set('models', Models.models)
      })
  }

  static getAll () {
    return Models.models
  }

  static getNames () {
    return Models.models.map(model => model.name)
  }

  static findModelByName (name) {
    return Models.models.find(model => model.name === name)
  }
}
