import { List } from './List.js';
import { Event } from './Event.js';
import { Models } from './models/Models.js';

export class ModelsList {
  constructor(selector, selectedModel) {
    this.modelList = new List(selector, Models.getNames(), selectedModel);
    this.bindEventListeners();
  }

  bindEventListeners() {
    Event.listen('modelsLoaded', this.handleModelsLoaded.bind(this));
  }

  handleModelsLoaded() {
    this.modelList.setItems(Models.getNames());
  }

  onClick(handler) {
    this.modelList.clickHandler = handler;
    return this.modelList; // Allow chaining
  }

  getSelected() {
    return this.modelList.selected;
  }
}
