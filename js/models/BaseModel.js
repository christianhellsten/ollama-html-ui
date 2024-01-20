import { Database } from '../Database.js';
import { Migrations } from '../Migrations.js';

export class BaseModel {
  constructor(data) {
    Object.assign(this, data);
  }

  async create() {
    const key = await this.constructor.db.add(this.constructor.storeName, this);
    if (!this.id) {
      this.id = key;
    }
    return this;
  }

  async save() {
    return await this.constructor.db.put(this.constructor.storeName, this);
  }

  async delete() {
    return await this.constructor.db.delete(
      this.constructor.storeName,
      this.id,
    );
  }

  jsonify() {
    return JSON.stringify(this);
  }

  static async database(name, store) {
    this.dbName = name;
    this.storeName = store;
    this.db = new Database(name, [store], Migrations);
    await this.db.open();
  }

  static async transaction(mode) {
    return await this.db.transaction(this.storeName, mode);
  }

  async transaction(mode) {
    return await this.constructor.transaction(mode);
  }

  static async get(id) {
    const data = await this.db.get(this.storeName, id);
    return new this(data);
  }

  static async clear() {
    return await this.db.clear(this.storeName);
  }

  // TODO: sorting and selecting only certain attributes
  static async getAll() {
    const records = await this.db.getAll(this.storeName);
    return records.map((data) => new this(data));
  }

  /**
   * Retrieves all objects associated with a given ID and index.
   *
   * @param {number|string} chatId - The ID of the chat.
   * @returns {Promise<Array>} A promise that resolves to an array.
   */
  static async getAllByIndexAndId(indexName, id) {
    // Open a transaction and access the messages store
    const transaction = await this.transaction('readonly');

    // Use an index to find objects with the specified id
    const index = transaction.index(indexName);
    const request = index.getAll(id);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        // Convert the result into instances
        const messages = request.result.map((data) => new this(data));
        resolve(messages);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  // Exports the whole store
  static async export() {
    let transaction = await this.db.transaction(this.storeName, 'readonly');
    let store = await transaction.transaction.objectStore(this.storeName);
    return store.getAll();
  }
}
