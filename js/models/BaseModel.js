import { Database } from '../Database.js'

export class BaseModel {
  constructor (data) {
    Object.assign(this, data)
  }

  static async database (name, store) {
    this.dbName = name
    this.storeName = store
    this.db = new Database(name, [store])
    await this.db.open()
  }

  async create () {
    const key = await this.constructor.db.add(this.constructor.storeName, this)
    if (!this.id) {
      this.id = key
    }
    return this
  }

  async save () {
    return await this.constructor.db.put(this.constructor.storeName, this)
  }

  async delete () {
    return await this.constructor.db.delete(this.constructor.storeName, this.id)
  }

  static async get (id) {
    const data = await this.db.get(this.storeName, id)
    return new this(data)
  }

  static async clear () {
    return await this.db.clear(this.storeName)
  }

  // TODO: sorting and selecting only certain attributes
  static async getAll () {
    const records = await this.db.getAll(this.storeName)
    return records.map(data => new this(data))
  }
}
