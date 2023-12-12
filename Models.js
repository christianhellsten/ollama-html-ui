export class Models {
  constructor() {
    this.models = [];
  }

  // Load data from the API
  load() {
    return fetch('http://localhost:11434/api/tags')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.models = data.models;
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  // Get all models
  getAllModels() {
    return this.models;
  }

  // Get all model names
  getAllModelNames() {
    return this.models.map(model => model.name);
  }

  // Find a model by name
  findModelByName(name) {
    return this.models.find(model => model.name === name);
  }
}
