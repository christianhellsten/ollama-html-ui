import { FilteredList } from './FilteredList.js';
import { Event } from './Event.js';
import { Models } from './models/Models.js';

export class ModelsList extends FilteredList {
  constructor(container) {
    super(container, Models.getNames());
    this.bindEventListeners();
  }

  bindEventListeners() {
    Event.listen('modelsLoaded', this.handleModelsLoaded.bind(this));
  }

  handleModelsLoaded() {
    this.setItems(Models.getNames());
  }

  static getModels() {
    return Models.getNames();
  }
}
