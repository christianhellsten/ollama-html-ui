import { List } from './List.js'
import { Event } from './Event.js'
import { Models } from './models/Models.js'
import { Settings } from './models/Settings.js'

export class ModelsList {
  constructor (selector) {
    this.modelList = new List(
      selector,
      Models.getNames(),
      Settings.getModel()
    )
    this.bindEventListeners()
  }

  bindEventListeners () {
    Event.listen('modelsLoaded', this.handleModelsLoaded.bind(this))
  }

  handleModelsLoaded () {
    this.modelList.setItems(Models.getNames())
  }

  onClick (handler) {
    this.modelList.clickHandler = handler
    return this.modelList // Allow chaining
  }

  getSelected () {
    return this.modelList.selected
  }
}
