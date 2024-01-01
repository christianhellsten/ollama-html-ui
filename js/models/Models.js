import { Event } from '../Event.js';
import { Settings } from './Settings.js';
import { OllamaApi } from '../OllamaApi.js';

export class Models {
  static models = [];

  static getUrl() {
    return Settings.getUrl('/api/tags');
  }

  static load() {
    if (!this.getUrl()) {
      return null;
    }
    OllamaApi.getModels(this.getUrl(), (models) => {
      Models.models = models;
      Settings.set('models', Models.models);
      Event.emit('modelsLoaded', Models.models);
    });
  }

  static getAll() {
    return Models.models;
  }

  static getNames() {
    return Models.models.map((model) => model.name);
  }

  static findModelByName(name) {
    return Models.models.find((model) => model.name === name);
  }
}
