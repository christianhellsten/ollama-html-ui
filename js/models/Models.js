import { Event } from '../Event.js';
import { Settings } from './Settings.js';
import { OllamaApi } from '../OllamaApi.js';

export class Models {
  // TODO: Get this from the settings?
  static models = [];

  static getUrl() {
    return Settings.getUrl('/api/tags');
  }

  static load() {
    if (!this.getUrl()) {
      return null;
    }
    return OllamaApi.getModels(this.getUrl(), (models) => {
      Models.models = models;
      // Cache list of models
      Settings.set('models', Models.models);
      Event.emit('modelsLoaded', Models.models);
    });
  }

  static getAll() {
    return Settings.get('models');
  }

  static getNames() {
    const models = this.getAll();
    if (!models) {
      return [];
    }
    return models.map((model) => model.name);
  }

  static findModelByName(name) {
    return this.getAll().find((model) => model.name === name);
  }
}
