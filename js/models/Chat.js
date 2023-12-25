export class Chat {
  constructor (id, title, content, model) {
    this.id = id
    this.title = title
    this.model = model
    this.content = content
  }

  getModel () {
    return this.model
  }

  setModel (model) {
    this.model = model
  }
}
